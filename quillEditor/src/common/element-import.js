import Vue from 'vue'
import { Button, Select, Menu, Upload, Submenu, MenuItem, MenuItemGroup, Input, InputNumber, Message,
         Form, FormItem, Option, Radio, RadioGroup, RadioButton, Checkbox, CheckboxGroup,
         Pagination, Table, TableColumn, Popover, Steps, Step, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem, DatePicker, TimePicker, MessageBox, Icon, Tooltip, Tag, Dialog,
         Autocomplete, OptionGroup, Collapse, CollapseItem, Switch, Loading} from 'element-ui'
Vue.use(Steps)
Vue.use(Step)
Vue.use(Button)
Vue.use(Select)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Upload)
Vue.use(Tooltip)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(OptionGroup)
Vue.use(Switch)

// import {
//   Pagination,
//   Dialog,
//   Autocomplete,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   InputNumber,
//   Radio,
//   RadioGroup,
//   RadioButton,
//   Checkbox,
//   CheckboxGroup,
//   Switch,
//   Select,
//   Option,
//   OptionGroup,
//   Button,
//   ButtonGroup,
//   Table,
//   TableColumn,
//   DatePicker,
//   TimeSelect,
//   TimePicker,
//   Popover,
//   Tooltip,
//   Breadcrumb,
//   BreadcrumbItem,
//   Form,
//   FormItem,
//   Tabs,
//   TabPane,
//   Tag,
//   Tree,
//   Alert,
//   Slider,
//   Icon,
//   Row,
//   Col,
//   Upload,
//   Progress,
//   Spinner,
//   Badge,
//   Card,
//   Rate,
//   Steps,
//   Step,
//   Carousel,
//   Scrollbar,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
//   Cascader,
//   ColorPicker
// } from 'element-ui'

// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Autocomplete)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
// Vue.use(Input)
// Vue.use(InputNumber)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Switch)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(OptionGroup)
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
// Vue.use(Popover)
// Vue.use(Tooltip)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Tag)
// Vue.use(Tree)
// Vue.use(Alert)
// Vue.use(Slider)
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Upload)
// Vue.use(Progress)
// Vue.use(Spinner)
// Vue.use(Badge)
// Vue.use(Card)
// Vue.use(Rate)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Carousel)
// Vue.use(Scrollbar)
// Vue.use(CarouselItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Cascader)
// Vue.use(ColorPicker)
Vue.use(Loading)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
