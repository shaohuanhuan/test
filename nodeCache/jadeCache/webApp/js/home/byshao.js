// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`服务器运行在 http://${hostname}:${port}/`);
// });


// const cache = require("./Cache");
// cache.createCache("LRU", 100 * 100 * 10);
// console.log(cache)
// cache.set("key", "value", 1000 * 60);
// console.log(cache.get("key"))

// import utils from "../common/service"

// class Hello {
//   say() {
//     utils.get('/api/movie/in_theaters', {}).then(res => {
//       console.log(res)
//     })
//   }
// }
// let hello = new Hello()
// hello.say()

import CacheManage from "../../../Manage"
// CacheManage.set("key", "value", 1000 * 60);
// console.log(CacheManage.get("key"))

// import $ from "jquery"

CacheManage.set("subject", "./static/javascripts/index.js", 1000 * 60 * 60);
// console.log(CacheManage.get("subject"))
// $.ajax({
// 	url: '/api/movie/in_theaters',
// 	method: 'get',
// 	success: function(res){
//          // console.log(res)
//          // console.log(CacheManage.get("subject"))
//          CacheManage.set("subject", res.title, 1000 * 60 * 60);
// 	}
// })
// console.log(CacheManage.get("subject"))