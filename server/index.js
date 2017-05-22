var express = require('express')
var path = require('path')
var page = require('./page.generator.js').page
var app = express()
var port = 8082

app.use(express.static(path.join(__dirname, '..', './public')))

app.get('/', (req, res) => {
  var props = { initialCount: 9 }
  var html = page(props);

  function renderScripts (scriptUrls) {
    let items = [];
    scriptUrls.map((url, i) => {
      items.push(`<script src="${url}"></script>`);
    });
    return items;
  }

  let context = ` <html>
      <head>
        <meta charSet='utf-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
        <meta httpEquiv='Cache-Control' content='no-siteapp'/>
        <meta name='renderer' content='webkit'/>
        <meta name='keywords' content='demo'/>
        <meta name='description' content='demo'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <title>测试</title>
      </head>
      <body>
      <div id="root">
${html}
</div>
        ${renderScripts([ 'assets/entry.generator.js' ])}
      </body>
      </html>
    `;
  res.end(context);
})

app.listen(port, () => { console.log('Listening on port %d', port) })