<template>
	<section class="page" v-if="show">
		<div class="shade" @click.stop="broke()">
			<div class="bbox" @click.stop="noBroke()">
				<div class="tit"><span>新增监测区域</span> <i class="fr iconfont icon-htmal5icon21" @click.stop='closeHandel()'></i>
				</div>
				<div class="box-data">
					<div class="cen-box " :class="{ 'form-group--error': $v.areaName.$error }">
						<input id="inputPlace" class="cenTitle form__input" type="text" maxlength="20" name="area-name" v-model.trim="areaName" placeholder="新增监测区域名称" @input="$v.areaName.$touch()" />
						<!--onkeyup="this.value=this.value.replace(/\s+/g,'')"-->
					</div>
					<span class="form-group__message" v-if="!$v.areaName.required">请输入监测区域名称</span>
					<div class="select-wrap clearfix">
						<ul>
							<li>
								<div class="titl webfont">序号</div>
								<div class="sel">
									<div class="input-wrap ">
										<input class="input-box form__input" type="number" v-model="inputNum" name="area-inputNum" @input="lengthContrl" >

										<i class="iconfont icon-paixujiantouxia" @click="handelShow_one_top"></i>
										<i class="iconfont icon-paixujiantoushang" @click="handelShow_one_bottom"></i>
									</div>
								</div>
							</li>
							<li>
								<div class="titl webfont">类型</div>
								<div class="sel">
									<div class="input-wrap" @click="handelShow_two">
										<input class="input-box" placeholder="选择类型" name="area-classifyVal" v-model="selectClassifyVal" readonly="readonly">
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
										<input class="input-box" placeholder="正常" name="area-stateVal" v-model="selectStateVal" readonly="readonly">
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
		props: {},
		data() {
			return {
				areaName: '',
				winShow: false,
				inputNum: 1,
				totalData: null, //数据总条数
				selectStateVal: '',
				selectClassifyVal: '',
				regionStatus: 1,
				regionType: null,
				state: [{
					text: '正常',
					value: '1'
				}, {
					text: '维修',
					value: '2'
				}],
				classify: [],
				//      {text: '水产', value: '1'}, {text: '农场', value: '2'}, {text: '牧场', value: '3'}, {text: '其他', value: '4'}
				olShow_two: false,
				olShow_three: false,
				show: true,
			}
		},
		validations: { //校验的
			areaName: {
				// myCustomValidator, // 校验手机号码
				required
			},
			inputNum: {
				required,
				minLength: minLength(2)
			},
		},
		components: {},
		methods: {
			lengthContrl() {
				console.log(this.inputNum);
				if(this.inputNum.length > 3) {
					this.inputNum = this.inputNum.slice(0, 3)
				}
			},
			broke: function(e) {
				this.show = false;
				this.$emit('statusOne', this.show);
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
				this.olShow_three = !this.olShow_three;
				this.regionStatus = this.state[index].value;

			},
			selectclassifyHandel: function(index) {
				this.selectClassifyVal = this.classify[index].text;
				this.olShow_two = !this.olShow_two;
				this.regionType = this.classify[index].value;
			},
			closeHandel: function() {
				this.show = false;
				this.$emit('statusOne', this.show);
			},
			sub: function() {
				if(this.areaName === '') {
					this.$v.areaName.$touch();
				} else if(this.areaName != '' && this.regionType == null) {
					alert('请填写类型');
				} else {
					this.$store.dispatch('addArea', { //不存在相同区域名字，能添加
						sjc: new Date(),
						displayOrder: this.inputNum,
						name: this.areaName,
						regionStatus: this.regionStatus,
						regionType: this.regionType
					}).then((data) => {
						//																					      	console.log(data);
						alert('新增区域成功');
						this.areaName = '';
						this.$emit('addarea', 'true');
					}, (error) => {
						alert('区域名字已存在，请勿重复')
					})
				}
			}
		},
		mounted() {
			this.$store.dispatch('getAreaType', {
				pageNo: 1,
        rowNum: 1000,
				name: 'dvm_region_type',
				t: new Date().getTime() //时间戳，ie兼容
			}).then((data) => {
				 		   console.log(data);
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
		},
		watch: {
			areaName: function(val, oldval) {
				// console.log(val)
			}
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
		border-radius: 5px;
		width: 500px;
		height: 350px;
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

	.cen-box {
		position: relative;
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
    /*color: red;*/
		font-weight: 800;
	}
  -ms-input-placeholder{
    font-size: 16px;
    color: #b0b1b4;
    /*color: red;*/
    font-weight: 800;
  }
  .input-box:-ms-input-placeholder{
    font-size: 16px;
    color: #b0b1b4;
    /*color: red;*/
    font-weight: 800;
  }
  /*ie浏览器写placeholder样式*/
  .cenTitle:-ms-input-placeholder{
    font-size: 16px;
    color: #b0b1b4;
    /*color: red;*/
    font-weight: 800;
  }

</style>
