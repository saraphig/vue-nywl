
<template>
<div class="main-container">
    <div class="content_panel" >
  	        <v-messagebox v-show="messageTextShow"  @select-type="onSelectType" :content="messageText"></v-messagebox>
            <div class="title-equipment">告警设置-{{ assertName }}
                <div class="equipment_button">
				<input type="reset"  name="equipmentReset" @click.stop="equipmentReset()" value="取 消" />
				<input type="submit"  name="equipmentSubmit" @click.stop="equipmentSubmit()" value="保 存"/>
			    </div>
            </div>
			<p class="equipment_title"><span class="label-prefix"></span>告警阈值</p>
            <div class="equipment_list">
				<div class="equipment_number">
						<span class="label_number number-left">~过低</span>
                        <div class="equipment_input_box">
                            <input type="text" maxlength="3" name="LoLoalarm" id="LoLoalarm" v-model="lowLowAlarm" class="equipment_input w68" />
                            <i class="normal-up iconfont icon-icon_jiantou_shangshouqi"  @click.stop="lowLowAlarm = parseInt(lowLowAlarm) + 1"></i>
                            <i class="normal-down iconfont icon-icon_jiantou_xiazhankai"  @click.stop="lowLowAlarm = parseInt(lowLowAlarm) - 1"></i>
                        </div>
						<span class="label_number">~偏低~ </span>
                        <div class="equipment_input_box">
					    	<input type="text" maxlength="3" name="Loalarm" id="Loalarm" v-model="lowAlarm" class="equipment_input w68" />
                            <i class="normal-up iconfont icon-icon_jiantou_shangshouqi"  @click.stop="lowAlarm = parseInt(lowAlarm) + 1"></i>
                            <i class="normal-down iconfont icon-icon_jiantou_xiazhankai"  @click.stop="lowAlarm = parseInt(lowAlarm) - 1"></i>
                        </div>
						<span class="label_number">~正常~</span>
                        <div class="equipment_input_box">
					    	<input type="text" maxlength="3" name="Hialarm" id="Hialarm" v-model="highAlarm"  class="equipment_input w68" />
                            <i class="normal-up iconfont icon-icon_jiantou_shangshouqi"  @click.stop="highAlarm = parseInt(highAlarm) + 1"></i>
                            <i class="normal-down iconfont icon-icon_jiantou_xiazhankai"  @click.stop="highAlarm = parseInt(highAlarm) - 1"></i>
                        </div>
						<span class="label_number">~偏高~</span>
                        <div class="equipment_input_box">
					    	<input type="text" maxlength="3" name="Hihialarm" id="Hihialarm" v-model="highHighAlarm"  class="equipment_input w68" /> 
                            <i class="normal-up iconfont icon-icon_jiantou_shangshouqi"  @click.stop="highHighAlarm = parseInt(highHighAlarm) + 1"></i>
                            <i class="normal-down iconfont icon-icon_jiantou_xiazhankai"  @click.stop="highHighAlarm = parseInt(highHighAlarm) - 1"></i>
                        </div>

						<span class="label_number number-right">过高~</span>
				</div>
				<!-- <span id="assertName_alarm" class="form-group__message" >请输入警告阈值</span> -->
			</div><br/>

            <div class="equipment_list">
				<p class="equipment_title"><span class="label-prefix"></span>告警设置</p>
				<div class="equipment_state">
					<div class="equipment_message float-left" style="float:left;">
                        <div class="message-label">偏低:</div>
				        <div id="input-wrap01" class="input-wrap">
                            <input class="input-box" @click.stop="handelShow(1)" name="Status02" placeholder="选择警告级别" v-model="selectifyVal[1].vals" :style="selectifyVal[1].color" readonly="readonly">
                            <i class="normal iconfont icon-icon_jiantou_xiazhankai"  @click.stop="handelShow(1)"></i>
                            <ul id="drop_down01" class="drop_down" :style="showMe(1)">
                                <li v-for="item, index in device_status" @click.stop="selectclassify(1,item)" :style="item.color">{{item.name}}</li>
                            </ul>
				        </div>
				    </div>
				    <div class="equipment_message float-right" style="float:right;">
                        <div class="message-label">过低:</div>
				        <div id="input-wrap02" class="input-wrap">
                            <input class="input-box" @click.stop="handelShow(3)" name="Status03" placeholder="选择警告级别" v-model="selectifyVal[3].vals" :style="selectifyVal[3].color" readonly="readonly">
                            <i class="normal iconfont icon-icon_jiantou_xiazhankai"  @click.stop="handelShow(3)"></i>
                            <ul id="drop_down02" class="drop_down" :style="showMe(3)">
                                <li v-for="item, index in device_status" @click.stop="selectclassify(3,item)" :style="item.color">{{item.name}}</li>
                            </ul>
				        </div>
				    </div>
				    <div class="equipment_message float-left" style="float:left;">
                        <div class="message-label">偏高:</div>
				        <div id="input-wrap03" class="input-wrap">
                            <input class="input-box" @click.stop="handelShow(2)" name="Status04" placeholder="选择警告级别" v-model="selectifyVal[2].vals" :style="selectifyVal[2].color" readonly="readonly">
                            <i class="normal iconfont icon-icon_jiantou_xiazhankai"  @click.stop="handelShow(2)"></i>
                            <ul id="drop_down03" class="drop_down" :style="showMe(2)">
                                <li v-for="item, index in device_status" @click.stop="selectclassify(2,item)" :style="item.color">{{item.name}}</li>
                            </ul>
				        </div>
				    </div>
				    <div class="equipment_message float-right" style="float:right;">
                        <div class="message-label">过高:</div>
				        <div id="input-wrap04" class="input-wrap">
                            <input class="input-box" @click.stop="handelShow(4)" name="Status05" placeholder="选择警告级别" v-model="selectifyVal[4].vals" :style="selectifyVal[4].color" readonly="readonly">
                            <i class="normal iconfont icon-icon_jiantou_xiazhankai"  @click.stop="handelShow(4)"></i>
                            <ul id="drop_down04" class="drop_down" :style="showMe(4)">
                                <li v-for="item, index in device_status" @click.stop="selectclassify(4,item)" :style="item.color">{{item.name}}</li>
                            </ul>
				        </div>
				    </div>
				    <div class="equipment_message float-left" style="float:left;">
                        <div class="message-label">断开:</div>
				        <div id="input-wrap05" class="input-wrap">
                            <input class="input-box" @click.stop="handelShow(5)" name="Status06" placeholder="选择警告级别" v-model="selectifyVal[5].vals" :style="selectifyVal[5].color" readonly="readonly">
                            <i class="normal iconfont icon-icon_jiantou_xiazhankai"  @click.stop="handelShow(5)"></i>
                            <ul id="drop_down05" class="drop_down" :style="showMe(5)">
                                <li v-for="item, index in device_status" @click.stop="selectclassify(5,item)" :style="item.color">{{item.name}}</li>
                            </ul>
				        </div>
				    </div>
			    </div>
			</div>

            <div class="equipment_list" style="display:none"> <!-- 本次迭代暂不处理 -->
				<p class="equipment_title"><span class="label-prefix"></span> 告警预处理时间 <span class="hint-pretime"
                   @mouseenter="hintShow = true;" @mouseleave="hintShow = false;" @click.stop="hintShow = !hintShow">?<div 
                   class="hint-content" v-show="hintShow" @click.stop="hintShow = false">
                   说明：实时告警处理完后跳转至预处理时间倒计时，倒计时结束时产生新告警则默认为新的实时告警，并在实时告警列表展示。
                   </div></span>
                   </p>
				<input type="text" name="pretime" id="pretime" v-model="pretime" rows="3" class="alarm-pretime" maxlength="300"></textarea>
                
			</div>

            <div class="equipment_list">
				<p class="equipment_title"><span class="label-prefix"></span>处理指南</p>
				<textarea name="DealIntroduct" id="DealIntroduct" v-model="dealIntroduct" rows="3" class="alarm-dealIntroduct" maxlength="300"></textarea>
				<span id="dealIntroduct" class="form-group__message" >请输入处理指南</span>
			</div>
			
    </div>                
