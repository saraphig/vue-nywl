<template>
<div class="sunmapbox">
	<div id="mapmonitor" class="mapmonitor">
        <div id="mapMtop" class="mapMtop">
            <span class='monitoringPointp'>地图监控</span>
                        
            <div class='activeBox' :class="{activecolor : nowold}">
                <span id='monitorActive1' class='selSpan'>{{msg}}</span>
                <div class="iBox">
                <i id='monitorActive2' class="iconfont m-iconfont icon-icon_jiantou_xiazhankai" :class="{open : nowold}"></i>
                </div>
                <ul class='regionsela' v-show='nowold'>
                <li @click='mapmonitorActive()'>{{msg2}}</li>
                </ul>
            </div>

        </div>


        <div id="mapMbottom" class="mapMbottom">
            
            <gaode-map ref="amap" :mapWidth="mapWidth" :mapHeight="mapHeight">
                <div id="slotbox" v-show="showslot" ref="slotDiv" slot="slotDiv" class="slotDiv">
                 <div id="showmsg" v-if="!a" class="showmsg">
                    <!-- <div class="mapclosebox"><div class="mapclose" @click="close()">×</div></div> -->
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备类型:</span>
                        <span class="showmsgsp2">{{soltmsg}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备数量:</span>
                        <span class="showmsgsp2">{{soltnum1}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备状态:</span>
                        <span class="showmsgsp2">在线{{soltshowlist.onLine}}，<span class="spanActiveColor">离线{{soltshowlist.offLine}}</span></span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">所在机构:</span>
                        <span class="showmsgsp2">{{soltshowlist.agentName}}</span>
                    </div>
                    <div class="separationLine"></div>
                    <div class="showmsgchildbox boxcenter">
                        <span class="showmsgsp3" @click="pushshebei()">查看详情</span>
                    </div>
                </div>

                   <div id="showmsg" v-if="a" class="showmsg">
                        <!-- <div class="showmsgchildbox"><div class="mapclose" @click="close()">×</div></div> -->
                        <div class="showmsgchildbox">
                            <span class="showmsgsp1">机构名称:</span>
                            <span class="showmsgsp2">{{soltshowlist.agentName}}</span>
                        </div>
                        <div class="showmsgchildbox">
                            <span class="showmsgsp1">机构状态:</span>
                            <span class="showmsgsp2">{{soltshowlist.stateName}}</span>
                        </div>
                        <div class="showmsgchildbox">
                            <span class="showmsgsp1">地块数量:</span>
                            <span class="showmsgsp2">{{soltshowlist.sumADate}}</span>
                        </div>
                        <div class="showmsgchildbox">
                            <span class="showmsgsp1">当前告警状态:</span>
                            <span class="showmsgsp2">{{soltshowlist.alarmTotal}}</span>
                        </div>
                        <div class="showmsgchildbox">
                            <span class="showmsgsp1">设备状态:</span>
                            <span class="showmsgsp2">在线{{soltshowlist.deviceOnline}}，<span class="spanActiveColor">离线{{soltshowlist.deviceOffline}}</span></span>
                        </div>
                        <div class="separationLine"></div>
                        <div class="showmsgchildbox boxcenter">
                            <span class="showmsgsp3" @click="pushxiangmu()">查看详情</span>
                        </div>
                    </div>

                </div>
            </gaode-map>

            <div class="mapinputbox">
                <input v-model="inputname" placeholder="请输入项目名称" class="mapinput" @keyup.13='searchlistnow(inputname)' >
                <i @click="searchlistnow(inputname)" class="seach-iconfont iconfont icon-icon_shipinjiankong_suofang"></i>
            </div>

            <div class="mapsearchbox" @click="showmapsearch()">
                <span :class="{activecolors:showsearch}">{{cityName}}</span>
                <i class="iconfont" :class="[icon5]"></i>
            </div>
            

            <div class="positionbox">
            <div v-show="!a" class="mapcontrolbox">
                <div @click="activeequipment(1)" id="ksbox1" class="ksbox" :class="{activecolor:b==1?true:false}">
                    <i class="iconfont ksiconfont icon-icon_ditujiankong_chuanganqi"></i>
                    <span>传感器</span>
                    <!-- <i class="iconfont" :class="[icon1]" ></i> -->
                </div>
                <div @click="activeequipment(2)" id="ksbox2" class="ksbox" :class="{activecolor:b==2?true:false}">
                    <i class="iconfont ksiconfont icon-icon_ditujiankong_caijiqi"></i>
                    <span>采集器</span>
                    <!-- <i class="iconfont" :class="[icon2]"></i> -->
                </div>
                <div @click="activeequipment('0001')" id="ksbox3" class="ksbox" :class="{activecolor:b==3?true:false}">
                    <i class="iconfont ksiconfont icon-icon_ditujiankong_kongzhizhuji"></i>
                    <span>控制主机</span>
                    <!-- <i class="iconfont" :class="[icon3]"></i> -->
                </div>
                <div @click="activeequipment('0003')" id="ksbox4" class="ksbox" :class="{activecolor:b==4?true:false}">
                    <i class="iconfont ksiconfont icon-icon_ditujiankong_shexiangtou_b"></i>
                    <span>摄像头</span>
                    <!-- <i class="iconfont" :class="[icon4]"></i> -->
                </div>
            </div>
            </div>


                    <!-- <div class="showmsgchildbox">
                        <span class="showmsgsp1">当前湿度:</span>
                        <span class="showmsgsp2">{{soltshowlist.c[0]}}，{{soltshowlist.c[1]}}，{{soltshowlist.c[2]}}{{solts1}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">当前温度:</span>
                        <span class="showmsgsp2">{{soltshowlist.d[0]}}，{{soltshowlist.d[1]}}，{{soltshowlist.d[2]}}{{solts2}}</span>
                    </div> -->


                 <!-- <div v-if="!a" class="showmsg">
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备类型:</span>
                        <span class="showmsgsp2">{{soltmsg}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备数量:</span>
                        <span class="showmsgsp2">{{soltnum1}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">设备状态:</span>
                        <span class="showmsgsp2">在线{{soltshowlist.onLine}}，离线{{soltshowlist.offLine}}</span>
                    </div>
                    <div class="showmsgchildbox">
                        <span class="showmsgsp1">所在机构:</span>
                        <span class="showmsgsp2">{{soltshowlist.agentName}}</span>
                    </div>
                </div> -->



        </div>
	</div>
</div>
</template>

<script>
    import GaodeMap from '../../components/gaode-map.vue'
    import eventBus from '@com/event-bus';
	export default {
        name:'map_monotor',
        data(){
            return{
                nowold:false,
                a:true,
                b:1,
                mapWidth:'100%',
                //mapWidth:'1400px',
                mapHeight:'780px',
               // mapicon:'',
                showsearch:false,
                makarr:[],
                maklist:[],
                inputname:'',
                soltshowlist:{},
                cityName:'',
                showslot:false,
                continued:true
            }
        },
        components:{
            GaodeMap
        },
        computed:{
            // solts1(){
            //     if(soltshowlist.c.length>3){
            //         return '...'
            //     }else{
            //         return ''
            //     }
            // },
            // solts2(){
            //     if(soltshowlist.d.length>3){
            //         return '...'
            //     }else{
            //         return ''
            //     }
            // },
            mapicon(){
                if(this.a==true){
                    return '../../../../static/resource/nongye/img/xiangmu.png'
                }else{
                    if(this.b==1){
                        return '../../../../static/resource/nongye/img/chuangganqi.png'
                    }else if(this.b==2){
                        return '../../../../static/resource/nongye/img/caijiqi.png'
                    }else if(this.b=='0001'){
                        return '../../../../static/resource/nongye/img/kongzhizhuji.png'
                    }else if(this.b=='0003'){
                        return '../../../../static/resource/nongye/img/shexiangtou.png'
                    }
                }
            },
            soltnum1(){
                var num = this.soltshowlist.onLine + this.soltshowlist.offLine;
                return num;
            },
            soltmsg(){
              if(this.b==1){
                  return '传感器'
              }else if(this.b==2){
                  return '采集器'
              }else if(this.b=='0001'){
                  return '控制主机'
              }else if(this.b=='0003'){
                  return '摄像头'
              }
            },
            icon1(){
                if(this.b==1){
                    return 'icon-icon_jiantou_xiazhankai'
                }else{
                    return 'icon-icon_jiantou_shangzhankai'
                }
            },
            icon2(){
                if(this.b==2){
                    return 'icon-icon_jiantou_xiazhankai'
                }else{
                    return 'icon-icon_jiantou_shangzhankai'
                }
            },
            icon3(){
                if(this.b=='0001'){
                    return 'icon-icon_jiantou_xiazhankai'
                }else{
                    return 'icon-icon_jiantou_shangzhankai'
                }
            },
            icon4(){
                if(this.b=='0003'){
                    return 'icon-icon_jiantou_xiazhankai'
                }else{
                    return 'icon-icon_jiantou_shangzhankai'
                }
            },
            icon5(){
                if(this.showsearch==true){
                    return 'icon-icon_jiantou_shangshouqi'
                }else{
                    return 'icon-icon_jiantou_xiazhankai'
                }
            },
            msg(){
                if(this.a==true){
                    return '项目视图'
                }else{
                    return '设备视图'
                }
            },
            msg2(){
                if(this.a==true){
                    return '设备视图'
                }else{
                    return '项目视图'
                }
            }
        },
        beforeDestroy(){
            var that = this;
            //eventBus.$off('closemapbox');
            for(var j=0;j<this.maklist.length;j++){
                // console.log(that.maklist[j])
                that.removeMarkerHandle(that.maklist[j].areaCode)
                that.$refs.amap.removeMarkerListenEvent(that.maklist[j].areaCode,'click')
            }
        },
        mounted(){
            var that = this;
            document.getElementById('mapmonitor').addEventListener("click",function(e){
                //console.log(e.target.nodeName)
                if(e.target.id=='monitorActive1'||e.target.id=='monitorActive2'){
                    //console.log(1)
                    that.showslot=false
                    that.nowold=!that.nowold;
                }else{
                    //that.showslot=false
                    that.nowold=false;
                }
            });
            //this.newMarkerHandle(qq);
            //this.addMarkerListenEventHandle(qq)
            //this.initDistrictHandle();
            // eventBus.$on('closemapbox',(ev_show) => {
            //     this.showsearch=false;
            //     //this.districtHideHandle();
            // })
            this.addMapListenHandle();
            this.$refs.amap.getCurCity(
                function(e) {
                    //console.log(e)
                    that.cityName=e.regeocode.addressComponent.city;
                    //console.log(11111)
                    that.choiceCity(e.regeocode.addressComponent.city);
                    //console.log(22222)
                }
            )
            //this.districtShowHandle();
            //初始化城市组件
            this.$refs.amap.initDistrict(354,70,function(e){
                console.log(e)
                if(e.type=='city'){
                    console.log(333)
                    that.$refs.amap.districtUpdate(null,function(q){
                        console.log(q);
                        console.log(e);
                        that.cityName=q;
                        that.choiceCity(q);
                    });
                    // that.$refs.amap.getCurCity(function(e){
                    //     console.log(e);
                    //     if(e.regeocode.addressComponent.city==''){
                    //         that.cityName=e.regeocode.addressComponent.province;
                    //         console.log(e.regeocode.addressComponent.province)
                    //         that.$refs.amap.districtUpdate(null,function(e){
                    //             console.log(e)
                    //         });
                    //         
                    //     }else{
                            
                    //         that.cityName=e.regeocode.addressComponent.city;
                    //         console.log(e.regeocode.addressComponent.city)
                    //        // that.$refs.amap.districtUpdate();
                    //         that.$refs.amap.districtUpdate(null,function(e){
                    //             console.log(e)
                    //         });
                    //         that.choiceCity(e.regeocode.addressComponent.city);
                    //     }
                    // })
                    // that.choiceCity(e.data);
                    // that.cityName=e.data;
                    // console.log(e.data)
                    // that.$refs.amap.districtUpdate(e.data);
                }else{
                    that.showsearch=false;
                }
            });

            this.$refs.amap.mapMoveEndGetCityEvent(function(e) {
                console.log(e);
                that.$refs.amap.districtUpdate(null,function(e){
                    console.log(e);
                    that.cityName=e;
                });
            });


            this.districtHideHandle();


        },
        methods:{
            //关闭slot
            close(){
                this.showslot=false
            },
            //跳转设备详情
            pushshebei(){
                //this.showslotlist.deviceType = this.b;
                sessionStorage.setItem('mapEquipmentList',JSON.stringify(this.soltshowlist));
                sessionStorage.setItem('equipmentType',this.b);
                this.$router.push({path: '/map_monitor/view'});
                //console.log(JSON.parse(sessionStorage.getItem('mapEquipmentList')))
            },
            //跳转项目详情
            pushxiangmu(){
                sessionStorage.setItem('mapProjectList',JSON.stringify(this.soltshowlist));
                this.$router.push({path: '/map_project'});
            },
			// // 获取当前地图中心点的城市信息
			// getCurCity(callback) {
			// 	let lngLat = map.getCenter();
			// 	AMap.plugin('AMap.Geocoder', function() {
			// 		var geocoder = new AMap.Geocoder({
			// 			city: ""
			// 		});
			// 		geocoder.getAddress(lngLat, function(status, result) {
			// 			callback(result);
			// 		})
			// 	});
			// },
            //添加地图事件
            addMapListenHandle() {
                var that=this;
				this.$refs.amap.addMapListenEvent("mouseup", function(e) {
                   // console.log(e);
                    that.showslot=false
				});
			},
            //删除标记点
            removeMarkerHandle(a) {
               // console.log(a+'--移除了mark点')
				this.$refs.amap.removeMarker(a);
			},
            //搜索框搜索
            searchlistnow(a){
                //console.log(a);
                var that = this;
                if(this.inputname==''){
                    alert('搜索信息不能为空，请填写搜索信息')
                    return 
                }
                if(this.continued==false){
                    return
                }
                this.continued = false;
                this.showslot=false;

                for(var j=0;j<this.maklist.length;j++){
                   // console.log(that.maklist[j])
                    that.removeMarkerHandle(that.maklist[j].areaCode)
                    that.$refs.amap.removeMarkerListenEvent(that.maklist[j].areaCode,'click')
                }
                if(this.a==true){
                    that.$store.dispatch('getMaplist', {
                            'ssName':a
                        }).then((data) => {
                            that.maklist = data;
                            console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                                
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y);
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }else{
                    //console.log(a,that.b)
                    that.$store.dispatch('getMapEquipmentList', {
                        'ssName':a,
                        'deviceType':that.b
                    }).then((data) => {
                        that.maklist = data;
                        console.log(data);
                        for(var i=0;i<data.length;i++){
                            that.newMarkerHandle(data[i]);
                            that.addMarkerListenEventHandle(data[i].areaCode)
                        }
                        this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                    },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }
               // this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)

            },
            //切换项目视图和设备视图
            mapmonitorActive(){
                this.a=!this.a;
                var that = this;
                that.showslot=false;
                //that.showslot=false;
                that.soltshowlist=[];
                for(var j=0;j<this.maklist.length;j++){
                    that.removeMarkerHandle(that.maklist[j].areaCode)
                    that.$refs.amap.removeMarkerListenEvent(that.maklist[j].areaCode,'click')
                }
                that.maklist=[];
                if(this.inputname==''){
                    //alert('搜索信息不能为空，请填写搜索信息')
                    return 
                }
                if(this.continued==false){
                    return
                }
                this.continued = false;
                if(this.a==true){
                    that.$store.dispatch('getMaplist', {
                            'ssName':that.inputname
                        }).then((data) => {
                            that.maklist = data;
                        //    console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }else{
                    //console.log(a,that.b)
                    that.$store.dispatch('getMapEquipmentList', {
                        'ssName':that.inputname,
                        'deviceType':that.b
                    }).then((data) => {
                        that.maklist = data;
                     //   console.log(data);
                        for(var i=0;i<data.length;i++){
                            that.newMarkerHandle(data[i]);
                            that.addMarkerListenEventHandle(data[i].areaCode)
                        }
                        this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                        //this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                    },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }
            },
            //切换设备选项框时
            activeequipment(a){
                var that = this;
                this.b = a;
                if(that.inputname==''){
                    alert('搜索信息不能为空，请填写搜索信息')
                    return
                }
                if(this.continued==false){
                    return
                }
                this.continued = false;
                that.showslot=false;
                that.soltshowlist=[];
                for(var j=0;j<this.maklist.length;j++){
                    that.removeMarkerHandle(that.maklist[j].areaCode)
                    that.$refs.amap.removeMarkerListenEvent(that.maklist[j].areaCode,'click')
                }
                if(a==1){
                    that.$store.dispatch('getMapEquipmentList', {
                            'ssName':that.inputname,
                            'deviceType':a
                        }).then((data) => {
                            that.maklist = data;
                            console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                           // this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }else if(a==2){
                    that.$store.dispatch('getMapEquipmentList', {
                            'ssName':that.inputname,
                            'deviceType':a
                        }).then((data) => {
                            that.maklist = data;
                            console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                           // this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }else if(a==3){
                    that.$store.dispatch('getMapEquipmentList', {
                            'ssName':that.inputname,
                            'deviceType':a
                        }).then((data) => {
                            that.maklist = data;
                           console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                           // this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }else if(a==4){
                    that.$store.dispatch('getMapEquipmentList', {
                            'ssName':that.inputname,
                            'deviceType':a
                        }).then((data) => {
                            that.maklist = data;
                            console.log(data);
                            for(var i=0;i<data.length;i++){
                                that.newMarkerHandle(data[i]);
                                that.addMarkerListenEventHandle(data[i].areaCode)
                            }
                            this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                           // this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                        },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })                   
                }
                
            },
            //添加标记点
            newMarkerHandle(a) {
               // console.log(a);
				let marker = {};
				marker.id = a.areaCode;
				marker.icon = this.mapicon; // 图标
				marker.lng = a.x; // 经度
                marker.lat = a.y; // 纬度
				marker.visible = true; // 显示隐藏
                marker.draggable = false; //是否可拖动
               // console.log(marker);
				this.$refs.amap.newMarker(marker);

			},
            //初始化搜索插件
            initDistrictHandle() {
				this.$refs.amap.initDistrict(340, 70);
			},
            //显示搜索插件
			districtShowHandle() {
				this.$refs.amap.districtShow();
			},
            //隐藏搜索插件
            districtHideHandle() {
				this.$refs.amap.districtHide();
			},
            //点击显示和隐藏搜索地址
            showmapsearch(){
                this.showsearch=!this.showsearch;
                if(this.showsearch==true){
                    this.districtShowHandle()
                }else{
                    this.districtHideHandle()
                }
            },
            //添加点击事件
            addMarkerListenEventHandle(a) {
                let _this = this;
               // console.log(a+'--添加点击事件')
				this.$refs.amap.addMarkerListenEvent(a, "click", function(e) {
					//console.log(e);
                    // 单击时显示隐藏页面
                   // console.log(1);
                   // console.log(a)
                   // console.log(_this.maklist[0])
                    for(let i=0;i<_this.maklist.length;i++){
                     //   console.log(i)
                        if(_this.maklist[i].areaCode==a){
                      //      console.log(_this.maklist[i])
                            _this.soltshowlist = _this.maklist[i]
                        }
                    }
                   // console.log(_this.soltshowlist)
                    //console.log(e.pixel.x);
                    //console.log(e.pixel.y);
                    
					// _this.$refs.slotDiv.style.left = e.pixel.x + "px";
                    // _this.$refs.slotDiv.style.top = e.pixel.y + "px";
                    // _this.showslot=true
                    _this.showslot=true;
                    setTimeout(function(){
                    var x = 0;
                    var y = 0;
                    var w1 = document.getElementById('showmsg').offsetWidth
                    var w = document.getElementById('mapMbottom').offsetWidth-w1-10;
                    console.log('w====>'+w)
                    if(e.pixel.x>w){
                        x=e.pixel.x-w1;
                    }else{
                        x=e.pixel.x
                    }
                    var h1 = document.getElementById('showmsg').offsetHeight;
                    var h = 780-h1-10;
                    console.log('h====>'+h,'h1=====>'+h1)
                    if(e.pixel.y>h){
                        y=e.pixel.y-h1
                    }else{
                        y=e.pixel.y
                    }
                    _this.$refs.slotDiv.style.left = x + "px";
                    _this.$refs.slotDiv.style.top = y + "px";
                    // _this.showslot=true
                    },100)
                    // var x = 0;
                    // var y = 0;
                    // var w = document.getElementById('mapMbottom').offsetWidth-220;
                    // console.log(document.getElementById('showmsg').offsetWidth,document.getElementById('slotbox').offsetWidth)
                    // console.log('w====>'+w)
                    // if(e.pixel.x>w){
                    //     x=e.pixel.x-220;
                    // }else{
                    //     x=e.pixel.x
                    // }
                    // var h = document.getElementById('mapMbottom').offsetHeight-300;
                    // console.log('h====>'+h,'y=====>'+e.pixel.y)
                    // if(e.pixel.y>h){
                    //     y=h
                    // }else{
                    //     y=e.pixel.y
                    // }
                    // _this.$refs.slotDiv.style.left = x + "px";
                    // _this.$refs.slotDiv.style.top = y + "px";
                    // // _this.showslot=true
                    // console.log(document.getElementById('showmsg').offsetWidth,document.getElementById('slotbox').offsetWidth)
				});
				// this.$refs.amap.addMarkerListenEvent(a, "mouseup", function(e) {
				// 	console.log(e);
				// });
            },
            //选中城市
            choiceCity(a){
                var that = this;
                this.showslot=false;
                if(a==''){
                    return
                }
                if(this.continued==false){
                    return
                }
                this.continued = false;
                console.log('a---'+a);
                for(var j=0;j<this.maklist.length;j++){
                   // console.log(that.maklist[j])
                    that.removeMarkerHandle(that.maklist[j].areaCode)
                    that.$refs.amap.removeMarkerListenEvent(that.maklist[j].areaCode,'click')
                }
                if(this.a==true){
                    that.$store.dispatch('getMaplist', {
                        'city':a
                    }).then((data) => {
                        that.maklist = data;
                        console.log('data-----'+data);
                        for(var i=0;i<data.length;i++){
                            that.newMarkerHandle(data[i]);
                            that.addMarkerListenEventHandle(data[i].areaCode)
                        }
                        this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                        
                    },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })                   
                }else{
                    that.$store.dispatch('getMapEquipmentList', {
                        'city':a,
                        'deviceType':that.b
                    }).then((data) => {
                        that.maklist = data;
                        console.log('data-----'+data);
                        for(var i=0;i<data.length;i++){
                            that.newMarkerHandle(data[i]);
                            that.addMarkerListenEventHandle(data[i].areaCode)
                        }
                        this.continued=true
                        if(data!=''){
                            this.$refs.amap.mapFromLngLat(this.maklist[0].agentX,this.maklist[0].agentY)
                            that.$refs.amap.districtUpdate(null,function(e){
                                console.log(e);
                                that.cityName=e;
                            });
                        }
                        //this.$refs.amap.mapFromLngLat(this.maklist[0].x,this.maklist[0].y)
                    },err => {
                        this.continued=true;
                        console.log(this.continued,'失败')
                    })
                }
            }
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "index.styl";
    .amap-icon img{
            width: 26px!important;
            height :33px!important;
    }
</style>