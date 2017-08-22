var moment=require('moment');
var login = require('./login'); //相对src文件目录进行查找
import generateText from './sub';

require('./css/index.css');
$.ajax({
    type: 'GET',
    url: '/json.php',
    data: {},
    dataType: 'json',
    beforeSend: function() {},
    success: function(data) {
        console.log(data);
    },
    error: function(error) {

    }
});
console.log(generateText());

$("#welcome").html(generateText());
