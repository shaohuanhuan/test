webpackJsonp([37],{307:function(n,o,t){t(901);var i=t(89)(t(500),t(814),null,null);i.options.__file="/Users/JU53/Documents/website/b2b4.0/b2b-seller4.0/src/components/subNavBars/MyHomePageBar.vue",i.esModule&&Object.keys(i.esModule).some(function(n){return"default"!==n&&"__esModule"!==n}),i.options.functional,n.exports=i.exports},372:function(n,o,t){"use strict";var i=t(21),e="https://server.onloon.com.cn",a={commit:function(n){return i.a.post(e+"/bshop/preview/commit",n)},clean:function(n){return i.a.get(e+"/bshop/preview/clean",n)},saveCarousel:function(n){return i.a.post(e+"/bshop/shop/banner/update",n)},setProductToIndex:function(n){return i.a.post(e+"/bshop/product/toindex",n)},saveAdv:function(n){return i.a.post(e+"/bshop/shop/advert/update",n)},saveProduct:function(n){return i.a.post(e+"/bshop/product/position/save",n)},saveFoot:function(n){return i.a.post(e+"/bshop/aboutus/save",n)},saveAbout:function(n){return i.a.post(e+"/bshop/company/desc/modify",n)},getProductList:function(n){return i.a.get(e+"/bshop/product/position/list",n)},sortProductList:function(n){return i.a.get(e+"/bshop/product/sort",n)},getAdvert:function(n){return i.a.get(e+"/bshop/shop/advert/show",n)},getProfile:function(n){return i.a.get(e+"/buyer/aboutus/company/find",n)},getCompanyDetail:function(n){return i.a.get(e+"/bshop/aboutus/contact/detail",n)},getContactImg:function(n){return i.a.get(e+"/bshop/shop/advert/show",n)},uploadLogo:function(n){return i.a.post(e+"/bshop/config/pic/upload",n,!0)},changeLogo:function(n){return i.a.post(e+"/bshop/company/logo/modify",n)},getCompanyDomain:function(){return i.a.get(e+"/bshop/config/domain/get")},contactBanner:function(n){return i.a.post(e+"/bshop/shop/contactsbg/update",n)},productBanner:function(n){return i.a.post(e+"/bshop/shop/background/update",n)},getDomain:function(){return i.a.get(e+"/bshop/config/domain/get")},updateDomain:function(n){return i.a.post(e+"/bshop/config/domain/update",n)},companyBanner:function(n){return i.a.post(e+"/bshop/company/background/modify",n)},updateDesc:function(n){return i.a.post(e+"/bshop/company/desc/modify",n)},companydetail:function(n){return i.a.get(e+"/bshop/company/business/detail",n)},findCompanyPage:function(){return i.a.get(e+"/bshop/shop/company/find")},updateInfo:function(n){return i.a.post(e+"/bshop/company/business/update",n)},getCertList:function(){return i.a.get(e+"/bshop/company/cert/list")},updateCertModify:function(n){return i.a.post(e+"/bshop/company/cert/modify",n)},addCertModify:function(n){return i.a.post(e+"/bshop/company/cert/create",n)},saveCertOrder:function(n){return i.a.post(e+"/bshop/company/cert/save",n)},getCurrencyList:function(){return i.a.get(e+"/bshop/config/currency/list")},getPayList:function(){return i.a.get(e+"/bshop/config/pay/listall")},getFileList:function(n){return i.a.get(e+"/bshop/content/file/list",n)},saveFileList:function(n){return i.a.post(e+"/bshop/content/file/add",n)},removeFile:function(n){return i.a.get(e+"/bshop/content/file/delete",n)},saveUploadFile:function(n){return i.a.post(e+"/bshop/content/file/add",n)}};o.a=a},500:function(n,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var i=t(372);o.default={data:function(){return{value:"",selectedSubNav:0,qrcodeImg:"",linkDomainUrl:"",editDomain:!1,updateDomain:!1,domainInfo:{topdomain:"",subdomain:""},secondDomain:"",apiHost:".onloon.com.cn",secondeError:"",indepDomain:"",indepError:"",menuList:[{title:'<i class="icon-menupage"></i>页面管理',url:"/pageManagement"},{title:'<i class="icon-menugroup"></i>分组管理',url:"/Group"},{title:'<i class="icon-menuprod"></i>产品列表',url:"/product"}]}},mounted:function(){var n=this;this.$store.dispatch("setNavIndex",1);var o=this.$route.path;for(var t in this.menuList)o===this.menuList[t].url&&(this.selectedSubNav=parseInt(t));(o.includes("/category")||o.includes("/ProductModify"))&&(this.selectedSubNav=2),i.a.getCompanyDomain().then(function(o){o.data.code||(""!==o.data.data&&null!==o.data.data&&void 0!==o.data.data?(n.domainInfo=o.data.data,n.domainInfo.subdomain=o.data.data.subdomain,n.secondDomain=o.data.data.subdomain,n.indepDomain=o.data.data.topdomain):(n.domainInfo.topdomain="",n.domainInfo.subdomain="",n.secondDomain="",n.indepDomain=""),n.setDefaultDomain(n.domainInfo),n.$store.commit("DOMAIN_COMPANY",o.data.data))})},components:{},methods:{setDefaultDomain:function(n){var o="https://buyer.onloon.com.cn"+this.$store.getters.editorMenu+"?shopId="+window.localStorage.shopId;if(""!==n.topdomain&&null!==n.topdomain&&"null"!==n.topdomain){var t=n.topdomain;o="http://"+t,this.value=t}else o="http://"+n.subdomain+".onloon.com.cn",this.value=n.subdomain+".onloon.com.cn";this.getQrcodeFunc(o)},changeDomain:function(){var n="";n=this.value===this.secondDomain?"http://"+this.domainInfo.subdomain+".onloon.com.cn":this.value===this.indepDomain?"http://"+this.domainInfo.topdomain:"http://"+this.domainInfo.subdomain+".onloon.com.cn",this.getQrcodeFunc(n)},getQrcodeFunc:function(n){this.linkDomainUrl=n,this.qrcodeImg="https://server.onloon.com.cn/bshop/index/getqrcode?content="+n},changeMenu:function(n){this.selectedSubNav=n},editDomainPop:function(){this.editDomain=!0,""!==this.domainInfo&&null!==this.domainInfo&&void 0!==this.domainInfo?(this.secondDomain=this.domainInfo.subdomain,this.indepDomain=this.domainInfo.topdomain):(this.secondDomain="",this.indepDomain=""),this.secondeError="",this.indepError=""},cancelFunc:function(){this.updateDomain=!1,""!==this.domainInfo&&null!==this.domainInfo&&void 0!==this.domainInfo&&(this.secondDomain=this.domainInfo.subdomain)},updateDomainFunc:function(n){var o=this;this.secondeError="",this.indepError="";var t=void 0;if("2"===n){if(""===this.secondDomain||null===this.secondDomain||void 0===this.secondDomain)return this.secondeError="绑定失败，二级域名不能为空",!1;if(null===this.secondDomain.match(/^[0-9A-Za-z]{6,15}$/))return this.secondeError="绑定失败，二级域名请输入正常格式，6-15位的英文或数字",!1;t={subdomain:this.secondDomain}}else{if(""===this.indepDomain||null===this.indepDomain||void 0===this.indepDomain)return this.indepError="绑定失败，独立域名不能为空",!1;if(null===this.indepDomain.match(/(([A-Za-z0-9-~]+)\.com)+$/))return this.indepError="绑定失败，请输入正确的域名格式",!1;if(this.indepDomain.indexOf(".com")!==this.indepDomain.length-4)return this.indepError="绑定失败，请输入正确的域名格式",!1;t={topdomain:this.indepDomain}}i.a.updateDomain(t).then(function(t){0===t.data.code?"2"===n?(o.updateDomain=!1,o.domainInfo.subdomain=o.secondDomain,o.setDefaultDomain(o.domainInfo),o.$message({message:"修改二级域名成功",type:"success"})):(o.domainInfo.topdomain=o.indepDomain,o.setDefaultDomain(o.domainInfo),o.$message({message:"修改独立域名成功",type:"success"})):""===t.data.data?"2"===n?o.secondeError="修改二级域名失败":o.indepError="修改独立域名失败":"2"===n?o.secondeError=t.data.message:o.indepError=t.data.message})},copyLink:function(){document.getElementById("copyLinkUrl").select(),document.execCommand("Copy",!1,null),this.$message({message:"复制成功",type:"success"})}},watch:{$route:function(n,o){(n.path.includes("/category")||n.path.includes("/ProductModify"))&&(this.selectedSubNav=2)}}}},624:function(n,o,t){o=n.exports=t(49)(),o.push([n.i,"/**\n * 二级菜单样式\n */\n.topMenu {\n  width: 1200px;\n  margin: 0 auto;\n  border-bottom: 1px solid #dfe3eb;\n  margin-bottom: 16px;\n}\n.topMenu .top-title {\n  font-size: 20px;\n  line-height: 28px;\n  color: #33475B;\n  margin-top: 18px;\n}\n.topMenu .menu {\n  margin-top: 4px;\n}\n.topMenu .menu a {\n  margin-left: 2.8%;\n}\n.topMenu .menu li {\n  display: inline-block;\n  font-size: 13px;\n  padding: 16px 0;\n  position: relative;\n  cursor: pointer;\n  color: #7C98B6;\n}\n.topMenu .menu li .icon-active {\n  display: none;\n}\n.topMenu .menu a:first-child {\n  margin-left: 0;\n}\n.topMenu .menu .icon,\n.topMenu .menu [class^=\"icon\"] {\n  margin-right: 5px;\n}\n.topMenu .menu .curr {\n  border-bottom: 4px solid #5488F9;\n  color: #5488F9;\n}\n.topMenu .menu .curr .icon-unactive {\n  display: none;\n}\n.topMenu .menu .curr .icon-active {\n  display: inline-block;\n}\n.router-view {\n  width: 1200px;\n  margin: 0 auto;\n}\n.qrcode-display .title {\n  text-align: center;\n  margin-top: 10px;\n}\n.qrcode-display img {\n  width: 180px;\n}\n.qrcode-display .opaction {\n  overflow: hidden;\n}\n.qrcode-display .opaction span {\n  cursor: pointer;\n  text-decoration: underline;\n  color: #33475B;\n}\n.qrcode-display .opaction span:hover {\n  color: #5488F9;\n}\n.qrcode-display .opaction .opaction-one {\n  float: left;\n  margin-left: 15px;\n}\n.qrcode-display .opaction .opaction-two {\n  float: right;\n  margin-right: 15px;\n}\n.ui-website .router-view {\n  /*width: calc(~'100% - 200px');*/\n}\n.ui-website .topMenu {\n  /*width: calc(~'100% - 200px');*/\n}\n.ui-website .topMenu .menu {\n  border-bottom: #DFE3EB;\n}\n.ui-website .topMenu .down-line {\n  display: inline-block;\n  height: 30px;\n  background: #CAD6E2;\n  width: 1px;\n  vertical-align: middle;\n  margin: 0 10px;\n}\n.ui-website .topMenu .el-button {\n  padding: 7px 15px;\n  margin-left: 10px;\n}\n.ui-website .topMenu .el-select .el-input input {\n  height: 30px;\n}\n.lf-padding20 {\n  padding: 0 20px;\n}\n.edit-domain .desc {\n  font-size: 13px;\n  color: #33475B;\n  line-height: 21px;\n}\n.edit-domain .domainEdit {\n  background: #F5F8FA;\n  margin: 16px 20px;\n  padding: 0 16px;\n}\n.edit-domain .domainEdit .error-prompt {\n  font-size: 13px;\n  color: #F86563;\n  line-height: 22px;\n  margin-top: 18px;\n}\n.edit-domain .domainEdit .error-prompt i {\n  font-size: 20px;\n  margin-right: 16px;\n}\n.edit-domain .domainEdit .edit {\n  padding: 11px 0 18px 0;\n  border-bottom: 1px solid #DFE3EB;\n}\n.edit-domain .domainEdit .edit .domain-display {\n  font-size: 14px;\n  color: #33475B;\n  line-height: 33px;\n  font-weight: 600;\n}\n.edit-domain .domainEdit .edit .domain-input {\n  border: 1px solid #CBD6E3;\n  border-radius: 4px;\n  font-size: 13px;\n  padding: 4px 0;\n  text-indent: 19px;\n  line-height: 21px;\n}\n.edit-domain .domainEdit .edit .btn {\n  border-radius: 4px;\n  font-size: 13px;\n  line-height: 21px;\n  padding: 7px 14px;\n  margin-left: 16px;\n  cursor: pointer;\n  background: #FFFFFF;\n  border: 1px solid #CBD6E3;\n  color: #4F6D95;\n}\n.edit-domain .domainEdit .edit .can-submit {\n  background: #5488F9;\n  color: #fff;\n  border: #5488F9;\n}\n.edit-domain .domainEdit .binddomain {\n  padding: 16px 0;\n}\n.edit-domain .domainEdit .binddomain .title {\n  font-size: 14px;\n  color: #33475B;\n  line-height: 22px;\n  font-weight: 600;\n}\n.edit-domain .domainEdit .binddomain .prompt {\n  margin-top: 5px;\n  font-size: 13px;\n  color: #7D98B6;\n  line-height: 22px;\n}\n.edit-domain .domainEdit .binddomain .bind {\n  margin-top: 16px;\n}\n.edit-domain .domainEdit .binddomain .bind .bold-desc {\n  font-size: 14px;\n  color: #33475B;\n  line-height: 22px;\n  margin-right: 13px;\n  font-weight: 600;\n}\n.edit-domain .domainEdit .binddomain .bind .sure-btn {\n  background: #5488F9;\n  border-radius: 4px;\n  color: #FFFFFF;\n  padding: 8px 27px;\n  margin-left: 16px;\n  cursor: pointer;\n}\n.edit-domain .domainEdit .binddomain .bind .domain-input {\n  padding: 6px 0;\n  font-size: 13px;\n  line-height: 18px;\n  text-indent: 16px;\n  border-radius: 4px;\n  border: 1px solid #CBD6E3;\n}\n.edit-domain .help {\n  background: #ffeee6;\n  border: 1px solid #feddcc;\n  border-radius: 4px;\n  padding: 16px 18px 16px 52px;\n  margin: 0 20px;\n  position: relative;\n}\n.edit-domain .help .operating-help {\n  position: absolute;\n  top: 18px;\n  left: 16px;\n  font-size: 20px;\n  color: #F86563;\n}\n.edit-domain .help .title {\n  font-size: 14px;\n  color: #404040;\n  letter-spacing: 0;\n  line-height: 21px;\n}\n.edit-domain .help .operating-step {\n  margin-top: 2px;\n  font-size: 13px;\n  color: #666666;\n  letter-spacing: 0;\n  line-height: 21px;\n}\n.edit-domain .help .operating-step .note {\n  font-size: 12px;\n  color: #979797;\n  letter-spacing: 0;\n  line-height: 21px;\n  margin-top: 2px;\n}\n",""])},814:function(n,o,t){n.exports={render:function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("div",{staticClass:"ui-website"},[t("div",{staticClass:"topMenu"},[t("div",{staticClass:"top-title"},[n._v("\n      我的官网\n      "),t("span",{staticClass:"down-line"}),n._v(" "),t("el-select",{staticStyle:{"vertical-align":"bottom"},attrs:{placeholder:"请选择"},on:{change:n.changeDomain},model:{value:n.value,callback:function(o){n.value=o},expression:"value"}},[""!=n.domainInfo.subdomain&&"null"!=n.domainInfo.subdomain&&null!=n.domainInfo.subdomain?t("el-option",{key:"domain",attrs:{label:n.domainInfo.subdomain+n.apiHost,value:n.domainInfo.subdomain}}):n._e(),n._v(" "),""!=n.domainInfo.topdomain&&"null"!=n.domainInfo.topdomain&&null!=n.domainInfo.topdomain?t("el-option",{key:"domain",attrs:{label:n.domainInfo.topdomain,value:n.domainInfo.topdomain}}):n._e()],1),n._v(" "),t("el-popover",{ref:"popover5",attrs:{placement:"bottom",trigger:"hover"}},[t("div",{staticClass:"qrcode-display"},[t("p",{staticClass:"title"},[n._v("手机扫描访问")]),n._v(" "),t("p",[t("img",{attrs:{src:n.qrcodeImg,alt:""}})]),n._v(" "),t("p",{staticClass:"opaction"},[t("span",{staticClass:"opaction-one",on:{click:n.copyLink}},[n._v("复制页面链接")]),t("textarea",{staticStyle:{opacity:"0",position:"absolute",top:"0"},attrs:{id:"copyLinkUrl"}},[n._v(n._s(n.linkDomainUrl))]),t("a",{attrs:{href:n.linkDomainUrl,target:"_blank"}},[t("span",{staticClass:"opaction-two"},[n._v("电脑上查看")])])])])]),n._v(" "),t("el-button",{directives:[{name:"popover",rawName:"v-popover:popover5",arg:"popover5"}],attrs:{type:"primary"}},[n._v("访问官网")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:function(o){n.editDomainPop()}}},[n._v("域名设置")])],1),n._v(" "),t("ul",{staticClass:"menu"},n._l(n.menuList,function(o,i){return t("router-link",{key:i,attrs:{to:{path:o.url}}},[t("li",{class:{curr:i===n.selectedSubNav},domProps:{innerHTML:n._s(o.title)},on:{click:function(o){n.changeMenu(i)}}})])}))]),n._v(" "),t("div",{staticClass:"router-view"},[t("router-view")],1),n._v(" "),t("el-dialog",{attrs:{title:"域名设置","custom-class":"edit-domain"},model:{value:n.editDomain,callback:function(o){n.editDomain=o},expression:"editDomain"}},[t("div",{staticClass:"desc lf-padding20"},[n._v("\n      您可以直接使用盈店通给您免费提供的站点域名作为您的官网地址，或者绑定已有的一级域名作为官网地址，二者选其一即可，也可以同时使用\n    ")]),n._v(" "),t("div",{staticClass:"domainEdit"},[t("div",{staticClass:"edit"},[n.updateDomain||""==n.domainInfo.subdomain?t("p",[t("span",{staticClass:"domain-display"},[n._v("盈店通站点域名：")]),t("input",{directives:[{name:"model",rawName:"v-model",value:n.secondDomain,expression:"secondDomain"}],staticClass:"domain-input",attrs:{type:"text",placeholder:"6-15位英文或数字"},domProps:{value:n.secondDomain},on:{input:function(o){o.target.composing||(n.secondDomain=o.target.value)}}}),n._v(".onloon.cc"),t("span",{staticClass:"btn can-submit",on:{click:function(o){n.updateDomainFunc("2")}}},[n._v("确定")]),""!=n.domainInfo.subdomain?t("span",{staticClass:"btn",on:{click:function(o){n.cancelFunc()}}},[n._v("取消")]):n._e()]):t("p",[t("span",{staticClass:"domain-display"},[n._v("盈店通站点域名："+n._s(n.domainInfo.subdomain)+".onloon.cc")]),t("span",{staticClass:"btn",on:{click:function(o){n.updateDomain=!0}}},[n._v("更改前缀")])]),n._v(" "),""!=n.secondeError?t("p",{staticClass:"error-prompt"},[t("i",{staticClass:"icon-prompt"}),n._v(n._s(n.secondeError))]):n._e()]),n._v(" "),t("div",{staticClass:"binddomain"},[t("p",{staticClass:"title"},[n._v("绑定一级域名（请先CNAME解析至cname.onloon.cn）")]),n._v(" "),t("p",{staticClass:"prompt"},[n._v("提示：请填写www后的内容，比如域名为www.test.com，在此处仅需填写test.com")]),n._v(" "),t("p",{staticClass:"bind"},[t("span",{staticClass:"bold-desc"},[n._v("www.")]),t("input",{directives:[{name:"model",rawName:"v-model",value:n.indepDomain,expression:"indepDomain"}],staticClass:"domain-input",attrs:{type:"text"},domProps:{value:n.indepDomain},on:{input:function(o){o.target.composing||(n.indepDomain=o.target.value)}}}),t("span",{staticClass:"sure-btn",on:{click:function(o){n.updateDomainFunc("1")}}},[n._v("确定")])]),n._v(" "),""!=n.indepError?t("p",{staticClass:"error-prompt"},[t("i",{staticClass:"icon-prompt"}),n._v(n._s(n.indepError))]):n._e()])]),n._v(" "),t("div",{staticClass:"help"},[t("i",{staticClass:"icon-quest operating-help"}),n._v(" "),t("p",{staticClass:"title"},[n._v("如何在您的域名提供商处添加域名解析")]),n._v(" "),t("ul",{staticClass:"operating-step"},[t("li",[n._v("1、根据域名服务商提供的账号及密码登录到域名服务商提供的管理后台；")]),n._v(" "),t("li",[n._v("2、点击“域名管理”；")]),n._v(" "),t("li",[n._v("3、找到需要设置的域名；")]),n._v(" "),t("li",[n._v("4、点击“域名解析”；")]),n._v(" "),t("li",[n._v("\n          5、添加一条域名解析记录，主机名（host）为www，解析类型选择CNAME（别名），记录值填写cname.onloon.cc；\n          "),t("div",{staticClass:"note"},[n._v("\n            注：若您的域名解析配置中已经存在主机名为www的解析记录，须先将其删除再行步骤5；若您任然需要使用之前的www解析记录解析到您已有的网站而不能删除，建议您注册新的域名来绑定盈店通，或者也可以将您不带www的域名解析到您原来的网站而将带www的域名解析到盈店通\n          ")])]),n._v(" "),t("li",[n._v("\n          6、保存后等待解析生效即可，最长解析时间不超过72小时\n          "),t("div",{staticClass:"note"},[n._v("\n            以上参考仅为参考，具体操作以注册商提供的方式为准\n          ")])])])])])],1)},staticRenderFns:[]},n.exports.render._withStripped=!0},901:function(n,o,t){var i=t(624);"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t(88)("12b3d156",i,!1)}});
//# sourceMappingURL=37.3474c94cdac7bbfc7255.js.map