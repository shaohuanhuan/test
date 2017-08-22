<template>
  <section class="logistic-container">
    <ul class="steps clearfix">
      <li><i class="arrow-light"></i>1、选择类目</li>
      <li class="active">2、填写产品信息</li>
    </ul>
    <div class="detail-box">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px">
        <h2 class="module-title"><label>基本信息</label></h2>
        <el-form-item label="商品名称：" prop="productName" class="item-relat">
          <el-input :maxlength=128 v-model="form.productName" class="input-xl"></el-input>
          <span class="word-num"><i>{{form.productName.length}}</i>/128</span>
        </el-form-item>
        <el-form-item label="商品分类：" prop="category">
          <label class="form-text">{{form.category}}</label>
          <!-- <el-button type="text" class="back-cate">返回修改</el-button> -->
        </el-form-item>
        <el-form-item label="商品编码：">
          <el-input v-model="form.productModel" class="input-xl"></el-input>
        </el-form-item>
        <el-form-item label="产地：" prop="originPlaceCountry">
          <el-select v-model="form.originPlaceCountry" placeholder="请选择" @change="showProv">
            <el-option v-if="places" v-for="place in places" :key="place.id" :label="place.name" :value="place.id" :data-en="place.nameEn">
            </el-option>
          </el-select>
          <el-select v-if="places2.length" v-model="form.originPlaceArea" placeholder="请选择">
            <el-option v-if="places2" v-for="place in places2" :key="place.id" :label="place.name" :value="place.id" :data-en="place.nameEn">
            </el-option>
          </el-select>
          <em class="text-english">Place of origin: {{placeMap[form.originPlaceCountry]}} {{place2Map[form.originPlaceArea]}}</em>
        </el-form-item>
        <el-form-item label="OEM模式：" required>
          <el-select v-model="form.oemMode" placeholder="请选择">
            <el-option label="不支持" value="1"></el-option>
            <el-option label="支持" value="0"></el-option>
          </el-select>
          <em class="text-english">OEM: {{availMap[form.oemMode]}}</em>
        </el-form-item>
        <el-form-item label="样品提供：" required>
          <el-select v-model="form.sampleAvailable" placeholder="请选择">
            <el-option label="支持" value="0"></el-option>
            <el-option label="不支持" value="1"></el-option>
          </el-select>
          <em class="text-english">Sample: {{availMap[form.sampleAvailable]}}</em>
          <el-popover
              ref="popovers"
              placement="top-start"
              width="203"
              height="81"
              trigger="hover"
              visible-arrow="true">
              <div class="oem-pop">
              支持拿样有助于提高您的商品询盘量。
              拿样细节（如运费、规格、个数、包装等）由您
              和买家在询盘过程中确定，盈店通不做限制
              </div>
          </el-popover>
          <a class="icon-quest" href="javascript:;" v-popover:popovers></a>
        </el-form-item>
        <el-form-item label="商品属性：" class="prop-box">
          <div class="attr-addshow clearfix">
            <div class="prop-item" v-if="proplist.length" v-for="(item,index) in proplist" :index="index" >
              <label>{{item.propertyNameCh}}</label>
              <select v-model="item.proVal" class="ui-select" @change="setProp(index)">
                <option v-for="(m, idx) in item.propertiesValueList" :key="m.id" :label="m.valueNameCh" :value="m.id">
                </option>
              </select>
              <em class="text-english">{{item.propertyNameEn}}: {{propMap[item.proVal]}}</em>
            </div>
            <div class="attr-addok" v-if="prodAttr.propArr.length">
              <span v-for="(k,v) in prodAttr.propArr" class="show-close">{{k.name}}:{{k.val}} <i class="icon-remove2" @click="removeAttr(v)"></i></span>
            </div>
            <div v-if="prodAttr.addProp" class="attr-input">
              <el-input type="text" name="propname" :maxlength=30 v-model="prodAttr.propname" placeholder="属性名，如“color”" ></el-input>
              <el-input type="text" name="propval" :maxlength=500 v-model="prodAttr.propval" placeholder="属性值，如“red”" ></el-input>
              <el-button type="primary" class="btn-blue" @click="saveProp">保存</el-button>
            </div>
          </div>
          <div class="left clearfix" :class="{'center': !proplist.length&&!prodAttr.propArr.length&&!prodAttr.addProp}">
              <el-button type="primary" class="btn-blue" @click="moreProp"><i class="icon-addthin"></i> 添加</el-button>
          </div>
        </el-form-item>
        <el-form-item label="商品主图：" required>
          <div class="upload-box clearfix">
            <!-- <el-upload
              :action=uploadurl
              name="picture"
              :on-success="avatarSuccess"
              :on-remove="avatarRemove">
              list-type="picture-card"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              <i class="icon-addthin"></i>
            </el-upload> -->
            <draggable v-model="fileList" :options="{animation: 300,handle:'.avatar'}" @start="drag=true" @end="drag=false" class="img-list clearfix">
              <div v-for="(file, index) in fileList" class="img-item">
                <img :src="file.url+'?x-oss-process=image/resize,h_64,w_64'" class="avatar">
                <i class="icon-close" @click="avatarRemove(index)"></i>
              </div>
            </draggable>
            <el-upload v-if="fileList.length<10"
                class="avatar-uploader"
                :action=uploadurl
                name="picture"
                :on-success="avatarSuccess"
                :file-list="fileList">
                <div class="el-icon-plus avatar-uploader-icon"></div>
              </el-upload>
          </div>
          <!-- <p class="form-text">尺寸640*640像素以上，大小3M以下，支持格式"jpg", "png", "gif", "jpeg",最多10张，至少上传一张</p> -->
        </el-form-item>
        <el-form-item label="描述信息：" prop="productDesc" class="quill-box">
          <template>
            <!-- <vue-editor v-model="form.productDesc"></vue-editor> -->
              <quill-editor v-model="form.productDesc"
                ref="myQuillEditor"
                placeholder="请输入"
                :options="editorOption"
                @ready="onEditorReady($event)">
                <!-- <button @click="customButtonClick">custom button</button> -->
              </quill-editor>
           <!--  @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)" -->
            <!-- <editor @getValue="getContext" v-bind:defaultContent="defaultContent" v-model="form.productDesc"></editor> -->
          </template>
        </el-form-item>
        <h2 class="module-title"><label>价格与供货</label></h2>
        <el-form-item label="计件单位：" prop="productUnitEn">
          <el-select v-model="form.productUnitEn" placeholder="请选择">
            <el-option v-for="g in produnits" :key="g.id" :label="g.productUnit" :value="g.productUnitEn">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供货能力：" required>
          <el-form-item class="input-wrap"  prop="supplyNum">
            <el-input :maxlength=6 v-model="form.supplyNum">
            </el-input>
            <i class="unit-input" v-if="unitMap"><i>|</i>{{unitMap[form.productUnitEn]}}</i>
          </el-form-item>
          <el-form-item class="ui-blk" prop="supplyType">
            <el-select v-model="form.supplyType" placeholder="请选择">
              <el-option value="2" data-en="Day" label="天"></el-option>
              <el-option value="0" data-en="Week" label="周"></el-option>
              <el-option value="1" data-en="Month" label="月"></el-option>
            </el-select>
          </el-form-item>
          <em class="text-english" v-if="form.productUnitEn">Supply Ability: {{form.supplyNum}} {{form.productUnitEn|prodUnitEn}}(s) per {{form.supplyType|dayUnitEn}}</em>
        </el-form-item>
        <el-form-item label="支持的收款方式：" prop="paymentMethod">
          <el-checkbox-group v-model="form.paymentMethod" class="chk-box">
            <el-checkbox label="PayPal" name="paymentMethod" value="PayPal"></el-checkbox>
            <el-checkbox label="VISA" name="paymentMethod" value="VISA"></el-checkbox>
            <el-checkbox label="MasterCard" name="paymentMethod" value="MasterCard"></el-checkbox>
            <el-checkbox label="Western Union" name="paymentMethod" value="Western Union"></el-checkbox>
            <el-checkbox label="L/C" name="paymentMethod" value="L/C"></el-checkbox>
            <el-checkbox label="T/T" name="paymentMethod" value="T/T"></el-checkbox>
            <el-checkbox label="D/P" name="paymentMethod" value="D/P"></el-checkbox>
            <el-checkbox label="D/A" name="paymentMethod" value="D/A"></el-checkbox>
            <el-checkbox label="Other" name="paymentMethod" value="Other"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="价格设置：" prop="quotationMethod">
          <div class="radio-wrap">
            <el-radio label="0" v-model="form.quotationMethod">按数量设置</el-radio>
            <el-radio label="2" v-model="form.quotationMethod">FOB价格</el-radio>
            <el-radio label="1" v-model="form.quotationMethod">按SKU报价</el-radio>
            <em class="tip">（支持用户线上下单）</em>
          </div>
        </el-form-item>
        <el-form-item label="" v-if="form.quotationMethod=='0'" class="price-box">
          <ul class="double-tab">
            <li class="double-header clearfix">
              <div class="double-td"><span>起订量(<span v-if="unitMap">{{unitMap[form.productUnitEn]}}</span>)</span></div>
              <div class="double-td">价格</div>
              <div class="double-td">预览(单位：<span v-if="unitMap">{{unitMap[form.productUnitEn]}}</span>)</div>
            </li>
            <li class="clearfix">
              <div class="double-td num-price-warp">
                <ul class="num-price-list">
                  <li v-for="(value,index) of productNumPrices" :index="index">
                    <label>≥</label> <el-input :maxlength=6 v-model="productNumPrices[index].wholesaleStartNum" @blur="validStartNum(index)"></el-input>
                    <hr class="hr">
                    <label>USD:</label> <el-input v-model="productNumPrices[index].price" :maxlength=7 @blur="validOverone(index)"></el-input>
                    <el-button v-if="index" @click="deleteNum(index)" type="text"> 删除</el-button>
                  </li>
                  <li v-if="productNumPrices.length < 4">
                    <el-button @click="addPriceNum" type="text" class="add-span">
                      <i class="icon-addcir"></i><label>新增价格区间</label>
                    </el-button>
                    <span class="tip">（最多设置4个价格区间）</span>
                  </li>
                </ul>
              </div>
              <!-- <div class="double-td">单价(美元)</div> -->
              <div class="double-td">
                <ul class="preview-tab">
                  <li v-for="(value,index) of productNumPrices" :index="index">
                    <label>≥ </label><span class="red-tip">{{value.wholesaleStartNum}}</span>
                    <hr class="hr">
                    <label>USD </label><span class="red-tip"> {{value.price}}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <el-form-item label="贸易港口：" label-width="100px" prop="tradingPort">
            <el-input v-model="form.tradingPort" placeholder="请输入贸易港口"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item v-if="form.quotationMethod=='2'" class="fob-box">
          <el-form-item label="FOB价格：" label-width="100px" >
            <el-select v-model="form.priceUnit" placeholder="货币单位" class="input-s">
              <el-option value="USD" label="美元"></el-option>
              <el-option value="GBP" label="英镑"></el-option>
              <el-option value="RMB" label="人民币"></el-option>
              <el-option value="EUR" label="欧元"></el-option>
              <el-option value="AUD" label="澳元"></el-option>
              <el-option value="CAD" label="加元"></el-option>
              <el-option value="CHF" label="瑞士法郎"></el-option>
              <el-option value="JPY" label="日元"></el-option>
              <el-option value="HKD" label="港元"></el-option>
              <el-option value="NZD" label="新西兰元"></el-option>
              <el-option value="SGD" label="新加坡元"></el-option>
              <el-option value="NTD" label="新台币"></el-option>
              <el-option value="Other" label="其他货币"></el-option>
            </el-select>
            <el-form-item prop="fobMinPrice" class="fob-inner-item">
            <el-input :maxlength=7 v-model="form.fobMinPrice" class="input-s"></el-input>
            </el-form-item>
            <em class="join"> - </em>
            <el-form-item prop="fobMaxPrice" class="fob-inner-item">
            <el-input :maxlength=7 v-model="form.fobMaxPrice" class="input-s"></el-input>
            </el-form-item>
            <em class="join pos">per</em>
            <el-select v-model="productUnitFob" placeholder="计量单位" class="input-s">
              <el-option v-for="d in produnits" :key="d.id" :label="d.productUnit" :value="d.productUnitEn">
              </el-option>
            </el-select>
            <el-form-item label="最小起订量：" label-width="100px" prop="fobStartNums">
              <el-input :maxlength=6 v-model="form.fobStartNums" class="input-l" placeholder="请输入最小起订量"></el-input>
              /<em class="unit_text" v-if="unitMap">{{unitMap[productUnitFob]}}</em>
            </el-form-item>
            <el-form-item label="贸易港口：" prop="tradingPort2" label-width="100px" >
              <el-input v-model="form.tradingPort2" placeholder="请输入贸易港口"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form-item>
        <el-form-item v-if="form.quotationMethod=='1'" class="sku-box">
          <Sku @skuToParent="fromSku" :form="form" :unit-map="unitMap" :editSpec="editSpec"></Sku>
        </el-form-item>
        <!-- v-bind:unitMap="unitMap" -->
        <h2 class="module-title"><label>商品分组</label></h2>
        <el-form-item label="商品分组：">
          <el-select v-model="form.group1Id" placeholder="请选择" @change="secGroup">
            <el-option v-for="g in groups" :key="g.id" :label="g.name" :value="g.id">
            </el-option>
          </el-select>
          <el-select v-model="form.group2Id" placeholder="请选择">
            <el-option v-for="g in group2list" :key="g.id" :label="g.name" :value="g.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="展示位置：">
          <el-checkbox-group v-model="form.toShopPos">
            <el-checkbox label="toindex" name="toShopPos" value="toindex">置于店铺首页</el-checkbox>
            <el-checkbox label="tofacebook" name="toShopPos" value="tofacebook">同步到Facebook店铺</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="btn-group">
      <el-button type="primary" @click="onSubmit('form', 1)">保存并上架</el-button>
    </div>
    <input type="file" id="getFile" name="picture" @change="uploadFunc($event)" style="display: none"/>
  </section>
