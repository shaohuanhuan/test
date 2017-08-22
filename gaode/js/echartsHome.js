var version = '2.2.7';
var sp = location.pathname.lastIndexOf('/');
var ep = location.pathname.lastIndexOf('.html');
var curPage = sp < ep ? location.pathname.slice(sp + 1, ep) : 'index';
var enVersion = location.href.indexOf('-en.html') != -1
    // for example: http://ecomfe.github.io/echarts/doc/example/force2.html#-en
    || (location.pathname.indexOf('doc/example/') >= 0
        && location.hash
        && location.hash.indexOf('-en') != -1
    );

var activeClass = {};
var loc = {};
var forkWidth = 149;
curPage = curPage.replace('-en', '');
var isExample = false;
switch (curPage) {
    case 'index' :
        activeClass[curPage] = 'active';
        loc[curPage] = '.';
        loc.feature = './doc';
        loc.example = './doc';
        loc.doc = './doc';
        loc.about = './doc';
        loc.changelog = './doc';
        loc.option = './doc';
        loc.spreadsheet = './doc';
        loc.start = './doc';
        loc.img = './doc';
        loc.schema = './docv';
        break;
    case 'feature' :
    case 'example' :
    case 'doc' :
    case 'about' :
    case 'changelog' :
    case 'start' :
        activeClass[curPage] = 'active';
        loc.index = '..';
        break;
    case 'option' :
    case 'spreadsheet' :
        forkWidth = 60;
        activeClass[curPage] = 'active';
        loc.index = '..';
        break;
    default :
        isExample = true;
        forkWidth = 60;
        activeClass['example'] = 'active';
        var extSub = location.href.indexOf('extension') != -1 ? '../' : '';
        loc.index = extSub + '../..';
        loc.feature = extSub + '../../doc';
        loc.example = extSub + '../../doc';
        loc.doc = extSub + '../../doc';
        loc.about = extSub + '../../doc';
        loc.changelog = extSub + '../../doc';
        loc.option = extSub + '../../doc';
        loc.spreadsheet = extSub + '../../doc';
        loc.start = extSub + '../../doc';
        loc.img = extSub + '../../doc';
        loc.schema = extSub + '../../docv';
        break;
}

// Those pages only exist in echarts-www project,
// but not in http://ecomfe.github.io/echarts/ and doc in echarts project.
if (location.href.indexOf('.baidu.com') < 0) {
    loc.option = 'http://echarts.baidu.com/doc';
    loc.spreadsheet = 'http://echarts.baidu.com/doc';
    loc.schema = 'http://echarts.baidu.com/docv';
}


function back2Top() {
    $("body,html").animate({scrollTop:0},1000);
    return false;
}

function changeVersion() {
    if (!isExample) {
        window.location = curPage + (enVersion ? '' : '-en') + '.html'
    }
    else {
        window.location = curPage + '.html' + (enVersion ? '' : '#-en');
        if (enVersion) {
            window.location.hash = window.location.hash.replace('-en', '');
        }
        window.location.reload();
    }
}


if (document.location.href.indexOf('local') == -1) {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?4bad1df23f079e0d12bdbef5e65b072f";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}

function fixFork () {
    var navMarginRight = 0;
    var bodyWidth = document.body.offsetWidth;
    var contnetWidth = $('#nav-wrap')[0].offsetWidth;
    if (bodyWidth < 1440) {
        navMarginRight = 150 - (bodyWidth - contnetWidth) / 2;
    }
    $('#nav')[0].style.marginRight = navMarginRight + 'px';
    $('#fork-image')[0].style.width = (document.body.offsetWidth < 768 ? 1 : forkWidth) + 'px';
};
//fixFork();
//$(window).on('resize', fixFork);