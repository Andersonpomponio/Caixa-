# Ótica Central

Painel integrado para exames, leads da ótica, leads da clínica, comissões de
lentes, crediários de pastores e crediários gerais.

## Base compartilhada

O arquivo `supabase/schema.sql` contém a estrutura multiusuário com autenticação,
separação por empresa e segurança por linha (RLS). O navegador deve usar somente
a chave publicável; nunca use uma chave secreta ou `service_role` no aplicativo.

Para conectar, crie `config.js` a partir de `config.example.js` e informe a URL,
a chave publicável e o ID da organização.

Aplicação web instalável para controle de entradas, saídas e boletos.

## Publicar no GitHub Pages

1. Envie os arquivos da branch `main` para o GitHub.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main`, a pasta `/(root)` e salve.
5. Aguarde a publicação. O GitHub exibirá o endereço do site nessa mesma tela.

## Instalar no celular ou iPad

1. Abra o endereço publicado no Safari.
2. Toque em **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.
4. Confirme em **Adicionar**.

O app continuará abrindo como um aplicativo. Os dados financeiros continuam armazenados localmente em cada aparelho; use a opção de backup do próprio app para transferi-los entre dispositivos.
