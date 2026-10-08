# Caixa Central

Aplicativo instalável para controlar entradas, saídas e boletos das unidades.

## Aplicativo publicado

- Endereço: https://andersonpomponio.github.io/Caixa-/
- Publicação: GitHub Pages, branch `main`, pasta raiz.
- Arquivos principais: `index.html`, `sw.js`, `manifest.webmanifest` e `icon.svg`.
- Versão atual do aplicativo: 33.

## Organização do painel

Os totais de entradas, saídas e saldo ficam sempre visíveis. O restante do
painel é dividido em quatro abas: **Resumo**, **Lançamentos**, **Boletos** e
**Análises**. Somente a área aberta é renderizada, reduzindo o trabalho do
celular sem interromper a sincronização em tempo real.

## Dados e sincronização

Os lançamentos e boletos são compartilhados pelo Supabase. Anderson e Luciane
usam contas separadas, mas enxergam a mesma caixa. O navegador também mantém
uma cópia local para permitir recuperação quando a conexão oscila.

A sincronização usa três mecanismos:

1. Atualização em tempo real quando outro aparelho altera o banco.
2. Conferência periódica a cada 30 segundos para recuperar eventos perdidos.
3. Botão **Atualizar**, que confere os dados e procura uma versão nova do app.

Exclusões são permanentes e registradas separadamente para não reaparecerem.
A baixa de boleto é feita no banco em uma única operação para impedir que dois
aparelhos criem duas saídas para o mesmo pagamento.

## Atualização no celular ou iPad

1. Feche o Caixa Central nos dois aparelhos.
2. Abra novamente pelo ícone da tela inicial.
3. Confira no texto de sincronização se aparece `versão 33`.
4. Se necessário, toque no botão **Atualizar** uma vez.

Quando uma versão nova é instalada, o aplicativo recarrega automaticamente.

## Outros arquivos deste repositório

A pasta `dist/` pertence ao painel **Ótica Central**, publicado separadamente.
Ela não é a fonte do Caixa Central no GitHub Pages. Alterações no app financeiro
devem ser feitas nos arquivos da raiz para não misturar os dois sistemas.

## Segurança

O aplicativo público usa somente a chave publicável do Supabase. Nunca coloque
uma chave secreta ou `service_role` em arquivos enviados ao GitHub.
