
let http = require('http'); //获取http模块
let fs = require('fs');     //获取fs模块
let url = require('url');   //获取url模块
let port = process.argv[2]; //获取 端口号 port

if(!port){
  console.log('请指定端口号！\n例如：node nodeServer.js 8890');
  process.exit();
}

let server = http.createServer(function(request,response){
  let parseUrl = url.parse(request.url,true); //解析request.url
  let path = request.url; //获取完整的url
  let query;  //定义请求参数

  if(path.indexOf('?') >= 0){
    query = path.substring(path.indexOf('?'));
  }

  let pathNoQuery = parseUrl.pathname;
  let pathObject = parseUrl.query;
  let method = request.method;

  if(pathNoQuery === '/'){
    let index = fs.readFileSync('index.html','utf-8');
    response.setHeader('Content-Type','text/html;charset=utf-8');
    response.write(index);    
    response.end();
  }else if(pathNoQuery === '/main.js'){
    let script = fs.readFileSync('main.js','utf-8');
    response.setHeader('Content-Type','text/javascript;charset=utf-8');
    response.write(script);
    response.end();
  } else if(pathNoQuery === '/form'){
    response.statusCode = 200;
    response.setHeader('Content-Type','application/json');
    response.write(`{"a":666,"b":false}`)
    console.log('form请求');
    response.end();
  } else if(pathNoQuery === '/ajax'){
    response.statusCode = 200;
    response.setHeader('Access-Control-Allow-Origin','http://testa.com:8890');
    response.setHeader('Content-Type','application/json');
    response.write(`{"name":"miralce","method":"ajax"}`);
    response.end();
  } else {
    response.statusCode = 404;
    let nf = fs.readFileSync('404.html','utf-8')
    response.setHeader('Content-Type','text/html');
    response.write(nf);
    response.end();
  }
})

server.listen(port);
console.log(`监听${port}成功\n请打开http://localhost:${port}`);