let btn = document.getElementById('abtn');
window.jQuery = function(node){ return {} };
window.$ = window.jQuery;

window.jQuery.ajax = function({url,method,header,body}){
  return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.open(method,url);
    for(let key in header){
      xhr.setRequestHeader(key,header[key]);
    }
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
          resolve(xhr.responseText);
        }else{
          reject(xhr);
        }
      }
    }
    let bodys = '';
    for(let key in body){
      bodys += `${key}=${body[key]}`; 
    }
    xhr.send(bodys);
  })
}

btn.addEventListener('click',()=>{
  $.ajax({
    url: '/ajax',
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencode;charset=utf-8',
      'user': 'miracle'
    },
    body: {
      'name': 'miracle',
      'time': Date.now()
    }
  }).then(resText=>{
      let res = JSON.parse(resText);
      console.log(res);
    },xhr=>{
      console.log(xhr);
    })
 })