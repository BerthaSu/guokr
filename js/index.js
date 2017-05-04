(function(){
	var html=document.documentElement;

	html.style.fontSize=20*html.clientWidth/320+'px';

	window.onresize=function(){
		html.style.fontSize=20*html.clientWidth/320+'px';
	};
})();
// banner-show-img-top-new
var address='http://v.juhe.cn/weixin/query?key=0c88f9d8bae4bf5a6d1f130f74f05250';

(function(){	
	$.ajax({
		url:'https://bird.ioliu.cn/v1?url='+address,
		dataType:'jsonp',
		success:function(json){
			if(json.error_code!=0){
				alert('数据请求失败');
				return;
			};
			var data=json.result.list;
			// banner-img
			for(var i=0;i<4;i++){
				var photo='<div class="swiper-slide"><a href="'+data[i].url+'"><img src="'+data[i].firstImg+'" /><h2>'+data[i].title+'</h2></a></div>';
				$(photo).appendTo($('#swiper_list'));
			}
			// Carousel
			new Swiper('.swiper-container',{
				autoplay:3000,
				speed:1000,
				loop:true
			});
			// news
			for(var i=5;i<13;i++){
				var str='<li><a href="'+data[i].url+'">'+data[i].title+'</a></li>';
				$(str).appendTo($('#news'));
			};
		}
	});
})();
// question and hot
(function(){
	function hotNews(obj1,obj2,page){
		$.ajax({
			url:'https://bird.ioliu.cn/v1?url='+address+'&ps=50&pno='+page,
			dataType:'jsonp',
			success:function(json){
				if(json.error_code!=0){
					alert('数据请求失败');
					return;
				};
				var data=json.result.list;

				function show(num){
					var n=num-4;
					var m=num-3;
					var liFirst=$('<li><a href="'+data[n].url+'"><h3>'+data[n].source+'</h3><div class="news-show"><img src="'+data[n].firstImg+'" /><p>'+data[n].title+'</p></div></a></li>');
					liFirst.appendTo(obj2);
					for(var i=num;i>=m;i--){
						var oLi=$('<li><a href="'+data[i].url+'">'+data[i].title+'</a></li>');
						oLi.appendTo(obj2);
					}
				};
				show(5);

				// checked
				obj1.on('tap',function(){
					obj1.children().remove(obj1);
					var index=$(this).index();
					$('<span id="bt_border"></span>').appendTo(obj1.eq(index));
					obj2.html('');
					show((index+1)*5);
				});
			}
		});
	};

	var aBtn1=$('#artical').children();
	var oUl1=$('#artical_list');
	hotNews(aBtn1,oUl1,3);
	var aBtn2=$('#hot_parent').children();
	var oUl2=$('#hot_list');
	hotNews(aBtn2,oUl2,6);
})();
// go back
(function(){
	var timer=null;
	$('#go_back').on('tap',function(){
		clearInterval(timer);
		var start=-1110;
		var dis=0-start;
		var count=Math.floor(2000/30);
		var n=0;
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var cur=start+dis*(1-a*a*a);
			// console.log(cur);
			$('.wrap').css('transform','translate(0px,'+cur+'px)');
			if(n==count){
				clearInterval(timer);
			}
		},30);
	});
})();
(function(){
	// iscroll
	var bigHeight=document.documentElement.clientHeight+'px';
	$('.myscroll').css('height',bigHeight);
	new IScroll('.myscroll',{
        scrollbars: true,
        mouseWheel: true,
        fadeScrollbars:true,
        bounceEasing: 'elastic',
        bounceTime: 1200
    });

})();