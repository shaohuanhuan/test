/**
 * @author monkeywang
 * Date: 17/3/27
 */
//import utils from '../common/serveice'
import {Render} from '../common/render'
// import CacheManage from "../../../Manage"

let jsonHtml = {"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":800,"height":50,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","originX":"left","originY":"top","left":709,"top":20,"width":50,"height":22.6,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"d登出","fontSize":20,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{"0":{"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{}}}},{"type":"i-text","originX":"left","originY":"top","left":75,"top":13,"width":22.22,"height":22.6,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"xjf","fontSize":20,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{"0":{"1":{}}}}]}
// class Hello {
//   say() {
//     utils.get('/api/movie/in_theaters', {}).then(res => {
//       console.log(res)
//     })
//   }
// }
// let hello = new Hello()
// hello.say()
let render = new Render(jsonHtml, '.container')
render.renderDom()

// CacheManage.set("subject", "./static/javascripts/index.js", 1000 * 60 * 60);
// import {byshao} from './byshao'
// console.log(111,CacheManage.get("subject"))

var SimpleCache = require("simple-lru-cache")

var cache = new SimpleCache({"maxSize":1000})

//Add an Objet
cache.set("hello","world")

//Get an Object
console.log(cache.get("hello"))

//Delete an Object
cache.del("hello")

//Reset cache
cache.reset()