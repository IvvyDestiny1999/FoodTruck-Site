Foodtruck das Nascentes — pacote estático pronto para SPCK
-------------------------------------------------- 

Esta é uma versão estática de frontend pura, projetada para rodar dentro da pré-visualização do Editor SPCK (ou qualquer servidor estático). Simula ações de backend e permite que o proprietário edite o menu localmente. 

- Como funciona: - Fonte de dados do menu: `data/menu.json` (inicial). 
- Ao editar no Admin, as alterações são armazenadas em `localStorage`. - Admin: abra `admin.html`. Senha padrão: `senha123`. Após o login, você pode adicionar/editar itens e exportar JSON.

- Imagens: O Admin armazena as imagens enviadas como URLs de dados Base64 para que funcionem sem um servidor. - Carrinho: funciona via `localStorage`.

- A página Carrinho mostra os itens e permite a simulação de 'PIX'.
- - Doações: `data/doacoes.txt` e `data/money.txt` são lidos para mostrar as barras de doação. Se você editar esses arquivos no SPCK, recarregue para ver as atualizações ...
- - Para persistir edições em arquivos no projeto: exporte JSON (botão Exportar) e substitua `data/menu.json` no projeto pelo arquivo exportado (ou importe através do botão Importar no painel de administração). 
- Executando:
- - 1. Abra o Editor SPCK e importe esta pasta do projeto.
- - 2. Use a pré-visualização integrada para visualizar `index.html` (o aplicativo é estático, sem necessidade de servidor).
- - 3. Para simular buscas de `data/*.txt` e `data/menu.json` no servidor, a pré-visualização do SPCK serve os arquivos; se a pré-visualização falhar na busca, o aplicativo retornará aos dados do localStorage.