</div>                
</template>
<script>
import VMessagebox from '@com/alert/message-box'
import {mapGetters,mapState} from 'vuex';
import { isArray,documentClick } from "@lib/js/mUtils";

export default {
    name: "alarm-setup",
    props: {
    },
    components: {
		VMessagebox
	},
    data: function() {
        return {
            lowLowAlarm:0,
            lowAlarm:0,
            highAlarm:0,
            highHighAlarm:0,
            dealIntroduct:"",//处理指南
            pretime:"",//告警预处理时间
            entityKey:0,
            assertName:"",
            routerParams:{},
            device_status : [
                {name: '一般警告', id: '3', color:{ color:"#39a3f4" } }, 
                {name: '重要警告', id: '2', color:{ color:"#ff921d" } },
                {name: '紧急警告', id: '1', color:{ color:"#ff5560" } }
            ],
            selectifyVal:[
				{keys: -1, vals: ''},//选择监测区域
				{keys: 3, vals: '一般告警'},//偏低1
				{keys: 3, vals: '一般告警'},//偏高2
				{keys: 2, vals: '重要告警'},//过低3
				{keys: 2, vals: '重要告警'},//过高4
				{keys: 2, vals: '重要告警'},//断开5
				{keys: -1, vals: ''},//监测区域
            ],
            // alarmConfig:{
            //     highHighAlarm: {keys: 3, vals: '一般告警'},//过高
            //     highAlarm:     {keys: 3, vals: '一般告警'},//偏高
            //     lowAlarm:      {keys: 3, vals: '一般告警'},//偏低
            //     lowLowAlarm:   {keys: 3, vals: '一般告警'},//过低
            //     offline:       {keys: 3, vals: '一般告警'},//断开
            // },
            showId:0,
            hintShow:false,
			messageText: '修改成功', //弹窗提示文本
            messageTextShow:false,//提示弹窗是否显示
            //"alarmConfig": "{\"highHighAlarm\":\"1\",\"offline\":\"1\",\"lowAlarm\":\"1\",\"lowLowAlarm\":\"1\",\"highAlarm\":\"1\"}",
        };
    },
    created() {},
    mounted() {
        //this.GetEquipmenInfo();
        //getDevicesList()
        this.$store.dispatch("get_equipment_devicesList").then((response) => {
            //console.log(response);
            this.getParams(response);
        }, (error) => {
			console.log('start->error')
		});
        //console.log(this.$route);
        documentClick(() => {
            if (this.showId > 0) {
                let self1drop = document.getElementById("input-wrap01");
                let self2drop = document.getElementById("input-wrap02");
                let self3drop = document.getElementById("input-wrap03");
                let self4drop = document.getElementById("input-wrap04");
                let self5drop = document.getElementById("input-wrap05");
                //let selfdrop = document.getElementByClass("drop_down");
                // console.log("show:" + selfdrop);
                if (self1drop && self2drop && self3drop && self4drop && self5drop) {
                    //console.log(this.regionList);
                    if (!self1drop.contains(event.target) && !self2drop.contains(event.target) && !self3drop.contains(event.target)
                        && !self4drop.contains(event.target) && !self5drop.contains(event.target)) {//判断点击到了id以外的区域
                        this.showId = 0;
                        //console.log("12345");
                    };
                };
            };
        });

    },
    watch: {
       // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      //'$route': 'getParams'
    },
    computed: {
         ...mapGetters({
            //  getDevicesList
         }),
    },
    methods: {
        getElementsByClass(classnames) {
            var classobj = new Array();
            var classint = 0;
            var tags =document.getElementsByTagName("*");
            for(var i in tags){
                if(tags[i].nodeType == 1){
                    if(tags[i].getAttribute("class") == classnames){
                        classobj[classint] = tags[i];
                        classint++;
                    }
                }
            }
            return classobj;
        },
        getNowFormatDate() {
            let date = new Date();
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getNowFormat(fmt,date) { //author: meizz   ("yyyy-mm-dd hh:nn:ss",new Date()
            var o = {   
                "m+" : date.getMonth()+1,                 //月份   
                "d+" : date.getDate(),                    //日   
                "h+" : date.getHours(),                   //小时   
                "n+" : date.getMinutes(),                 //分   
                "s+" : date.getSeconds(),                 //秒   
                "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                "S"  : date.getMilliseconds()             //毫秒   
            };   
            if(/(y+)/.test(fmt)) {  
                fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            };  
            for(var k in o) {
                if (new RegExp("("+ k +")").test(fmt)) {   
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
                };
            };  
            return fmt;   
        } ,
        getNowTime() {
            let now = new Date();
            return now.getTime();
        },
        handelShow(Id) {
            this.showId = (this.showId === Id ? 0:Id);
            // console.log("handelShow");
            // console.log(Id);            
        },
        showMe(Id) {
            let result = {};
            if (this.showId === Id) {
                // console.log("showMe");
                result = { display:"inline-block" } 
            } else {
                result = { display:"none" }                 
            }
            // console.log(result);            
            return result;
        },
        onSelectType:function (type) {
            this.messageTextShow = false;
        },
        selectclassify(Index,item){
            this.showId = 0;
            this.selectifyVal[Index].keys = item.id;
            this.selectifyVal[Index].vals = item.name;
            this.selectifyVal[Index].color = item.color;
            console.log(this.selectifyVal);
        },
        getParams(inParams) {
            console.log(inParams);
            // 取到路由带过来的参数 
            this.routerParams = this.$route.params;
            // console.log("this.$route.params");
            // console.log(this.$route.query);
            this.entityKey = this.$route.query.id;
            // console.log(this.$store.getters.getDevicesList);//
            // let tmpLst = this.$store.getters.getDevicesList;
             console.log(this.entityKey);
            let tmpLst = inParams;
            let iFound = false;
            if (isArray(tmpLst)) {
                for (let i = 0; i < tmpLst.length; i ++) {
                    if (tmpLst[i].id == this.entityKey) {
                        this.routerParams = tmpLst[i];
                        iFound = true;
                        break;
                    };//end if
                };//end for
            };
            if (!iFound) {
                this.routerParams = {
                    "id": 1000405,
                    "gmtCreate": null,
                    "userCreate": null,
                    "userModified": 1,
                    "gmtModified": null,
                    "sysName": null,
                    "assertName": "土壤湿度",
                    "description": null,
                    "parentId": null,
                    "address": null,
                    "areaCode": "10010",
                    "areaName": "演示现场",
                    "agentId": null,
                    "entityType": null,
                    "isDeleted": null,
                    "manufacturer": "0",
                    "category": "传感器",
                    "deviceId": 1000405,
                    "deviceModel": "",
                    "name": "温度传感器",
                    "deviceSource": null,
                    "deviceParam": null,
                    "deviceStatus": 0,
                    "deviceStatusName": "开",
                    "lowAlarm": 7,
                    "lowLowAlarm": 8,
                    "highAlarm": 9,
                    "highHighAlarm": 10,
                    "alarmLevel": 3,
                    "alarmLevelName": "一般告警",
                    "alarmConfig": "{\"highHighAlarm\":\"1\",\"offline\":\"1\",\"lowAlarm\":\"1\",\"lowLowAlarm\":\"1\",\"highAlarm\":\"1\"}", //"1-3,2-1,3-2,4-1,5-3",
                    "field": null,
                    "unit": "°C",
                    "quality": 0,
                    "qualityName": "开",
                    "gmtTime": null,
                    "dealIntroduct": "开起风机",
                    "paramValue": null
                };
            };
            console.log("routerParams:");
            console.log(this.routerParams);
            console.log("GetFromParams");
            this.GetFromParams();
        },
        GetFromParams() {
            let tmpval = [],tmpdict=["选择告警级别","紧急警告" ,"重要警告" ,"一般警告"];

            this.selectifyVal[1].keys = this.routerParams.lowType;//偏低1
            this.selectifyVal[2].keys = this.routerParams.highType;//偏高2
            this.selectifyVal[3].keys = this.routerParams.lowLowType;//过低3
            this.selectifyVal[4].keys = this.routerParams.highHighType;//过高4
            this.selectifyVal[5].keys = this.routerParams.offline;//断开5
            /*
            tmpval = this.routerParams.alarmConfig;
            console.log(tmpval);
            if (tmpval != undefined && tmpval.indexOf("\"") > -1) {
                let jsonval = eval('(' + tmpval + ')');
                console.log(jsonval);
                this.selectifyVal[1].keys = jsonval.lowAlarm;//偏低1
                this.selectifyVal[2].keys = jsonval.highAlarm;//偏高2
                this.selectifyVal[3].keys = jsonval.lowLowAlarm;//过低3
                this.selectifyVal[4].keys = jsonval.highHighAlarm;//过高4
                this.selectifyVal[5].keys = jsonval.offline;//断开5

                console.log(this.selectifyVal);
                
                //this.alarmConfig.highHighAlarm = jsonval.highHighAlarm 
                // {keys: 3, vals: '一般告警'},//偏低1
				// {keys: 3, vals: '一般告警'},//偏高2
				// {keys: 2, vals: '重要告警'},//过低3
				// {keys: 2, vals: '重要告警'},//过高4
				// {keys: 2, vals: '重要告警'},//断开5
               *
                tmpval = tmpval.split(",");//1-1,2-1,3-1,4-1,5-1
                this.selectifyVal[1].keys = tmpval[0].substr(tmpval[0].indexOf("-") + 1);
                this.selectifyVal[2].keys = tmpval[1].substr(tmpval[1].indexOf("-") + 1);
                this.selectifyVal[3].keys = tmpval[2].substr(tmpval[2].indexOf("-") + 1);
                this.selectifyVal[4].keys = tmpval[3].substr(tmpval[3].indexOf("-") + 1);
                this.selectifyVal[5].keys = tmpval[4].substr(tmpval[4].indexOf("-") + 1);
                *
            } else {
                this.selectifyVal[1].keys = 1;
                this.selectifyVal[2].keys = 1;
                this.selectifyVal[3].keys = 1;
                this.selectifyVal[4].keys = 1;
                this.selectifyVal[5].keys = 1;
            };*/
            this.selectifyVal[1].vals = tmpdict[this.selectifyVal[1].keys];
            this.selectifyVal[2].vals = tmpdict[this.selectifyVal[2].keys];
            this.selectifyVal[3].vals = tmpdict[this.selectifyVal[3].keys];
            this.selectifyVal[4].vals = tmpdict[this.selectifyVal[4].keys];
            this.selectifyVal[5].vals = tmpdict[this.selectifyVal[5].keys];

            let tmpColor = [ {},{ color:"#ff5560" },{ color:"#ff921d" },{ color:"#39a3f4" } ];
            this.selectifyVal[1].color = tmpColor[this.selectifyVal[1].keys];
            this.selectifyVal[2].color = tmpColor[this.selectifyVal[2].keys];
            this.selectifyVal[3].color = tmpColor[this.selectifyVal[3].keys];
            this.selectifyVal[4].color = tmpColor[this.selectifyVal[4].keys];
            this.selectifyVal[5].color = tmpColor[this.selectifyVal[5].keys];

            console.log("this.selectifyVal");
            console.log(this.selectifyVal);

            //this.selectifyVal[Index].color = item.color;
            //  {name: '一般警告', id: '3', color:{ color:"#39a3f4" } }, 
            //     {name: '重要警告', id: '2', color:{ color:"#ff5560" } },
            //     {name: '紧急警告', id: '1', color:{ color:"#ff921d" } }

            /*传感器类：2过低、3偏低、4正常、5偏高、6过高、7正常连接、8运行中、9断开
            报警级别：3一般告警；2重要告警；1紧急告警 ； 默认0无告警*/
            this.lowLowAlarm   = parseInt(0 + this.routerParams.lowLowAlarm);
            this.lowAlarm      = parseInt(0 + this.routerParams.lowAlarm);
            this.highAlarm     = parseInt(0 + this.routerParams.highAlarm);
            this.highHighAlarm = parseInt(0 + this.routerParams.highHighAlarm);
            
            this.dealIntroduct = this.routerParams.dealIntroduct;
            this.assertName = this.routerParams.assertName

            console.log(this.selectifyVal);
            
        },
        equipmentReset() {
            this.$router.push({
					path: '/equipment',
					query: {
                        id:   this.entityKey,
                        state:"取消编辑",
					}
				})
        },//取消
        GetEquipmenInfo(e) {
            //this.equipmentGetData.calculatedExpression = "1222324252".split("")
            // let calculatedExpression = "1222324252".split("");
            // console.log(calculatedExpression); 
            ///v2/deviceinfo/list?deviceType=0&pageNo=1&pageSize=10
            this.entityKey = "1001";
			setTimeout(() => {
				this.$store.dispatch('getEquipmenInfo', {
                    id: 1000405,//this.entityKey,
                    //assertName:"土",
                    // areaCode:"",
                     deviceType:0,
                     pageNo:1,
                     pageSize:10
				}).then((data) => {
                    console.log("getEquipmenInfo");
                    console.log(data);

                   if (typeof data != "object"){
                       console.log("返回非法数据！");
                       this.messageText="不允许配置的设备或主机！";
                       this.messageTextShow = true;
                       return;
                   }

					this.setShow = true
					this.equipmentGetData = { ...data};

                    this.equipmentGetData["entityKey"] = data.id;
                    this.equipmentGetData["id"] = data.id;

                    //console.log("this.equipmentGetData");
                    console.log(this.equipmentGetData);
                    this.routerParams = data;
                    this.GetFromParams();

                    this.selectifyVal[6]={keys:this.equipmentGetData.region,vals:this.equipmentGetData.regionName}

                    console.log("equipmentGetData.lowLowAlarm");
                    console.log(this.equipmentGetData);


				}, (error) => {
					console.log('start->error')
				});
			});
        },
        equipmentSubmit(){ //保存数据
            

            // let alarmConfig = "1-" + this.selectifyVal[1].keys + ",2-" + this.selectifyVal[2].keys 
            //     + ",3-" + this.selectifyVal[3].keys + ",4-" + this.selectifyVal[4].keys + ",5-" + this.selectifyVal[5].keys;
            //{\"highHighAlarm\":\"1\",\"offline\":\"1\",\"lowAlarm\":\"1\",\"lowLowAlarm\":\"1\",\"highAlarm\":\"1\"}

            // let alarmConfigObj = {
            //     lowAlarm:      this.selectifyVal[1].keys,
            //     highAlarm:     this.selectifyVal[2].keys,
            //     lowLowAlarm:   this.selectifyVal[3].keys,
            //     highHighAlarm: this.selectifyVal[4].keys,
            //     offline:       this.selectifyVal[5].keys,
            // };
            let id = this.routerParams.id;
            this.routerParams = {};
            //let alarmConfig = JSON.stringify(alarmConfigObj);
            //console.log(alarmConfig);
            this.routerParams.id            = id; 
            //this.routerParams.alarmConfig   = alarmConfig;
            this.routerParams.lowType       = this.selectifyVal[1].keys;
            this.routerParams.highType      = this.selectifyVal[2].keys;
            this.routerParams.lowLowType    = this.selectifyVal[3].keys;
            this.routerParams.highHighType  = this.selectifyVal[4].keys;
            this.routerParams.offline       = this.selectifyVal[5].keys;

            // this.selectifyVal[1].keys = this.routerParams.lowType;//偏低1
            // this.selectifyVal[2].keys = this.routerParams.highType;//偏高2
            // this.selectifyVal[3].keys = this.routerParams.lowLowType;//过低3
            // this.selectifyVal[4].keys = this.routerParams.highHighType;//过高4
            // this.selectifyVal[5].keys = this.routerParams.offline;//断开5

            this.routerParams.highAlarm     = Math.floor(this.highAlarm * 10) / 10;  //高警报值
            this.routerParams.highHighAlarm = Math.floor(this.highHighAlarm * 10) / 10; //很高警报值
            this.routerParams.lowAlarm      = Math.floor(this.lowAlarm * 10) / 10; //低警报值
            this.routerParams.lowLowAlarm   = Math.floor(this.lowLowAlarm * 10) / 10; //很低警报值
            this.routerParams.dealIntroduct = this.dealIntroduct;//用户指南 

            if (this.routerParams.lowLowAlarm < this.routerParams.lowAlarm 
                && this.routerParams.lowAlarm < this.routerParams.highAlarm
                && this.routerParams.highAlarm < this.routerParams.highHighAlarm) {
            } else {
               this.messageText="警告阈值数据有错！请检查..."
               this.messageTextShow = true
               return ;
            }

            /*let date = this.getNowFormat("yyyy-mm-dd hh:nn:ss",new Date());
            this.routerParams.gmtCreate = date;
            this.routerParams.gmtTime = date;
            this.routerParams.gmtModified = date;*/

            console.log("保存数据:");
            console.log(this.routerParams);
			
            this.$store.dispatch('updateEquipment', this.routerParams
            /*{
                assertName: this.assertName,//设备名称(用户看到的)
                dealIntroduct: this.dealIntroduct,//用户指南

                id: this.entityKey, //设备id

                highAlarm:     Math.floor(this.highAlarm * 10) / 10,  //高警报值
                highHighAlarm: Math.floor(this.highHighAlarm * 10) / 10, //很高警报值
                lowAlarm:      Math.floor(this.lowAlarm * 10) / 10, //低警报值
                lowLowAlarm:   Math.floor(this.lowLowAlarm * 10) / 10, //很低警报值
                //calculateExpression: expression, //不同设备状态对应的不同的警报级别
                alarmConfig: alarmConfig,//5个告警参数 
                //time:this.getNowTime()
            }*/).then((data) => {
                console.log("data=",data);
                //console.log(data);
                if (data.indexOf("成功")) {
                    this.messageText="保存成功"
                } else {
                    this.messageText="保存失败"
                }
                this.messageTextShow = true;
                this.$router.push({
					path: '/equipment',
					query: {
                        id:   this.entityKey,
                        state:this.messageText,
					}
				})
            }, (error) => {
                console.log("保存出错");
                this.messageText="保存出错"
                this.messageTextShow = true
            })
		},
        getDataEquipment(val) {
			this.$store.dispatch('fetchEquipmentList', {
				assertName: this.searchval,
				region: this.selectifyVal[0].keys==-1?'':this.selectifyVal[0].keys,
				pageNo: this.pageNo,
				pageSize: this.pageLen
			}).then((data) => {
				if (data=='') {
					this.equipmentDatalist=[];
					this.pageTotal=0;
				}else{
					this.pageTotal = data.pages
					let arrs={name: '', type: '0'}
					for(let i=0;i<data.data.length;i++){
						if(data.data[i].fieldInfo.value == "" || data.data[i].fieldInfo.value == null){
                            data.data[i].field="--"
                        } else {
                            data.data[i].field =  data.data[i].fieldInfo.value.substr(0,data.data[i].fieldInfo.value.indexOf(".") + 3); //parseFloat(data.data[i].fieldInfo.value).toFixed(2);

                            if (data.data[i].fieldInfo.unit != null && data.data[i].fieldInfo.unit != "" && data.data[i].fieldInfo.unit != "0") {
                                data.data[i].field += data.data[i].fieldInfo.unit;
                            }
                        }
                        /*if(data.data[i].field == null){
							data.data[i].field="--"
                        }*/
						if(data.data[i].updateTime == null){
							data.data[i].updateTime="--"
						}else{
							data.data[i].updateTime=data.data[i].updateTime.slice(0,16)
						}

						data.data[i].id=data.data[i].entityKey
						arrs.name=data.data[i].qualityInfo.name
						arrs.type=data.data[i].qualityInfo.status
						if(arrs.type==1){
							arrs.type=0
						}else{
							arrs.type=1
						}
						data.data[i].qualityInfo=arrs
					}

					this.equipmentDatalist = data.data
				}
			}, (error) => {
				//this.messageText="未查询到相关数据"
                //this.messageTextShow = true
			});
		},
	},
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>