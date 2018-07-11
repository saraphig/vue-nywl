<template>
	<div class="page">
  	<!-- <div class="fullPage">
  		   <div class="sonPage">
  		   	    <h1>详细信息.......</h1>
  		   </div>
  	</div> -->
  
   <div id="container" tabindex="0"></div>
	</div>
</template>
<!--在index.html引入
<link rel="stylesheet" href="https://cache.amap.com/lbs/static/main1119.css"/>
  <script src="https://webapi.amap.com/js/marker.js"></script>
   <script src="https://webapi.amap.com/maps?v=1.4.2&key=申请的key值"></script>
   <script type="text/javascript" src="static/js/jquery.min.js" ></script>
    <script type="text/javascript"
            src="http://webapi.amap.com/maps?v=1.4.4&key=申请的key值&plugin=AMap.Autocomplete"></script>
    <script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>  -->
<script>
	 export default {
	 	data(){
	 		return {
	 			isShow:false,
	 		}
	 	},
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
          var p=$.ajax({
					       	type:"get",
					       	url:"../../static/test.json",
					       	async:false,
					       	success:function(e){
//					       		console.log(e);
					       	}
					       }).responseJSON;
   	  var map = new AMap.Map('container',{
   	  	resizeEnable: true,
   	  	
   	  	zoom:5,
   	  	center:[108.968221,34.27414]
		 });   
	  
   	  (function(){
								
         //点击一级marker触发该方法
   	   			var _onClick=function markerClick(e){
											console.log(e);
										infoWindow.open(map, marker.getPosition());
								      			
								        
					}
					
	 //实例化信息窗体
							var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
								content = [];
							content.push("<img src='https://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
							content.push("电话：010-64733333");
							content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
							var infoWindow = new AMap.InfoWindow({
								isCustom: true,  //使用自定义窗体
								content: createInfoWindow(title, content.join("<br/>")),
								offset: new AMap.Pixel(16, -45)
							});

							//构建自定义信息窗体
							function createInfoWindow(title, content) {
								var info = document.createElement("div");
								info.className = "info";

								//可以通过下面的方式修改自定义窗体的宽高
								//info.style.width = "400px";
								// 定义顶部标题
								var top = document.createElement("div");
								var titleD = document.createElement("div");
								var closeX = document.createElement("img");
								top.className = "info-top";
								titleD.innerHTML = title;
								closeX.src = "https://webapi.amap.com/images/close2.gif";
								closeX.onclick = closeInfoWindow;

								top.appendChild(titleD);
								top.appendChild(closeX);
								info.appendChild(top);

								// 定义中部内容
								var middle = document.createElement("div");
								middle.className = "info-middle";
								middle.style.backgroundColor = 'white';
								middle.innerHTML = content;
								info.appendChild(middle);

								// 定义底部内容
								var bottom = document.createElement("div");
								bottom.className = "info-bottom";
								bottom.style.position = 'relative';
								bottom.style.top = '0px';
								bottom.style.margin = '0 auto';
								var sharp = document.createElement("img");
								sharp.src = "https://webapi.amap.com/images/sharp.png";
								bottom.appendChild(sharp);
								info.appendChild(bottom);
								return info;
							}

							//关闭信息窗体
							function closeInfoWindow() {
								map.clearInfoWindow();
							}	
	   		   
        var markers = [];    	
        // var rInfo=document.getElementsByClassName('rightInfo')[0];
        for (var i = 0; i < p.length; i += 1) {

        	// rInfo.innerHTML+='<h2>'+p[i].name+'<h2/>';
        	// rInfo.innerHTML+='<h3>'+p[i].error?p[i].error:''+'<h3/>';
    			var marker;   
    			if (p[i].error ) {//显示错误标志
    				    var icon = new AMap.Icon({
											    					image: '../../static/images/1_03.png',
											    					imageSize:new AMap.Size(24, 24),
											    					size: new AMap.Size(24, 24)
											    				});
      				  marker = new AMap.Marker({
      					icon:icon,
//    					content: content,
      					position: p[i].latlng.split(','),
      					title: p[i].name,
//    					offset: new AMap.Pixel(0,0),
                		name:p[i].name,
      					map: map,
//    					animation:"AMAP_ANIMATION_BOUNCE"
      				});      				           
      				//显示文本
      				marker.content="名字："+p[i].name+"<p>"+p[i].error+"<p/>";
    			} else{//显示正常标志
            	var icon = new AMap.Icon({
				    					image: 'images/1_05.png',
				    					imageSize:new AMap.Size(24, 24),
				    					size: new AMap.Size(24, 24)
				    				});
    				marker = new AMap.Marker({
//  					icon:icon,
    					position: p[i].latlng.split(','),
    					title: p[i].name,
    					map: map,
    					name:p[i].name,
    					color:'blue',
    					type:p[i].type,   					
    				});
//  				marker.content="名字"+p[i].name+'<br/>'+'状态良好';					
          };
    			markers.push(marker);
    			marker.error=p[i].error?p[i].error:'状态良好';
    			marker.id=p[i].id;
    				 marker.subMarkers = [];
    			  AMap.event.addListener(marker, 'click', _onClick);
    		}
   	  })();
  
   //工具
         AMap.plugin('AMap.ToolBar',function(){
                var toolbar = new AMap.ToolBar();
                 map.addControl(toolbar)
          });
      },
    }
  }
</script>

<style>
 .info {
            border: solid 1px silver;
        }
        div.info-top {
            position: relative;
            background: none repeat scroll 0 0 #F9F9F9;
            border-bottom: 1px solid #CCC;
            border-radius: 5px 5px 0 0;
        }
        div.info-top div {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            line-height: 31px;
            padding: 0 10px;
        }
        div.info-top img {
            position: absolute;
            top: 10px;
            right: 10px;
            transition-duration: 0.25s;
        }
        div.info-top img:hover {
            box-shadow: 0px 0px 5px #000;
        }
        div.info-middle {
            font-size: 12px;
            padding: 6px;
            line-height: 20px;
        }
        div.info-bottom {
            height: 0px;
            width: 100%;
            clear: both;
            text-align: center;
        }
        div.info-bottom img {
            position: relative;
            z-index: 104;
        }
        span {
            margin-left: 5px;
            font-size: 11px;
        }
        .info-middle img {
            float: left;
            margin-right: 6px;
        }
</style>