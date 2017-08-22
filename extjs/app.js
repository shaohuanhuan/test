Ext.application({
	requires : [ 'Ext.container.Viewport' ],
	name : 'dashboard',
	allFolder : 'app',
	launch : function() {
        var tree=Ext.create('Ext.tree.Panel', {
	        title : '',
	        width : 200,
	        height : 500,
	        rootVisible:false,
	        root : {
	                text : '',  //一级目录
	                expanded : false, //不展开
	                children : [ {
	                    text : '用户信息', //二级 文件
	                    children:[{
	                        text : '用户数据3232',
	                        leaf : true
	                    }]
	                }, {
	                    text : '客户信息',
	                    children:[{
	                        text : '用户数据3232',
	                        leaf : true
	                    }]

	                } ]
	            }
	        });
        
		Ext.create('Ext.container.Viewport', {
			layout : 'fit', // 自适应
			style : 'padding:0px',
			hideBorders : true,
			items : [ {
				xtype : 'container',
				layout : 'border',
				items : [ {
					xtype : 'topbar',
					height : 50,
					region : 'north'
				}, {
					title:'目录',
					xtype : 'panel',
					id:'dddddd',
					region : 'west',
					collapsible : true,
					split : true,
					width : 240,
					items:[tree]
				}, {
					xtype : 'tabcontroller',
					region : 'center'
				} ]
			} ]
		});
		
	}
	

});

