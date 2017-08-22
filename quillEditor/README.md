# seller

> A Vue.js project

## Build Setup

``` bash
# install yarn
npm install yarn -g
# install dependencies
yarn
# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test

```

  ✔ yarn @done (17-04-05 15:30)
  ✔ 目录结构 @done (17-04-05 15:38)
   ✔ http 模块 ,API层，axios 封装层 @done (17-04-05 17:52)
   ✔ mock数据 @done (17-04-06 11:47)
   ✔ vue-router @done (17-04-05 16:22)
   ✔ 全局css,安装less-loader @done (17-04-06 11:08)
   ✔ 图标字体 @done (17-04-06 11:35)
   ✔ element 按需引入 @done (17-04-06 13:57)
   ✔ vuex @done (17-04-06 16:47)
   ✔ 路由动态加载 @done (17-04-06 17:30)
   ✔ 测试 @done (17-04-06 18:21)

    # 几个暂定书写约定（大家一起给些建议)
      1.几个命令：yarn（相当于 npm install），yarn run dev, yarn run build, yarn run e2e.
      2.样式：每个.vue文件 写样式尽量 scoped标签，避免不必要的样式bug（不同页面之间，同个类名）;全局样式写src/style/base.less里，全局样式变量定义在src/style/variable.less里
      3.目录结构：项目对应的所有单页都要放在src/views 文件夹下，每个模块的层级结构必须清晰，有父子关系的，子模块要放在cpnts(components的简写)目录下【若层级复杂，可递归创建cpnts目录】
      4.请求&mock数据： 一个模块一个API文件（可照着 src/api/contactAPI.js 写）；可以将mock数据放在/static/mock文件夹下，这时候只需要将/src/common/config.js 下 mock赋值为true 即可
      5. ESLint（Standard）：项目配置了 ESLint（Standard）,写代码的时候注意书写规范 比如 a = 1 (等号左右都有空格)
      6.iconfont字体：由于在App.vue全局引入了iconfont，所以只需要在页面写DOM即可调用到字体，如<span class="icon-font">&#xe6a9;</span>
      7.vuex的使用可参照src/store/contactDemo文件夹和src/store/contactDemoComplex文件夹。若模块较为简单，用前者的方式把action，mutations,getters等都放在一个文件夹，若模块比较复杂，则建议用后者的方式.
      8.饿了吗UI插件按需引入组件：项目用到新组件时候，需要在src/common/element-import.js 引入对应的组件模块     
      9.字符串处理尽量用 过滤器 ，全局过滤器参照 src/common/filters.js   

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
