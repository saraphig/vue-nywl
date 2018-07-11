<template>
  <section class="equipment">
  	<v-messagebox v-show="messageTextShow"  @select-type="onSelectType" :content="messageText"></v-messagebox>
  	<v-alert :boxtitle="'设备配置'" :boxwidth="600" v-if="setShow" @callback="callback">
			<template slot="alertFunctionBox" slot-scope="props">
				<div class="equipment_list">
					<p class="equipment_list1">设备ID</p>
					<input type="text" name="equipmentEntityKey" id="equipmentEntityKey" v-model="equipmentGetData.entityKey" disabled="disabled"  value="" class="equipment_input1" />
				</div>
				<div class="equipment_list">
					<p class="equipment_list1">设备名称</p>
					<input type="text" name="equipmentAssertName" maxlength="20" id="equipmentAssertName" v-model="equipmentGetData.assertName" value="" class="equipment_input1" />
					<span id="assertName_message" class="form-group__message" >请输入设备名称</span>
				</div>
				<div class="equipment_list w100">
					<p class="equipment_list1">警告阈值（XX单位）</p>
					<div class="ml5">
						~ <input type="number" maxlength="3" name="equipmentLoLoalarm" id="equipmentLoLoalarm" v-model="equipmentGetData.lowLowAlarm" class="equipment_input1 w68" />
						~ <input type="number" maxlength="3" name="equipmentLoalarm" id="equipmentLoalarm" v-model="equipmentGetData.lowAlarm" class="equipment_input1 w68" />
						~ <input type="number" maxlength="3" name="equipmentHialarm" id="equipmentHialarm" v-model="equipmentGetData.highAlarm"  class="equipment_input1 w68" />
						~ <input type="number" maxlength="3" name="equipmentHihialarm" id="equipmentHihialarm" v-model="equipmentGetData.highHighAlarm"  class="equipment_input1 w68" /> ~
					</div>
					<p class="equipment_list2">
						<span>过低</span>
						<span>偏低</span>
						<span>正常</span>
						<span>偏高</span>
						<span>过高</span>
					</p>
					<span id="assertName_alarm" class="form-group__message" >请输入警告阈值</span>
				</div>
				<div class="equipment_list w100">
					<p class="equipment_list1">警告设置</p>
					<div class="equipment_lists">

						<div class="sel">
				      <div class="input-wrap" @click="handelShow('equipment_drop_down02')">
				        <input class="input-box" name="equipmentDeviceStatus02" placeholder="" v-model="selectifyVal[1].vals" readonly="readonly">
				        <i class="normal iconfont icon-paixujiantouxia" ></i>
				      </div>
				      <ol id="equipment_drop_down02" style="display: none;">
				        <li v-for="item, index in device_status" @click="selectclassify('02',item.name,item.id)">{{item.name}}</li>
				      </ol>
				    </div>
				    <div class="sel">
				      <div class="input-wrap" @click="handelShow('equipment_drop_down03')">
				        <input class="input-box" name="equipmentDeviceStatus03" placeholder="" v-model="selectifyVal[2].vals" readonly="readonly">
				        <i class="normal iconfont icon-paixujiantouxia" ></i>
				      </div>
				      <ol id="equipment_drop_down03" style="display: none;">
				        <li v-for="item, index in device_status" @click="selectclassify('03',item.name,item.id)">{{item.name}}</li>
				      </ol>
				    </div>
				    <div class="sel">
				      <div class="input-wrap" @click="handelShow('equipment_drop_down04')">
				        <input class="input-box" name="equipmentDeviceStatus04" placeholder="" v-model="selectifyVal[3].vals" readonly="readonly">
				        <i class="normal iconfont icon-paixujiantouxia" ></i>
				      </div>
				      <ol id="equipment_drop_down04" style="display: none;">
				        <li v-for="item, index in device_status" @click="selectclassify('04',item.name,item.id)">{{item.name}}</li>
				      </ol>
				    </div>
				    <div class="sel">
				      <div class="input-wrap" @click="handelShow('equipment_drop_down05')">
				        <input class="input-box" name="equipmentDeviceStatus05" placeholder="" v-model="selectifyVal[4].vals" readonly="readonly">
				        <i class="normal iconfont icon-paixujiantouxia" ></i>
				      </div>
				      <ol id="equipment_drop_down05" style="display: none;">
				        <li v-for="item, index in device_status" @click="selectclassify('05',item.name,item.id)">{{item.name}}</li>
				      </ol>
				    </div>
				    <div class="sel">
				      <div class="input-wrap" @click="handelShow('equipment_drop_down06')">
				        <input class="input-box" name="equipmentDeviceStatus06" placeholder="" v-model="selectifyVal[5].vals" readonly="readonly">
				        <i class="normal iconfont icon-paixujiantouxia" ></i>
				      </div>
				      <ol id="equipment_drop_down06" style="display: none;">
				        <li v-for="item, index in device_status" @click="selectclassify('06',item.name,item.id)">{{item.name}}</li>
				      </ol>
				    </div>
			    </div>
				</div>
				<div class="equipment_list equipment_list3 w100">
					<p class="equipment_list1">监测区域</p>
					<div class="sel w100">
			      <div class="input-wrap" @click="handelShow('equipment_drop_down07')">
			        <input class="input-box" name="equipmentDeviceStatus07" placeholder="选择监测区域" v-model="selectifyVal[6].vals" readonly="readonly">
			        <i class="normal iconfont icon-paixujiantouxia" ></i>
			      </div>
			      <ol id="equipment_drop_down07" style="height: 180px;overflow: auto;display: none;">
			        <li v-for="item, index in areaDatalist" @click="selectclassify('07',item.name,item.id)">{{item.name}}</li>
			      </ol>
			    </div>
				</div>
				<div class="equipment_list w100">
					<p class="equipment_list1">处理指南</p>
					<textarea name="equipmentDealIntroduct" id="equipmentDealIntroduct" v-model="equipmentGetData.dealIntroduct" rows="3" class="equipment_textarea" maxlength="300"></textarea>
					<span id="assertName_dealIntroduct" class="form-group__message" >请输入处理指南</span>
				</div>
				<div class="equipment_button">
					<input type="reset"  name="equipmentReset" @click="equipmentReset()" value="取 消" />
					<input type="submit"  name="equipmentSubmit" @click="equipmentSubmit()" value="确 定"/>
				</div>

			</template>
		</v-alert>
    <div class="equipmentHead">
    	<p class="title webfont">设备列表</p>
	    <div class="sel fr">
	      <div class="input-wrap input-wrap-head" @click.stop="handelShow('equipment_drop_down01')">
	        <input class="input-box" placeholder="选择监测区域" v-model="selectifyVal[0].vals" readonly="readonly">
	        <i class="normal iconfont icon-paixujiantouxia" style="top: 13px; right: 10px;" ></i>
	      </div>
	      <ol id="equipment_drop_down01" style="display: none; overflow: auto; max-height: 300px;top: 50px;">
			    <li v-for="item, index in areaDatalist" @click.stop="selectclassify('01',item.name,item.id)">{{item.name}}</li>
	      </ol>
	    </div>
	    <div class="searchBox">
				<input type="text" class="seach_input" name="equipmentSearthKey" v-model="searchval" placeholder="输入监测设备名称"/>
				<i class="seach_bott iconfont icon-sousuo" @click="search()"></i>
			</div>
    </div>
    <v-table :tableSorting="true" :datalist="equipmentDatalist" :tabTitle="tabTitle" :pageTotal="pageTotal" :operate="true" :pageNos="pageNo" @pageNo="pageNos" :param="param" :tabwidth="tabwidth" :checkStatus="'radio'"  @checkboxlist="boxlist">
			<template slot="tableSlot" slot-scope="props">
				<span class="color0b82fd" @click="editInfo(props.arr)">配置</span>
			</template>
		</v-table>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Vuelidate from 'vuelidate';
