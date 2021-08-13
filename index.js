const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const public = path.join(__dirname, 'public');
const fs = require('fs')
const pg = require('pg')
const appurl = 'http://localhost:3000/'
const database = ''
const host = ''
const user = ''
const password = ''

app.use(express.static('public'));
app.get('/', function(req, res) {
    console.log(req)
    res.sendFile(path.join(public, 'home.html'));
})

app.get('/api/loadcsv', async function(req, res) {
  const json_data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  console.log(json_data)
  const databaseClient = new pg.Client({
    database:'postgres',
    host:'34.75.21.28',
    user:'postgres',
    password: 'postgres'
});
  databaseClient.connect()
  for (const [index, jsonRow] of json_data.entries() ) {
    console.log(`${index} of ${json_data.length}`)
    const databaseData = await databaseClient.query(
      `INSERT INTO controles(titulo, categoria, descricao, objetivo, descricao2, aplicacao, pratica, cloud)
      VALUES ('${jsonRow['Título']}', '${jsonRow['Processo']}', '${jsonRow['Descrição']}','${jsonRow['Objetivo']}','${jsonRow['Descrição']}','${jsonRow['Se aplica a ']}', '${jsonRow['Aplicação']}', '${jsonRow[' Cloud']}')`
    )}
  res.json({okay:true});
})

app.get('/controles/:title', async function(req, res) {
  const databaseClient = new pg.Client({
    database: database,
    host: host,
    user: user,
    password: password
});
databaseClient.connect()
const control = await databaseClient.query(`SELECT * FROM controles WHERE titulo = '${req.params.title}' `)
console.log(control.rows[0])
res.send(`<html>
<head>
  <style>
  html,body{
    padding: 0;
    margin: 0;
  }
  
  .header {
    text-align: left;
    color: white;
    font-size: 20px;
    min-height: 14vh;
    background-size: cover;
    background-position: center center;
    padding: 10px;
    background-color: #20A868;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .titulo-header{
    margin-top:15px;
    margin-bottom: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 25px;
  }
  
  .menu-links{
    margin-top:20px;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 17px;
    color: #98CCB8;
  }
  
  .menu-links:hover{
    color: white;
  }
  
  .home-link{
    margin-top:20px;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 17px;
    color: #98CCB8;
    margin-left: 40px;
  }
  
  .home-link:hover{
    color: white;
  }
  
  i {
    margin-right: 5px;
    color: #98CCB8;
    text-align: center;
    vertical-align: middle;
    horizontal-align: center;
  }
  .fa-chevron-left{
    color: white;
    margin-left: 10px;
  }
  
  .container-menu{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .card-info{
    width: 30%;
    height: 100vh;
    background: #D8D8D8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
  }
  
  .card-texto{
    width: 70%;
    height: 100vh;
    flex-direction: column;
  }
  .circle-key{
    align-items: center;
    text-align: center;
  }
  
  .circle{
    width:300px; 
    height:300px;
    border-radius: 50%;
    background: rgba(152, 204, 184, 0.3);
    vertical-align: middle;
  
  }
  .fa-key{
    font-size: 280px; 
    align-items: flex-start;
    color: 54605B;
  }
  .titulo-sessoes{
    margin-left: 50px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 25px;
    color: #474646;
    margin-top: 40px;
  }
  
  .texto-sessoes{
    margin-left: 50px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    text-decoration: None;
    word-wrap: break-word;
    max-width: 90%;
  }
  
  .texto-clicavel{
    margin-left: 50px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    text-decoration: None;
    word-wrap: break-word;
    max-width: 90%;
  }
  
  .texto-clicavel:hover{
    color: lightgreen;
    opacity: 100;
  }
  
   /* aqui começa a barrinha de pesquisa*/
  form{
      position: relative;
      transition: all 1s;
      width: 50px;
      height: 50px;
      background: white;
      box-sizing: border-box;
      border-radius: 25px;
      border: 4px solid white;
  }
  
  input{
      position: absolute;
      width: 100%;
      height: 42.5px;
      line-height: 30px;
      outline: 0;
      border: 0;
      display: none;
      font-size: 1em;
      border-radius: 20px;
      padding: 0 20px;
      background: white;
  }
  
  .fa{
      box-sizing: border-box;
      padding: 10px;
      width: 42.5px;
      height: 42.5px;
      border-radius: 50%;
      color: #07051a;
      text-align: center;
      font-size: 1.2em;
      transition: all 1s;
  }
  
  form:hover{
      width: 200px;
      cursor: pointer;
  }
  
  form:hover input{
      display: block;
  }
  
  form:hover .fa{
      background: #07051a;
      color: white;
  }
  
  @media only screen and (max-width: 900px){
  .circle{
    width: 100px;
    height: 100px;
  }
  .fa-key{
    font-size: 80px;
  }
  
  </style>
  <script src="https://kit.fontawesome.com/283f69ca47.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="public/css/final.css">
  <title> Titulo da pagina </title> 
 </head>
<body>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <link href="https://fonts.googleapis.com/css?family=Poppins:400,800" rel="stylesheet" />
  <link href="public/css/main.css" rel="stylesheet" />

 <div class="header">
   <div class="header-info">
    <h1 class="titulo-header"> <a href=${appurl}><i class="fas fa-chevron-left"></i><a/> ${control.rows[0].titulo} </h1>
     <a href=${appurl} class="home-link"> Home</a>
     <a href="${appurl}" class="menu-links"> <i class="fas fa-chevron-right"></i>Categoria</a>
     <a href="" class="menu-links"> <i class="fas fa-chevron-right"></i>${control.rows[0].titulo}</a>
   </div>
   <form action="https://duckduckgo.com/" role="search" class="search-form">
    <input type="submit" value="">
    <input type="search" name="q" placeholder="Pesquise..." autocomplete="on">
    <i class="fa fa-search"></i>
  </form>
  
</div>
<div class="container-menu">
  <div class="card-info">
      <a class="card-info">
          <div class="circle-key">
            <div class="circle">
            <i class="fas fa-key "></i>
          </div>
        </div>
        </a>
    </div>
    <div class="card-texto">
      <h1 class="titulo-sessoes">Titulo 1</h1>
      <p class= "texto-sessoes"> ${control.rows[0].aplicacao} </p>
      <h1 class="titulo-sessoes">Titulo 2</h1>
      <p class= "texto-sessoes"> ${control.rows[0].pratica} </p>
      <h1 class="titulo-sessoes">Titulo 3</h1>
      <p class= "texto-sessoes"> ${control.rows[0].descricao_controle} </p>

</div>
</body>
</html>`);

  // databaseClient.connect()
  // const control = await databaseClient.query(`SELECT * FROM controles WHERE titulo = '${req.params.title}' `)
  // console.log(control.rows[0])
  // res.send(`<h1> ${control.rows[0].categoria} </h1>`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})