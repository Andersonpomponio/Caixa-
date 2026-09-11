# Contexto do projeto — Ótica Central

Atualizado em 11 de setembro de 2026.

## Estado atual

- App público: https://otica-central-gestao.anderson-pomponio.chatgpt.site
- Versão publicada: 20
- Banco compartilhado: Supabase, projeto `xilptibewvgscwrkyahe`
- Site hospedado no Sites, projeto `appgprj_6a99ba4b29c881918a17113bc4dd5e11`
- Arquivos publicados ficam em `dist/`. As cópias antigas na raiz não devem ser usadas para novas alterações.

## Abas do painel

- Início
- Exames
- Leads Ótica
- Comissões de lentes
- Pastores
- Crediários
- Usuários, visível para administrador e proprietário

A aba Leads Clínica foi removida da interface. Os dados antigos continuam preservados no banco.

## Funcionalidades concluídas

- Login compartilhado com conta principal e criação de usuários pelo administrador.
- Dados online no Supabase para vários usuários.
- Sincronização ao vivo e botão Atualizar.
- Adicionar, editar e excluir registros com confirmação no banco.
- Tema claro e escuro.
- Layout responsivo para celular, com registros em cartões e botões adequados para toque.
- Filtros semanal e mensal em Exames e Leads Ótica.
- Exames organizados por terça-feira, quinta-feira e sábado, com filtro para mostrar todos os dias ou somente um deles.
- Exames com paciente, telefone do agendamento, idade, data e horário, tipo e status.
- Idade aceita números inteiros de 0 a 120; exames antigos sem idade mostram `—`.
- Na aba Exames, o lápis edita e a lixeira vermelha exclui; os ícones foram reduzidos para ocupar menos espaço.
- Comissões com vendedor, lente e valor.
- Ranking de vendedores por semana e por mês, ordenado pelo valor vendido.

## Cuidados nas próximas alterações

- Preservar a sincronização e a confirmação das operações no Supabase.
- Manter os dados antigos compatíveis quando novos campos forem adicionados.
- Testar sempre no desktop e no celular, incluindo tema escuro.
- Salvar uma nova versão do Sites antes de publicar.
- Não incluir chaves privadas ou senhas nos arquivos do projeto.
