let fetch = require('node-fetch');
let urlencode  = require('urlencode');

async function request(url, body = {},  method = "GET", headers = { 'Content-Type': 'application/json' } ){
  	console.log(url,method,  get_body_by_header(body, headers['Content-Type']))
	let data = await fetch(url, { 
      method,
      body:get_body_by_header(body, headers['Content-Type']),
          headers}).then(res => {
          	return res.text();
          })
      .catch(error => {
			return "";
     });
    return data
}

function get_body_by_header(body, content_type){
	switch(content_type){
		case 'text/plain':
		case 'application/json': return JSON.stringify(body);
		case 'application/x-www-form-urlencoded': return urlencode_data(body);
	}
	return JSON.stringify(body);
}

function urlencode_data(new_json={}){
  return Object.keys(new_json).map(function(x){return `${x}=${urlencode(new_json[x])}`;}).join('&') ;
}
module.exports = {
  request
}