import Vue from 'vue';
import {required, minLength} from 'vuelidate/lib/validators';
import VTable from '@com/table';
import VAlert from '@com/alert/index';
import VMessagebox from '@com/alert/message-box'
Vue.use(Vuelidate);
export default {
	data() {
		return {
			pageLen: 10, //一页展示的条数
			subpageLen:5,//设备页一页展示条数
			pageTotal: 1, //总页数
			pageNo: 1, //当前页
			messageText: '修改成功', //弹窗提示文本
			messageTextShow:false,//提示弹窗是否显示
			equipmentDatalist: [], //设备数据列表
			areaDatalist: [], //区域数据列表
			equipmentGetData: {
				assertName: ''
			}, //返回设备修改的数据
			equipmentGetmap: {}, //返回设备修改的警告设置
			searchval: '', //搜索内容
			checkboxlists: [], // 返回复选框选中的值
			param: {}, // 向服务器传递参数
			device_status : [{name: '一般警告', id: '3'}, {name: '重要警告', id: '2'},{name: '紧急警告', id: '1'}],
			setShow:false,// 弹窗显示状态
			selectifyVal:[
				{keys: -1, vals: ''},//选择监测区域
				{keys: 3, vals: '一般告警'},//偏低
				{keys: 3, vals: '一般告警'},//偏高
				{keys: 2, vals: '重要告警'},//过低
				{keys: 2, vals: '重要告警'},//过高
				{keys: 2, vals: '重要告警'},//断开
				{keys: -1, vals: ''},//监测区域
			],
			tabTitle: {
				entityKey: '设备ID',
				assertName: '设备名称',
				regionName: '监测区域',
				field: '当前值',
				qualityInfo: '连接状态',
				alarmInfo: '警告级别',
				updateTime: '配置时间',
			}, //表头
			tabwidth: {
				entityKey: "",
				assertName: "",
				regionName: "",
				field: "",
				qualityInfo: "",
				alarmInfo: "",
				updateTime: "",
			}, //每列的宽度
		}
	},
	components: {
		VTable,
		VAlert,
		VMessagebox
	},
	created(){
			this.closeSelect();
	},
	methods: {
        getNowTime() {
            let now = new Date();
            return now.getTime();
        },
		closeSelect() {//点击空白处关闭下拉列表
       			 document.addEventListener('click', (e) => {
							document.getElementById("equipment_drop_down01").style.display="none"
              //  this.olShow_two = false;
				})
			},
		search() {
			this.pageNo=1;
			this.getDataEquipment()
		},
		handelShow(t) {
			let h = document.getElementById(t).style.display
			if(h=="none"){
				document.getElementById(t).style.display="block"
			}else{
				document.getElementById(t).style.display="none"
			}
		},
		selectclassify: function (t,i,s) {
			document.getElementById("equipment_drop_down"+t).style.display="none"
			let h=parseInt(t)
			let selectArr={keys:s,vals:i}
			Vue.set(this.selectifyVal,[h-1],selectArr)

			if(t==7){
				this.equipmentGetData.region=this.selectifyVal[6].keys;
			}
			if(t==1){
        this.pageNo=1;
				this.getDataEquipment()
			}
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
				this.messageText="未查询到相关数据"
        this.messageTextShow = true
			});
		},
		getDataArea() {
			this.$store.dispatch('fetchMonitorAreaGet', {
				name: "",
				pageNo: 1,
				rowNum: 100
			}).then((data) => {
				if (data=='未查询到相关数据') {
					this.messageText="未查询到相关数据"
          this.messageTextShow = true
					this.areaDatalist=[];
					this.pageTotal=0;
				}else{
					this.areaDatalist = data.data
					this.areaDatalist.unshift({name:'所有监测区域',id:''});  //手动加所有监测区域
				}
			}, (error) => {
				this.messageText="未查询到相关数据"
        this.messageTextShow = true
			});
		},
		//点击编辑区域触发
    editInfo(e) {
    	this.equipmentGetData.calculatedExpression="1222324252".split("")
			setTimeout(() => {
				this.$store.dispatch('getEquipmenInfo', {
					id: e.id,
				}).then((data) => {
                   if (typeof data != "object"){
                       console.log("返回非法数据！");
                       this.messageText="不允许配置的设备或主机！"
                       this.messageTextShow = true
                       return;
                   }

					this.setShow=true
					this.equipmentGetData = { ...data};

                    this.equipmentGetData["entityKey"] = data.id;
                    this.equipmentGetData["id"] = data.id;

                    //console.log("this.equipmentGetData");
                    console.log(this.equipmentGetData);

					let arr={}
					let v=''

					if(this.equipmentGetData.calculatedExpression != null && this.equipmentGetData.calculatedExpression !=""){
						arr=this.equipmentGetData.calculatedExpression.split(",")
					}

					/*传感器类：2过低、3偏低、4正常、5偏高、6过高、7正常连接、8运行中、9断开
					报警级别：3一般告警；2重要告警；1紧急告警 ； 默认0无告警*/

					for(let i=0;i<arr.length;i++){

						if(arr[i].slice(1,2)=="1"){
							v="紧急告警"
						}else if(arr[i].slice(1,2)=="2"){
							v="重要告警"
						}else if(arr[i].slice(1,2)=="3"){
							v="一般告警"
						}

						if(arr[i].slice(0,1)==2){//2过低
							this.selectifyVal[3]={keys:arr[i].slice(1,2),vals:v}
						}
						if(arr[i].slice(0,1)==3){//3偏低
							this.selectifyVal[1]={keys:arr[i].slice(1,2),vals:v}
						}
						if(arr[i].slice(0,1)==5){//5偏高
							this.selectifyVal[2]={keys:arr[i].slice(1,2),vals:v}
						}
						if(arr[i].slice(0,1)==6){//6过高
							this.selectifyVal[4]={keys:arr[i].slice(1,2),vals:v}
						}
						if(arr[i].slice(0,1)==9){//9断开
							this.selectifyVal[5]={keys:arr[i].slice(1,2),vals:v}
						}
					}

                    this.selectifyVal[6]={keys:this.equipmentGetData.region,vals:this.equipmentGetData.regionName}

                    console.log("equipmentGetData.lowLowAlarm");
                    console.log(this.equipmentGetData);


				}, (error) => {
					console.log('start->error')
				});
			});
		},
		//当分页发生改变时出行请求数据
		pageNos(d) {
			this.pageNo = d; //第几页
			this.getDataEquipment()
		},
		//获取复选框的数据
		boxlist(d) {
			this.checkboxlists = d;

		},
		callback(show){
			this.setShow = show
		},
		equipmentReset(){
			this.setShow = false
		},
		onSelectType:function (type) {
      this.messageTextShow = false;
    },
		equipmentSubmit(){
			let sta=true
			/*if(document.getElementById("equipmentAssertName").value==""){
				document.getElementById("assertName_message").style.display="block"
				sta = false
			}else{
				document.getElementById("assertName_message").style.display="none"
				sta=true
			}*/
			if(document.getElementById("equipmentLoLoalarm").value=="" || document.getElementById("equipmentLoalarm").value=="" || document.getElementById("equipmentHialarm").value=="" || document.getElementById("equipmentHihialarm").value=="" ){
				document.getElementById("assertName_alarm").style.display="block"
				document.getElementById("assertName_alarm").innerHTML="警告阈值不能为空"
				sta = false
			}else{
      	if(document.getElementById("equipmentLoLoalarm").value>=10000 || document.getElementById("equipmentLoalarm").value>=10000 || document.getElementById("equipmentHialarm").value>=10000 || document.getElementById("equipmentHihialarm").value>=10000 ){
      		document.getElementById("assertName_alarm").style.display="block"
          document.getElementById("assertName_alarm").innerHTML="警告阈值整数不能超过4位数"
					sta = false
      	}else{
        	document.getElementById("assertName_alarm").style.display="none"
        	sta=true
      	}
			}

/*			if(document.getElementById("equipmentDealIntroduct").value=="" ){
				document.getElementById("assertName_dealIntroduct").style.display="block"
				sta = false
			}else{
				document.getElementById("assertName_dealIntroduct").style.display="none"
				sta=true
			}*/

			if(sta==false){
				return false
			}

			let expression=''
			let k
			for(let p=0;p<this.selectifyVal.length;p++){
				if(p>0 && p<6){
					if(p==1){
						expression+=3+this.selectifyVal[p].keys
					}else if(p==2){
						expression+=5+this.selectifyVal[p].keys
					}else if(p==3){
						expression+=2+this.selectifyVal[p].keys
					}else if(p==4){
						expression+=6+this.selectifyVal[p].keys
					}else if(p==5){
						expression+=9+this.selectifyVal[p].keys
					}
				}
			}
    	this.$store.dispatch('updateEquipment', {
        assertName: this.equipmentGetData.assertName,//设备名称(用户看到的)
        dealIntroduct: this.equipmentGetData.dealIntroduct,//用户指南
        id: this.equipmentGetData.entityKey, //设备id
        highAlarm: Math.floor(this.equipmentGetData.highAlarm*10)/10,  //高警报值
        highHighAlarm: Math.floor(this.equipmentGetData.highHighAlarm*10)/10, //很高警报值
        lowAlarm: Math.floor(this.equipmentGetData.lowAlarm*10)/10, //低警报值
        lowLowAlarm: Math.floor(this.equipmentGetData.lowLowAlarm*10)/10, //很低警报值
        calculateExpression: expression, //不同设备状态对应的不同的警报级别
        regionId: this.equipmentGetData.regionId, //监测区域id
        time:this.getNowTime()
      }).then((data) => {
          if (data == 1) {
              this.messageText="编辑成功"
          } else {
              this.messageText="编辑失败"
          }
      	this.setShow = false
      	this.messageTextShow = true
      	this.getDataEquipment()
      }, (error) => {
        this.messageText="编辑出错"
        this.messageTextShow = true
      })
		},
	},
	mounted() {
		this.getDataEquipment()
		this.getDataArea()

	},
	watch: {

	},
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
</style>