</template>
<script>

import { mapGetters } from 'vuex'
import proApi from '../../api/productApi'
import draggable from 'vuedraggable'
// import { VueEditor } from 'vue2-editor'
// import editor from '../../components/SimEditor.vue'
import { quillEditor } from 'vue-quill-editor'
import Vue from 'vue'
import Quill from 'quill'
import { ImageImport } from '@/assets/js/ImageImport.js'
import { ImageResize } from '@/assets/js/ImageResize.js'
Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'ProductModify',
  data () {
    let overzero = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (isNaN(value)) {
        callback(new Error('请输入大于0的数字'))
      } else if (value <= 0) {
        callback(new Error('请输入大于0的数字'))
      } else if ((rule.field === 'fobStartNums' || rule.field === 'supplyNum') && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
        callback(new Error('请输入大于0的正整数'))
      } else {
        callback()
      }
      // else if (value > 1000000) {
      //   callback(new Error('请输入不大于1百万的数字'))
      // }
    }
    return {
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'],     // toggled buttons
            // ['blockquote', 'code-block'],
            // [{ 'header': 1 }, { 'header': 2 }],     // custom button values
            [{'list': 'ordered'}, { 'list': 'bullet' }],
            // [{'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': ['sans-serif', 'monospace', 'serif'] }],
            [{ 'align': [] }],
            ['image', 'link']
          ],
          // imageDrop: true
          imageImport: true,
          imageResize: {
            displaySize: true
          }
        }
      },
      fileList: [],
      group2list: [],
      isModify: '0',
      places2: [],
      proplist: [], // 固定属性列表
      propOpts: [],
      proVal: '',
      prodAttr: {
        addProp: false,
        propname: '',
        propval: '',
        propArr: []
      },
      productNumPrices: [{wholesaleStartNum: '', price: ''}],
      specs: {},
      editSpec: {},
      defaultContent: '',
      productUnitFob: '',
      form: {
        category: '',
        freightBear: '',
        freightPrice: '',
        freightTemplate: '',
        freightWay: '',
        group1Id: '',
        group2Id: '',
        id: '',
        oemMode: '1',
        originPlaceArea: '',
        originPlaceCountry: '',
        paymentMethod: [],
        // priceMax: '',
        // priceMin: '',
        priceUnit: '',
        priceUnitSku: 'USD',
        productFirstPic: '',
        productModel: '',
        productName: '',
        productStatus: '',
        productUnit: '',
        productUnitEn: '',
        productWeight: '',
        quotationMethod: '',
        sampleAvailable: '0',
        shopId: '',
        shopUserId: '',
        supplyNum: '',
        supplyType: '',
        // toShopPos: [],
        tradingPort: '',
        tradingPort2: '',
        weekSupplyNum: 0,
        productFobs: {},
        fobStartNums: '',
        fobMaxPrice: '',
        fobMinPrice: ''
      },
      placeMap: {},
      place2Map: {},
      availMap: {'0': 'Available', '1': 'Refuse'},
      propMap: {},
      unitMap: {},
      positiveInt: /^[1-9]\d*$/, // 正整数
      rules: {
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 128, message: '长度小于128字符', trigger: 'blur' }
        ],
        category: [{ required: true }],
        originPlaceCountry: [
          { required: true, message: '请选择产地', trigger: 'blur' }
        ],
        productUnitEn: [{ required: true, message: '请选择计件单位', trigger: 'blur' }],
        quotationMethod: [{ required: true, message: '请选择报价方式', trigger: 'blur' }],
        paymentMethod: [{ type: 'array', required: true, message: '请选择收款方式', trigger: 'blur' }],
        supplyNum: [{ required: true, message: '请输入供货能力', trigger: 'blur' },
                    { validator: overzero, trigger: 'blur' }],
        supplyType: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        tradingPort: [{ required: true, message: '请输入贸易港口', trigger: 'blur' }],
        tradingPort2: [{ required: true, message: '请输入贸易港口', trigger: 'blur' }],
        productDesc: [{ required: true, message: '请输入描述信息', trigger: 'blur' }],
        fobStartNums: [{ validator: overzero, trigger: 'blur' }],
        fobMinPrice: [{ validator: overzero, trigger: 'blur' }],
        fobMaxPrice: [{ validator: overzero, trigger: 'blur' }]
      },
      uploadurl: process.env.DOMAIN + '/bshop/config/pic/upload'
    }
  },
  components: {
    // editor,
    quillEditor,
    'Sku': resolve => {
      require(['./cpnts/Sku.vue'], resolve)
    },
    draggable
  },
  methods: {
    // 富文本--文件上传
    uploadFunc (e) {
      // let _this = this
      let quilleditor = this.$refs.myQuillEditor.quill
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      let formData = new FormData()
      formData.append('picture', files[0])
      proApi.upload(formData).then(res => {
        if (!res.data.code) {
          var range = quilleditor.getSelection()
          var length = range.index
          quilleditor.insertEmbed(length, 'image', res.data.data.urlWhole)
          // this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    imageHandler (image, callback) {
      document.getElementById('getFile').click()
    },
    // 富文本--文件拖曳
    handleDrop (evt) {
      let files = evt.dataTransfer.files
      this.fileLoop(0, files.length, files)
    },
    fileLoop (index, len, files) {
      let quilleditor = this.$refs.myQuillEditor.quill
      let formData = new FormData()
      formData.append('picture', files[index])
      proApi.upload(formData).then(res => {
        if (!res.data.code) {
          var range = quilleditor.getSelection()
          if (range) {
            var length = range.index
            quilleditor.insertEmbed(length, 'image', res.data.data.urlWhole)
            index++
            if (index < len) {
              this.fileLoop(index, len, files)
            }
          }
        } else {
          // this.$message.error(res.data.message)
        }
      })
    },
    onEditorReady (editor) {
      editor.root.addEventListener('drop', this.handleDrop, false)
      editor.getModule('toolbar').addHandler('image', this.imageHandler)
    },
    fromSku (data) {
      Object.assign(this.specs, data)
    },
    // 二级分组
    secGroup () {
      let _this = this
      let parentId = _this.form.group1Id
      _this.groups.forEach(function (item) {
        if (item.id === parentId) {
          _this.group2list = item.subGroup
          if (item.subGroup.length) {
            _this.form.group2Id = item.subGroup[0].id
          } else {
            _this.form.group2Id = ''
          }
        }
      })
    },
    // 图片上传成功
    avatarSuccess (res, file) {
      this.fileList.push({name: '', url: res.data.urlWhole, shorturl: res.data.url})
    },
    avatarRemove (index) {
      this.fileList.splice(index, 1)
    },
    // 添加属性
    moreProp () {
      this.prodAttr.addProp = true
    },
    // 保存属性
    saveProp () {
      let name = this.prodAttr.propname
      let val = this.prodAttr.propval
      if (!name || !val) {
        this.$message.error('请填写完整')
        return
      }
      this.prodAttr.addProp = false
      this.prodAttr.propArr.push({name: this.prodAttr.propname, val: this.prodAttr.propval})
      this.prodAttr.propname = ''
      this.prodAttr.propval = ''
    },
    // 删除属性
    removeAttr (idx) {
      this.prodAttr.propArr.splice(idx, 1)
    },
    // 选择属性
    setProp (index) {
      // console.log(this.proplist[index].proVal)
      Vue.set(this.proplist, index, this.proplist[index])
    },
    // 按价格报价 - 删除区间
    deleteNum (index) {
      this.productNumPrices.splice(index, 1)
      // Vue.set(this.productNumPrices, index, this.productNumPrices[index])
    },
    addPriceNum () {
      this.productNumPrices.push({wholesaleStartNum: '', price: ''})
    },
    // 中国显示省
    showProv () {
      let _this = this
      if (_this.form.originPlaceCountry === '974dd034f3ff462cb46461d06af315a2') {
        proApi.getProvince().then(res => {
          _this.places2 = res.data.data
          for (let i = 0, len = this.places2.length; i < len; i++) {
            _this.place2Map[this.places2[i].id] = this.places2[i].nameEn
          }
        })
      } else {
        _this.places2 = []
      }
    },
    // 区间验证
    validStartNum (index) {
      let p = this.productNumPrices[index]
      let prev = this.productNumPrices[index - 1]
      let next = this.productNumPrices[index + 1]
      if (isNaN(p.wholesaleStartNum) || p.wholesaleStartNum < 0 || !this.positiveInt.test(p.wholesaleStartNum)) {
        this.$message.error('起订量必须为大于0的正整数')
        return
      }
      if (prev) {
        if (+p.wholesaleStartNum <= +prev.wholesaleStartNum) {
          this.$message.error('起订量必须大于上一个')
          p.wholesaleStartNum = ''
          Vue.set(this.productNumPrices, index, p)
        }
      }
      if (next && next.wholesaleStartNum) {
        if (+p.wholesaleStartNum >= +next.wholesaleStartNum) {
          this.$message.error('起订量必须小于下一个')
          p.wholesaleStartNum = ''
          Vue.set(this.productNumPrices, index, p)
        }
      }
    },
    // 价格验证
    validOverone (index) {
      let p = this.productNumPrices[index]
      if (isNaN(p.price) || p.price < 0) {
        this.$message.error('价格必须为不小于0的数字')
        return
      }
    },
    getContext (value) {
      this.form.productDesc = value
    },
    // 编辑新增公共部分
    addEditComm (cateId, properties) {
      proApi.getPropList({cateId: cateId}).then(res => {
        this.proplist = res.data.data
        this.proplist.forEach((val, index) => {
          if (properties) {
            properties.forEach((item, idx) => {
              if (item.propertyId === val.id) {
                val.proVal = item.propertyValueId
              }
            })
          } else {
            val.proVal = ''
          }
          val.propertiesValueList.forEach((item) => {
            this.propMap[item.id] = item.valueNameEn
          })
        })
      })
    },
    /**
     * 商品编辑 渲染数据
     * @param  {[Object]} res [description]
     */
    renderEdit (res) {
      // let resd = res.data.data
      let product = res.product
      let _this = this
      let cateId = product.cate3Id
      if (!cateId) {
        cateId = product.cate2Id
      }
      if (!cateId) {
        cateId = product.cate1Id
      }
      _this.addEditComm(cateId, res.properties)
      // 简单数据处理
      product.quotationMethod = '' + product.quotationMethod
      product.sampleAvailable = '' + product.sampleAvailable
      product.oemMode = '' + product.oemMode
      product.supplyType = '' + product.supplyType
      product.supplyNum = '' + product.supplyNum
      product.paymentMethod = product.paymentMethod.split(',')
      product.group2Id ? product.group2Id = '' + product.group2Id : null
      product.group1Id = product.group1Id === 0 ? '' : product.group1Id
      product.group2Id = product.group2Id === 0 ? '' : product.group2Id
      // 店铺位置
      // product.toShopPos = []
      // if (product.toIndex) {
      //   product.toShopPos.push('toindex')
      // }
      // if (product.toFacebook) {
      //   product.toShopPos.push('tofacebook')
      // }
      _this.form = product
      _this.productUnitFob = ''
      // 商品属性,规格，描述，图片
      let extend = res.productExtends
      let arrp = extend.productAttr.split(';')
      arrp.forEach(function (item) {
        if (item) {
          _this.prodAttr.propArr.push({name: item.split(':')[0], val: item.split(':')[1]})
        }
      })
      extend.productPicUrlsWhole.split(';').forEach(function (item, i) {
        _this.fileList.push({name: '', url: item, shorturl: extend.productPicUrls.split(';')[i]})
      })
      Object.assign(_this.form, extend)
      // sku报价默认的input
      _this.specs.skuInputs = [{'placed': '规格值，如“S”', 'specval': ''}, {'placed': '规格值，如“M”', 'specval': ''}, {'placed': '规格值，如“L”', 'specval': ''}, {'placed': '规格值，如“XL”', 'specval': ''}]
      // 按数量报价
      if (product.quotationMethod === '0') {
        _this.productNumPrices = res.productNumPrices
        _this.productNumPrices.forEach(function (item) {
          item.price = _this.fenToYuan(item.price)
        })
      // 按fob
      } else if (product.quotationMethod === '2') {
        let fob = res.productFobs[0]
        Object.assign(_this.form, fob)
        // Object.assign(_this.form, {productFobs: fob})
        _this.form.fobMaxPrice = _this.fenToYuan(fob.fobMaxPrice)
        _this.form.fobMinPrice = _this.fenToYuan(fob.fobMinPrice)
        _this.form.tradingPort2 = product.tradingPort
        _this.productUnitFob = fob.productUnitEn
      // 按sku报价
      } else {
        _this.form.freightBear = '' + product.freightBear
        _this.form.freightPrice = _this.fenToYuan(product.freightPrice)
        if (+product.freightTemplate === 0) {
          _this.form.freightTemplate = ''
          _this.form.freightWay = '0'
        } else {
          _this.form.freightWay = '1'
        }
        _this.editSpec = res.productSpecs
      }
      if (product.quotationMethod !== '2') { // 初始化fob
        if (!_this.form.productFobs) {
          Object.assign(_this.form, {
            fobMinPrice: 0,
            fobMaxPrice: 0,
            fobStartNums: 1
            // productUnit: '',
            // productUnitEn: ''
          })
        }
      }
      _this.defaultContent = _this.form.productDesc
      if (product.quotationMethod !== '1') { // 初始化sku
        Object.assign(_this.form, {priceUnitSku: 'USD', freightBear: '', freightWay: ''})
      }
      // 分类名
      let cate = [product.cate1Id, product.cate2Id, product.cate3Id].join(',')
      proApi.getCategory({'cateIds': cate}).then(res => {
        _this.form.category = res.data.data.info
        Vue.set(_this.form, _this.form)
      })
      // 单位换算的方法
      // _this.unittoEn()
    },
    /**
     * 商品新增
     */
    renderAdd () {
      let _this = this
      // 处理分类名
      let themeNameArr = this.$route.params.status.split('>')
      for (let i = 0, len = themeNameArr.length; i < len; i++) {
        themeNameArr[i] = themeNameArr[i].split('-').join('/')
      }
      this.form.category = themeNameArr.join(' >> ')
      // 分类id们
      let themeIds = this.$route.params.itemId.split('>')
      Object.assign(_this.form, {cate1Id: themeIds[0], cate2Id: themeIds[1], cate3Id: themeIds[2]})
      let cateId = themeIds.pop()
      _this.addEditComm(cateId)
    },
    /**
     * 表单提交
     */
    onSubmit (formName, status) {
      let _this = this
      let isValid1 = true
      _this.$refs[formName].validate((valid) => {
        if (!valid) {
          _this.$message.error('必填项信息不能为空')
          isValid1 = false
          return
        }
      })
      if (!isValid1) {
        return
      }
      if (!_this.fileList.length) {
        _this.$message.error('请上传主图')
        isValid1 = false
        return
      }
      // if (!_this.form.productDesc) {
      //   _this.$message.error('请填写描述信息')
      //   isValid1 = false
      //   return
      // }
      // let methd = ''
      // _this.form.paymentMethod.forEach(item => {
      //   methd = methd + item
      // })
      // if (!methd) {
      //   _this.$message.error('请选择收款方式')
      //   isValid1 = false
      //   return
      // }
      if (!isValid1) {
        return
      }
      let data = {}
      let isValid = true
      Object.assign(data, _this.form)
      // delete data.unitMap
      // 处理商品状态
      data.productStatus = 1
      // if (status) {
      //   data.productStatus = status
      // } else {
      //   let sts = _this.$route.status
      //   if (!sts) {
      //     sts = 2
      //   }
      //   data.productStatus = sts
      // }
      if (_this.proplist.length) {
        _this.proplist.forEach((item, idx) => {
          data['properties[' + idx + '].propertyId'] = item.id
          data['properties[' + idx + '].propertyValueId'] = item.proVal
        })
      }
      // 处理省
      if (!_this.places2.length) {
        data.originPlaceArea = ''
      }
      data.productUnit = _this.unitMap ? _this.unitMap[data.productUnitEn] : ''
      // 按sku报价
      if (_this.form.quotationMethod === '1') {
        if (!_this.specs.skuTab) {
          _this.$message.error('请添加规格')
          return
        }
        let invent = _this.specs.skuOpt[0].vals // 库存列
        let opts = _this.specs.skuOpt[1] // 单价列
        let priceunit = data.priceUnitSku
        opts.vals.forEach((item, index) => {
          if (!invent[index].opt) {
            _this.$message.error('规格库存未填写完整')
            isValid = false
            return
          }
          if (isNaN(invent[index].opt) || invent[index].opt < 0 || !_this.positiveInt.test(invent[index].opt)) {
            _this.$message.error('规格库存必须为大于0的正整数')
            isValid = false
            return
          }
          if (!item.opt) {
            _this.$message.error('规格单价未填写完整')
            isValid = false
            return
          }
          if (item.opt.indexOf('~') === -1 && (isNaN(item.opt) || item.opt < 0)) {
            _this.$message.error('规格单价必须为大于0的数字')
            isValid = false
            return
          }
          item.specInventory = invent[index].opt // 库存
          item.priceUnit = priceunit // 货币单位
          item.specValue = item.strval + ';'
          for (let key in item) {
            let v2 = item[key]
            if (key === 'productSpecNums') {
              let start = item.productSpecNums
              if (!start[0].price && !start[0].startNum && start.length === 1) { // 没有起批价
                data['productSpecs[' + index + '].specPrice'] = item.opt
              } else {
                start.forEach((v, k) => {
                  data['productSpecs[' + index + '].productSpecNums[' + k + '].price'] = v.price
                  data['productSpecs[' + index + '].productSpecNums[' + k + '].startNum'] = v.startNum
                })
                data['productSpecs[' + index + '].specPrice'] = start[0].price
                data['productSpecs[' + index + '].priceInterval'] = item.opt
              }
            } else {
              if ('specval,strval,opt,placed'.includes(key)) { // 没用字段
                continue
              }
              data['productSpecs[' + index + '].' + key] = v2
            }
          }
        })
        if (data.freightWay === '0') {
          data.freightTemplate = 0
        }
      }
      // 按数量报价
      if (_this.form.quotationMethod === '0') {
        _this.productNumPrices.forEach(function (item, i) {
          if (!item.wholesaleStartNum) {
            _this.$message.error('起订量未填写完整')
            isValid = false
            return
          }
          if (!item.price) {
            _this.$message.error('单价未填写完整')
            isValid = false
            return
          }
          if (isNaN(item.wholesaleStartNum) || item.wholesaleStartNum < 0 || !_this.positiveInt.test(item.wholesaleStartNum)) {
            _this.$message.error('起订量必须为大于0的正整数')
            isValid = false
            return
          }
          if (isNaN(item.price) || item.price < 0) {
            _this.$message.error('价格必须为不小于0的数字')
            isValid = false
            return
          }
          data['productNumPrices[' + i + '].wholesaleStartNum'] = item.wholesaleStartNum
          data['productNumPrices[' + i + '].numPrice'] = item.price
          data.priceUnit = 'USD'
        })
      }
      // 按fob报价
      if (_this.form.quotationMethod === '2') {
        if (+data.fobMinPrice > +data.fobMaxPrice) {
          _this.$message.error('fob价格区间不正确')
          return
        }
        data.productFobs = {}
        if (_this.productUnitFob) {
          data.productFobs.productUnitEn = _this.productUnitFob
          data.productFobs.productUnit = _this.unitMap[_this.productUnitFob]
        }
        Object.assign(data.productFobs, {fobMinPrice: data.fobMinPrice, fobMaxPrice: data.fobMaxPrice, fobStartNums: data.fobStartNums ? data.fobStartNums : 1, priceUnit: data.priceUnit})
        // data.productFobs.fobMaxPrice = data.fobMaxPrice
        // data.productFobs.fobStartNums = data.fobStartNums
        // data.productFobs.priceUnit = data.priceUnit
        data.tradingPort = _this.form.tradingPort2
        for (let k in data.productFobs) {
          data['productFobForm.' + k] = data.productFobs[k]
        }
      }
      if (!isValid) { // 特殊验证不通过
        return
      }
      // 处理属性
      let attrarr = []
      _this.prodAttr.propArr.forEach(function (item) {
        attrarr.push(item.name + ':' + item.val)
      })
      data.productAttr = attrarr.join(';')
      // 处理图片
      let pics = []
      _this.fileList.forEach(function (item) {
        pics.push(item.shorturl)
      })
      data.productPicUrls = pics.join(';')
      // 处理支付方式
      let payarr = []
      data.paymentMethod.forEach(item => {
        if (item) {
          payarr.push(item)
        }
      })
      data.paymentMethod = payarr.join(',')
      // if (data.toShopPos.indexOf('toindex') !== -1) {
      //   data.toIndex = 1
      // }
      // if (data.toShopPos.indexOf('tofacebook') !== -1) {
      //   data.toFacebook = 1
      // }
      // 处理其他
      data.groupId = data.group2Id ? data.group2Id : data.group1Id
      data.weekSupplyNum = 1
      delete data.inventory
      delete data.group1Id
      delete data.group2Id
      delete data.toShopPos
      delete data.productPicUrlsWhole
      delete data.productFirstPic
      delete data.productFobs
      // 0新增 1编辑
      proApi.saveProduct({flag: _this.isModify, params: data}).then(res => {
        if (!res.data.code) {
          _this.$message({
            type: 'success',
            message: _this.isModify !== '0' ? '编辑成功' : '产品创建成功'
          })
          setTimeout(() => {
            _this.$router.push('/Product')
          }, 500)
        } else {
          _this.$message.error(res.data.message)
        }
      })
    },
    fenToYuan (val) {
      return (parseFloat(val) / 100).toFixed(2)
    },
    deepCopyArr (arr) {
      return JSON.parse(JSON.stringify(arr))
    }
  },
  computed: mapGetters({
    // form: 'productDetail',
    places: 'places',
    groups: 'groups',
    produnits: 'produnits'
    // quilleditor () {
    //   return this.$refs.myQuillEditor.quill
    // }
  }),
  // computed: {
  //   places () {
  //     return this.$store.state.places
  //   },
  //   groups () {
  //     return this.$store.state.groups
  //   },
  //   produnits () {
  //     return this.$store.state.produnits
  //   },
  //   quilleditor () {
  //     return this.$refs.myQuillEditor.quill
  //   }
  // },
  created () {
    this.isModify = this.$route.params.ismodify
    if (this.isModify === '0') {
      document.title = '新增产品'
    } else {
      document.title = '编辑产品'
    }
    this.$store.dispatch('getPlace')
    this.$store.dispatch('getGroup').then(() => {
      this.$store.dispatch('getUnitList')
      if (this.isModify === '0') {
        this.renderAdd()
        return
      }
      // 编辑-商品详情
      proApi.getDetail({productId: this.$route.params.itemId}).then(res => {
        this.renderEdit(res.data.data)
      })
    })
  },
  watch: {
    places () {
      for (let i = 0, len = this.places.length; i < len; i++) {
        this.placeMap[this.places[i].id] = this.places[i].nameEn
      }
    },
    produnits () {
      for (let i = 0, len = this.produnits.length; i < len; i++) {
        this.unitMap[this.produnits[i].productUnitEn] = this.produnits[i].productUnit
      }
    },
    prodAttr () {
      if (this.prodAttr.propname.length > 35) {
        this.prodAttr.propname = this.prodAttr.propname.substring(0, 35)
      }
    }
  },
  mounted () {
    // console.log('this is current quill instance object', this.editor)
  }
}
</script>
<style lang="less">
@import '../../assets/style/product.less';
// @import '../../assets/style/order.less';
.logistic-container{
  // padding: 20px 0;
}
.ui-select{
  padding-left: 5px;
  padding-right: 24px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #CBD6E3;
  border-radius: 4px;
}
.icon-addthin{
  display: inline-block;
  margin-top: -2px;
  margin-right: 2px;
  vertical-align: middle;
}
.el-progress-circle{
  svg{
    margin-left: 40px;
    margin-top: 40px;
    width: 50px;
    height: 50px;
  }
}
// .multiEditor {
//   border: 1px solid #DFE3EB;
// }
.quill-box{
  .el-form-item__content{
    line-height: inherit;
  }
}
.quill-editor{
  margin-bottom: 68px;
  height: 320px;
  .ql-toolbar.ql-snow{
    border: 1px solid #DFE3EB;
  }
  .ql-container.ql-snow{
    border: 1px solid #DFE3EB;
  }
}
// .ql-picker-label:before{
//   vertical-align: top;
// }
</style>
