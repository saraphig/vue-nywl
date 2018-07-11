<template>
	<section class="page" v-if="show">
		<div class="shade" @click.stop="broke()">
			<div class="bbox" @click.stop="noBroke()">
				<div class="tit"><span>编辑监测区域</span> <i class="fr iconfont icon-htmal5icon21" @click.stop='closeHandel()'></i>
				</div>
				<div class="box-data">
					<div class="cen-box" :class="{ 'form-group--error': $v.areaName.$error }">
						<input class="cenTitle" type="text" v-model.trim="areaName" name="area-oname" placeholder="编辑监测区域名称" @input="$v.areaName.$touch()" maxlength="20" />
						<!--onkeyup="this.value=this.value.replace(/\s+/g,'')"-->
					</div>
					<span class="form-group__message" v-if="!$v.areaName.required">请输入监测区域名称</span>
					<div class="select-wrap clearfix">
						<ul>
							<li>
								<div class="titl webfont">序号</div>
								<div class="sel">
									<div class="input-wrap">
										<input class="input-box" type="number" v-model="inputNum" name="area-oinputnum" @input="lengthContrl" >
										<i class="iconfont icon-paixujiantouxia" @click="handelShow_one_top"></i>
										<i class="iconfont icon-paixujiantoushang" @click="handelShow_one_bottom"></i>
									</div>
								</div>
							</li>
							<li>
								<div class="titl webfont">类型</div>
								<div class="sel">
									<div class="input-wrap" @click="handelShow_two">
										<input class="input-box" placeholder="请选择类型" name="area-oClassifyVal" v-model="selectClassifyVal" readonly="readonly">
										<i class="normal iconfont icon-paixujiantouxia"></i>
									</div>
									<ol v-show="olShow_two">
										<li v-for="item, index in classify" @click="selectclassifyHandel(index)">{{item.text}}</li>
									</ol>
								</div>
							</li>
							<li>
								<div class="titl webfont">维修状态</div>
								<div class="sel">
									<div class="input-wrap" @click="handelShow_three">
										<input class="input-box" placeholder="正常" name="area-oStateVal" v-model="selectStateVal" readonly="readonly">
										<i class="normal iconfont icon-paixujiantouxia"></i>
									</div>
									<ol v-show="olShow_three">
										<li v-for="item, index in state" @click="selectstateHandel(index)">{{item.text}}</li>
									</ol>
								</div>
							</li>
						</ul>
					</div>
					<div class="operation">
						<input class="sure but" type="button" value="确定" @click="sub()" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import VTable from '@com/table';
	import Vue from 'vue';
	import Vuelidate from 'vuelidate';
	import { required, minLength } from 'vuelidate/lib/validators';
	Vue.use(Vuelidate);
	export default {
		name: 'VmaskLayer',
		props: {
			areaInfo: {
				type: null,
				default: {},
			},
			maskShowEdit: {
				type: Boolean
			}
		},
		data() {
			return {
				areaName: this.areaInfo.name,
				winShow: false,
				selectClassifyNum: this.areaInfo.regionType, //类别
				selectStateyNum: this.areaInfo.regionStatus, //状态
				inputNum: this.areaInfo.displayOrder,
				selectStateVal: this.areaInfo.regionStatusName,
				selectClassifyVal: this.areaInfo.regionTypeName,
				state: [{
					text: '正常',
					value: '1'
				}, {
					text: '维修',
					value: '2'
				}],
				classify: [],
				//      {text: '水产', value: '1'}, {text: '农场', value: '2'}, {text: '牧场', value: '3'}, { text: '其他',value: '4' }
				olShow_two: false,
				olShow_three: false,
				show: true,
			}
		},
		validations: { //校验的
			areaName: {
				required
			},
			inputNum: {
				required,
				minLength: minLength(2)
			},
		},
		components: {},
		created: function() {},
		methods: {
			lengthContrl() {
				console.log(this.inputNum);
				if(this.inputNum.length > 3) {
					this.inputNum = this.inputNum.slice(0, 3)
				}
			},
			broke: function(e) {
				this.show = false;
				this.$emit('statusEdit', this.show);
			},
			noBroke: function(e) {
				this.show = true;
			},
			handelShow_one_top: function() {
				if(this.inputNum > 1) this.inputNum--
			},
			handelShow_one_bottom: function() {
				if(this.inputNum < 1000) {
					this.inputNum++
				}
			},
			handelShow_two: function() {
				this.olShow_two = !this.olShow_two
			},
			handelShow_three: function() {
				this.olShow_three = !this.olShow_three
			},
			selectstateHandel: function(index) {
				this.selectStateVal = this.state[index].text;
				this.selectStateyNum = this.state[index].value;
				this.olShow_three = !this.olShow_three;
			},
			selectclassifyHandel: function(index) {
				this.selectClassifyVal = this.classify[index].text;
				this.olShow_two = !this.olShow_two;
				this.selectClassifyNum = this.classify[index].value;
			},
			closeHandel: function() {
				this.show = false;
				this.$emit('statusEdit', this.show);
			},
			sub() {
				if(this.areaName === '') {
					this.$v.areaName.$touch();
				} else {
					this.$store.dispatch('updateArea', {
						id: this.areaInfo.id,
						displayOrder: parseInt(this.inputNum),
						name: this.areaName,
						regionStatus: this.selectStateyNum, //状态
						regionType: parseInt(this.selectClassifyNum) //类型
					}).then((data) => {
						alert('编辑成功')
						this.$emit('editarea', 'true');
					}, (error) => {
						alert("区域名字已存在，请勿重复")
					})
				}

			},
		},
		mounted() {
			this.$store.dispatch('getAreaType', {
				pageNo: 1,
        rowNum: 1000,
				name: 'dvm_region_type',
				t: new Date().getTime() //时间戳，ie兼容
			}).then((data) => {
				var areaType = [];
				for(let i = 0; i < data.data.length; i++) {
					var obj = {};
					obj.text = data.data[i].dict_name;
					obj.value = data.data[i].dict_code;
					areaType.push(obj);
				}
				console.log(areaType);
				this.classify = areaType;
			}, (error) => {

			})
		}
	}
