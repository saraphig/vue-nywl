<template>
<div class="page1">
  <div id="container"></div>
    <div id="myPageTop">
        <table>
            <tr>
                <td class="column2">
                    <label>经度：</label>
                </td>
                <td class="column2">
                    <label>纬度：</label>
                </td>
            </tr>
            <tr>
                <td class="column2">
                    <input type="text" readonly="true" id="lng">
                </td>
                <td class="column2">
                    <input type="text" readonly="true" id="lat">
                </td>
            </tr>
        </table>
        <input class="sub" type="button" value="提交">
    </div>
</div>
</template>
<script>
  // 说明：此组件用于获取经纬度，如果引用报错，请百度一下，vue调用高德地图
import AMap from 'AMap'
 /*eslint-disable no-undef */
export default {
    name:'vmap',
   data(){
      return{

      }
   },
   mounted:function(){
        var map = new AMap.Map("container", {
        resizeEnable: true,
    });
    var marker=null;
    //为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function(e) {
    	map.clearMap();//清除上一个标记点
    	console.log(e);
    	console.log('纬度：'+e.lnglat.lat+','+'经度：'+e.lnglat.lng);
        document.getElementById("lng").value = e.lnglat.getLng();
        document.getElementById("lat").value = e.lnglat.getLat();
        marker = new AMap.Marker({
							//  					icon:icon,
							    					position: e.lnglat,

							    					map: map,

							    					color:'blue',
							//  					.split(','),
    				});
    });
   },

}
</script>
<style>
    .page1{
        width:100%;
        height:600px;
        position:relative;
    }
    #container{
        width:100%;
        height:60%;
    }
</style>

