define(function(require,exports,module){
	 $=require('$');
	var IScroll=require('lib/iscroll');

	/**
	 * 页面滚动插件
	 * @type {Object}
	 */
	var iScroll={
		loaded:function(){
			this.myScroll= new IScroll('#wrapper', { useTransition: false});
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		},
		onCompletion:function(){
			var o=this;
			setTimeout(function () {
		        o.myScroll.refresh();
		    }, 0);
		}
	};

	/**
	 * 上下拉刷新插件
	 * @type {Object}
	 */
	var loadRefresh={
		loaded:function(pullDownFunc,pullUpFunc){
		 	var pullDownEl=$("#fresh-wrap-down"),
				  pullUpEl=$("#fresh-wrap-up");
		 	var pullDownFlag=pullDownEl[0].dataset.flag,
				  pullUpFlag=pullUpEl[0].dataset.flag;
			var myScroll=new IScroll('#wrapper',{topOffset: pullDownEl.height(), scrollbars:true});
			myScroll.on("scrollMove",function(){
				console.log(this.y+';;'+pullDownFlag+';;'+this.maxScrollY)
				if(this.y>5&&!pullDownFlag.match("flip")){
					pullDownFlag="flip";
					pullDownEl.html('<i class="iconfont iconarr iconarrup"></i><p class="ui-fresh-text">该放手啦,我要刷新啦...</p>');
					this.minScrollY=0;
				}else if(this.y<5&&pullDownFlag.match("flip")){
					pullDownFlag="";
					pullDownEl.html('<i class="iconfont iconarr"></i><p class="ui-fresh-text">轻轻下拉，刷新精彩</p>');
					this.options.topOffset=-pullDownEl.height();
					this.minScrollY=-pullDownEl.height();
				}else if(this.y < (this.maxScrollY - 5) &&!pullUpFlag.match("flip")){
					pullUpFlag="flip";
					pullUpEl.html('<i class="iconfont iconarr iconarrup"></i><p class="ui-fresh-text">该放手啦,我要加载啦...</p>');
					this.maxScrollY = this.maxScrollY;
				}else if(this.y > (this.maxScrollY + 5) &&pullUpFlag.match("flip")){
					pullUpFlag="";
					pullUpEl.html('<span class="ui-fresh-text">上拉加载更多...</span>');
					this.maxScrollY = pullUpEl.height();
				}
			});
			myScroll.on("scrollEnd",function(){
				if(pullDownFlag.match("flip")){
					pullDownFlag="loading";
					pullDownEl.html('<div id="preloader_1"><span></span><span></span><span></span><span></span><span></span></div>');
					setTimeout(function(){
						pullDownFunc.call(myScroll);
					}, 1000);
				}else if(pullUpFlag.match("flip")){
					pullUpFlag="loading";
					pullUpEl.html('<div id="preloader_1"><span></span><span></span><span></span><span></span><span></span></div>');
					setTimeout(function(){
						pullUpFunc.call(myScroll);
					}, 1000);
				}
			});
			myScroll.on("refresh",function(){
				if(pullDownFlag.match("loading")){
					pullDownFlag="";
					pullDownEl.html('<i class="iconfont iconarr"></i><p class="ui-fresh-text">轻轻下拉，刷新精彩</p>');
				}else if(pullUpFlag.match("loading")){
					pullUpFlag="";
					pullUpEl.html('<span class="ui-fresh-text">上拉加载更多...</span>');
				}
			});

			return myScroll;
		}
	}


	module.exports={
		iScroll:iScroll,
		loadRefresh:loadRefresh
	}
});
