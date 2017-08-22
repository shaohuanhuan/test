

/*1
new Vue({
  el: '#replace',
  template: '<p>replaced</p>'
})*/

/*2
new Vue({
  el: '#list-example',
  data: {
    users: [
      {
        name: 'Chuck Norris',
        email: 'chuck@norris.com'
      },
      {
        name: 'Bruce Lee',
        email: 'bruce@lee.com'
      }
    ]
  },
  components: {
    'user-profile': {
      template: '<li>{{name}} {{email}}</li>'
    }
  }
})*/

/*3
var demo = new Vue({
  el: '#demo',
  data: {
    message: 'Hello Vue.js!'
  }
})*/

/*4
Vue.component('child', {
  // 声明 prop
  props: ['msg'],
  // prop 可以在模板内部被使用，
  // 也可以类似 `this.msg` 这样来赋值
  template: '<span>{{msg}}</span>'
})*/

/*5Vue.component('user-profile', {
  template: '#grid-template',
  replace: true,
  props: ['columns'],
  data: function () {
    return {
      columns: null
    }
  },
  methods: {
    showNum: function (key) {
      alert(key)
    }
  }
})

new Vue({
  el: '#demo',
  data: {
    gridColumns: ['1','2','3','4','5']
  }
})*/

var demo = new Vue({
  el: '#demo',
  data: {
    picked: '0'
  },
  methods: {
    do: function (obj) {
      var prev=obj.$event.path[1],
          next=obj.$event.path[1];
      demo.addClass(obj.$event.path[1],'ui-star-checked');
      for(var i=0;i<4;i++){
        prev!=null?prev=prev.previousElementSibling:null,
        next!=null?next=next.nextElementSibling:null;
        prev!=null?demo.addClass(prev,'ui-star-checked'):null;
        next!=null?demo.removeClass(next,'ui-star-checked'):null;
      }
      
    },
    hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
    },
    addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
    },
    removeClass(obj, cls) {  
      if (this.hasClass(obj, cls)) {  
          var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
          obj.className = obj.className.replace(reg, ' ');  
      }  
    }
  }
  
})
