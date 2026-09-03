import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const url = Deno.env.get('SUPABASE_URL')!
    const authHeader = req.headers.get('Authorization') ?? ''
    const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const adminClient = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user) return Response.json({ error: 'Sessão inválida.' }, { status: 401, headers: cors })

    const { data: member } = await userClient.from('team_members').select('role').single()
    if (!member || !['owner', 'admin'].includes(member.role)) {
      return Response.json({ error: 'Apenas administradores podem gerenciar usuários.' }, { status: 403, headers: cors })
    }

    const body = await req.json()
    if (body.action === 'list') {
      const { data, error } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 200 })
      if (error) throw error
      const { data: roles } = await adminClient.from('team_members').select('user_id,role')
      const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item.role]))
      return Response.json({ users: data.users.map((item) => ({
        id: item.id, email: item.email, role: roleMap.get(item.id) ?? 'sem acesso',
        confirmed: Boolean(item.email_confirmed_at), created_at: item.created_at,
      })) }, { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (body.action === 'delete') {
      if (member.role !== 'owner') {
        return Response.json({ error: 'Apenas o Proprietário pode excluir usuários.' }, { status: 403, headers: cors })
      }
      const targetId = String(body.userId ?? '')
      if (!targetId || targetId === user.id) {
        return Response.json({ error: 'A conta Proprietária não pode excluir a si mesma.' }, { status: 400, headers: cors })
      }
      const { error } = await adminClient.auth.admin.deleteUser(targetId)
      if (error) throw error
      return Response.json({ success: true }, { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    const role = ['admin', 'member'].includes(body.role) ? body.role : 'member'
    if (!email || password.length < 8) {
      return Response.json({ error: 'Informe um e-mail e uma senha com pelo menos 8 caracteres.' }, { status: 400, headers: cors })
    }

    const { data: created, error: createError } = await adminClient.auth.admin.createUser({
      email, password, email_confirm: true,
    })
    if (createError) throw createError
    const { error: roleError } = await adminClient.from('team_members').insert({ user_id: created.user.id, role })
    if (roleError) {
      await adminClient.auth.admin.deleteUser(created.user.id)
      throw roleError
    }
    return Response.json({ user: { id: created.user.id, email, role, confirmed: true } }, {
      headers: { ...cors, 'Content-Type': 'application/json' }, status: 201,
    })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Erro inesperado.' }, {
      status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
})
