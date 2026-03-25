# Exacta Farma — Portal Institucional

Portal institucional da Exacta Farma, farmácia de manipulação estéril especializada em injetáveis.

## Tecnologias
- React 18
- Vite
- Montserrat (Google Fonts)

## Setup local

```bash
npm install
npm run dev
```

O site estará disponível em `http://localhost:5173`

## Build para produção

```bash
npm run build
```

A pasta `dist/` conterá os arquivos estáticos prontos para deploy.

## Deploy

### Vercel (recomendado)
1. Faça push do repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. O deploy é automático a cada push

### Netlify
1. Faça push do repositório no GitHub
2. Acesse [netlify.com](https://netlify.com) e importe o repositório
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Instale: `npm install -D gh-pages`
2. Adicione ao package.json: `"deploy": "gh-pages -d dist"`
3. Execute: `npm run build && npm run deploy`

## Painel Admin do Blog
- Acesse clicando 5 vezes rapidamente no canto superior esquerdo do site (área do logo)
- Permite publicar, categorizar e excluir posts
- Posts ficam armazenados no localStorage do navegador

## Integração Google Sheets (Fale Conosco)
Para que o formulário envie dados à planilha:
1. Abra a planilha: https://docs.google.com/spreadsheets/d/1mhLQ1y-3891XWeD_qN3h3ezCZsocZCiuv7N4DT5WhhE/
2. Vá em **Extensões > Apps Script**
3. Cole o seguinte código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.nome,
    data.email,
    data.tel,
    data.especialidade
  ]);
  return ContentService.createTextOutput("OK");
}
```

4. Clique em **Implantar > Nova implantação**
5. Tipo: **App da Web**, Acesso: **Qualquer pessoa**
6. Copie a URL gerada
7. No arquivo `src/App.jsx`, substitua `PLACEHOLDER` pela URL:
   ```
   https://script.google.com/macros/s/SUA_URL_AQUI/exec
   ```

## Cores da marca
| Cor | HEX |
|-----|-----|
| Escuro | #061426 |
| Prata | #7b7e7d |
| Claro | #F2F2F2 |