</script>

<style scoped>
	.fr.icon-htmal5icon21 {
		cursor: pointer;
		font-size: 20px;
	}

	.select-wrap {
		margin-top: 16px;
	}

	.box-data ul>li ol {
		position: absolute;
		width: 140px;
		top: 72px;
		left: 4px;
		color: #313131;
		font-size: 16px;
		line-height: 30px;
		border: 2px solid #b1b4b6;
		background: #fff;
		box-sizing: border-box;
		text-indent: 4px;
	}

	.box-data ul>li:nth-child(2) ol {
		height: 118px;
		overflow-x: hidden;
	}

	.box-data ul>li ol li:hover {
		background: #eee;
		cursor: pointer;
	}

	.box-data ul>li ol li {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.input-wrap {
		position: relative;
		width: 140px;
		height: 50px;
		margin: auto;
	}

	ul,
	ol,
	li {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.box-data {
		padding: 0 28px 24px 28px;
	}

	.box-data ul>li {
		position: relative;
		width: 33%;
		float: left;
	}

	.box-data ul>li .titl {
		margin-bottom: 8px;
		font-size: 14px;
		color: #313131;
		padding-left: 14px;
	}

	.box-data ul>li .input-box {
		width: 100%;
		height: 100%;
		text-indent: 20px;
		line-height: 40px;
		font-size: 16px;
		border: 2px solid #b1b4b6;
		border-radius: 4px;
		cursor: pointer;
		box-sizing: border-box;
		font-weight: bold;
		color: #313131;
	}

	.box-data ul>li .iconfont {
		position: absolute;
		right: 8px;
	}

	.box-data ul>li .iconfont.icon-paixujiantouxia {
		top: 21px;
	}

	.box-data ul>li .iconfont.icon-paixujiantoushang {
		top: 11px;
	}

	.box-data ul>li .iconfont.icon-paixujiantouxia.normal {
		top: 12px;
	}

	.cenTitle {
		width: 100%;
		background: none;
		border: 0;
		font-size: 18px;
		color: #313131;
		height: 45px;
		font-weight: 700;
		line-height: 45px;
		text-align: center;
		margin: 20px 0 23px;
		border-bottom: 2px solid #f0f0f0;
	}

	.shade {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.bbox .tit {
		width: 100%;
		height: 50px;
		background: #f5faff;
		line-height: 50px;
		padding: 0 20px 0 24px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		font-weight: bold;
		font-size: 18px;
		position: relative;
	}

	.layer {
		width: 60px;
		position: absolute;
		height: 100%;
		right: 0;
		top: 0;
	}

	.fr {
		float: right;
	}

	.areacont .bbox {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		min-height: auto;
		width: 500px;
		height: 350px;
		border-radius: 5px;
		background: white;
		margin: auto;
		color: black;
		z-index: 3;
		box-sizing: border-box;
	}

	.operation .but {
		width: 150px;
		height: 50px;
		border: none;
	}

	.operation .sure {
		margin-top: 45px;
		background: #0293ff;
		width: 445px;
		height: 50px;
		line-height: 50px;
		color: #fff;
		border-radius: 4px;
		cursor: pointer;
	}

	.form-group__message {
		display: none;
		color: #f00;
		font-size: 12px;
		width: 450px;
		text-align: center;
		margin: 0;
		margin-top: -20px;
	}

	.form-group--error+.form-group__message {
		display: block;
		color: #f00;
		font-size: 12px;
		text-align: left;
		margin: 0;
		margin-top: -20px;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	 ::-webkit-input-placeholder {
		font-size: 16px;
		font-weight: bold;
	}

	.input-box::-webkit-input-placeholder {
		font-size: 16px;
		color: #b0b1b4;
		font-weight: 500;
	}
</style>
