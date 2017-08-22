String.prototype.format = function() {
    var args = arguments;//==arguments[4]->['A', 'B', 'C', 'D', 'E']
    return this.replace(/{(\d+)}/g, function(match, number) {//this->item string字符串分成一个个字符的数组  {0},0
        return typeof args[number] != 'undefined'//item 字符串里符合/{(\d+)}/g 的转化成对应序号的arg
        ? args[number]
        : match;
    });
};
$(function(){
	var item = '<a href="#" class="{0} clearfix" data-code={1} parent={2}>{3}{4}</a>';
　　　　　$('#slideShow').append(item.format( 'A', 'B', 'C', 'D', 'E'));

　　　/*
     var b = mergeSort3([1,2,10,5,9]);
     console.log(b)//1,2,5,9,10
     var c = mergeSort2([1,2,10,5,9])
     console.log(c)//1,2,5,9,10
     */
    /*
    var str = "<p>Para 1.</p>"+　　
　　　　"<img src='smiley.jpg'>"+
                "<p>Para 2.</p>"+
                "<div>Div.</div>"
     var c = /<p>.*<\/p>/i.test(str);
     var d = /<p>.*?<\/p>/i.test(str);
     console.log(c,d)//true,true
     */
    
     //定时器
     var len = 1000,
         arr = [];
     while(len --){
         arr.push(len);
     }
     
    function callback(items){
        console.log(items)
    }
    function process(item){
        // console.log('process:'+item)
    }
     var start = +new Date(), stop;
     processArray(arr,process,function(){
         
        stop = +new Date();
        console.log('usetime:'+ +(stop-start),start,stop);//33秒
        console.log("done!")
     });
     
    //  var start2 = +new Date(), stop2;
    //  timedProcessArray(arr,process,function(){
         
    //     stop2 = +new Date();
    //     console.log('usetime2:'+ +(stop2-start2),start2,stop2);//25毫秒
    //     console.log("done!")
    //  });

});

//排序
function merge(left,right){
  var result = [];
  while(left.length > 0&&right.length > 0){
     if(left[0] < right[0]){
        result.push(left.shift());
     }else{
         result.push(right.shift());
      }
    }
     return result.concat(left).concat(right);
}
//递归
function mergeSort2(items){
    if(items.length == 1){
       return items;
    }
    var middle = Math.floor(items.length /2),
        left = items.slice(0,middle),
        right = items.slice(middle);
        //合并排序的代码简单直观，但是mergeSort（）函数会导致很频繁的自调用，一个长n的数组最终会调用mergeSort() 2*n-1次，
        //即一个长度超过1500的数组会在Firefox上发生栈溢出错误
   return merge(mergeSort(left),mergeSort(right));
}
//迭代
function mergeSort(items){
   if(items.length == 1){
       return items;
  }
  var work = [];
  for(var i = 0,len = items.length; i < len; i ++){//items数组的每一个值都单独成数组
     work.push([items[i]])
  }
  work.push([]);//如果数组长度为奇数

　for(var lim =　len; lim > 1; lim = (lim +　1)/2){//lim:5,3,2,1.5.1.25,1.125,1.0625,1.03125......
       for(var j = 0,k = 0;k < lim ;j ++,k+=2){//k:0,2,4,6 j:0,1,2,0,1,0,0
               work[j] = merge(work[k],work[k+1]);//从小到大放数
       }
      work[j] = [];//如果数组长度为奇数
  }
  return work[0];
}
//自己写一个
function mergeSort3(items){
   if(items.length == 1){
       return items;
  }
  var work = [];
  for(var i = 0,len = items.length; i < len; i ++){//items数组的每一个值都单独成数组
     work.push([items[i]])
  }
  work.push([]);//如果数组长度为奇数

　for(var lim =　len; lim > 1; lim = (lim+1)/2){//lim:5,3,2,1.5.1.25,1.125,1.0625,1.03125......
console.log(lim)
       for(var j = 0,k = 0;k < lim ;j ++,k+=2){//k:0,2,4, 0,2 j:0,1,2,0,1,0,0
    //    console.log(k)
               work[j] = merge(work[k],work[k+1]);//从小到大放数
       }
     　work[j] = [];//如果数组长度为奇数
       if(work[0].length == items.length){//控制一下循环
           break;
       }
  }
  return work[0];
}

function processArray(items,process,callback){
     var todo = items.concat();//克隆原数组
    setTimeout(function(){
        process(todo.shift());//取得数组下个元素并进行处理
        //如果还有需要处理的元素，创建另一个定时器
        if(todo.length > 0){
            console.log(1)//都到这里来，每次隔25毫秒
            setTimeout(arguments.callee,25);
        } else {
            callback(items);
        }
            // console.log(items)
    },25);
}

 function timedProcessArray(items,process,callback){
     var todo = items.concat();
     setTimeout(function(){
         var start = +new Date();
        do{//都在这里执行
          process(todo.shift());
            console.log(2)
        }while(todo.length > 0 && (+new Date() - start < 50));
        if(todo.length > 0){
            console.log(2)//没到这里来
           setTimeout(arguments.callee,25);
         }else{
          callback(items)
          }
     },25);
     
    // function callback(items){
    //     console.log(items)
    // }
    // function process(item){
    //     // console.log('process:'+item)
    // }
  }
