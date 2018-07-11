<!--
	组件名称：可输入搜索条件的下拉列组件
	作者：hzp
	
	参数格式：
	@props
		(Array) opts 下拉列数据对象数组，如[{id:"",value:""}]
		(String) placeholderStr 提示语
		(String) defaultSelect 默认选择项，仅opts写死时有效。若需动态改变可使用ref中的方法。
		
	@events
		disp-selectCallBack(id) 切换下拉列选项时的回调方法。
			(String) id:选中项的id值
			
	@ref
		$ref.*.setDefaultSelect(id,value) 动态设置该组件到某个选择项
			(String) id:选择项的id值
			(String) value:选择项的名称
-->
<template>
	<div class="base-select">
		<div :class="{selectBox:true,selectFocus:inFocus}">
			<div class="selectInput" @click.capture="selectClickHandle($event);">
				<input v-model="inputModel" v-focus="contentVisible" type="text" @blur="selectBlurHandle" :placeholder="placeholderStr" value="" />
				<span class="selectIcon">
					<i><img src="../assets/img/base-select.png" /></i>
				</span>
			</div>
		</div>
		<div v-if="contentDisplay" :class="[{selectContent:true} , contentVisible ? {opacity1:true} : {opacity0:true}]">
			<ul>
				<li :class="{itemSelected : itemSelectedClass(item.id)}" v-for="item in originalOpts" :id="item.id" @click="itemSelectedHandle">{{item.value}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BaseSelect",
		data() {
			return {
				id: "",
				inputModel: "",
				contentVisible: false,
				inFocus: false,
				contentDisplay: false,
				originalOpts: []
			}
		},
		props: {
			defaultSelect: {
				type: String,
				default: ""
			},
			opts: {
				type: Array,
				default: []
			},
			placeholderStr: {
				type: String,
				default: "请选择"
			}
		},
		directives: {
			focus: {
				update: function(el, {
					value
				}) {
					if(value) {
						el.focus();
					}
				}
			}
		},
		methods: {
			selectClickHandle(event) {
				event.preventDefault();
				if(this.contentVisible) {
					this.contentVisible = false;
				} else {
					this.contentVisible = true;
				}
			},
			selectBlurHandle() {
				if(this.contentVisible) {
					let _this = this;
					_this.contentVisible = false;
				}
			},
			itemSelectedHandle(el) {
				this.contentVisible = false;
				this.inputModel = el.target.innerText;
				this.id = el.target.id;
				this.$emit('disp-selectCallBack', this.id);
			},
			itemSelectedClass(itemID) {
				let selected = false;
				if(itemID == this.id) {
					selected = true;
				}
				return selected;
			},
			setDefaultSelect(selectItemID, selectItemValue) {
				let _this = this;
				_this.inputModel = selectItemValue;
				_this.id = selectItemID;
				this.$emit('disp-selectCallBack', _this.id);
			}
		},
		watch: {
			inputModel(val) {
				let _this = this;
				val = val.replace(/\s/g, ""); //去空格
				if(val == "") {
					_this.originalOpts = _this.opts;
				} else {
					let serachList = [];
					for(let i = 0; i < _this.opts.length; i++) {
						if(_this.opts[i].value.indexOf(val) != -1) {
							serachList.push(_this.opts[i]);
						}
					}
					_this.originalOpts = serachList;
				}
			},
			contentVisible(val) {
				let _this = this;
				if(val) {
					this.inFocus = true;
					_this.contentDisplay = true;
				} else {
					this.inFocus = false;
					setTimeout(function() {
						_this.contentDisplay = false;
					}, 300)
				}
			}
		},
		mounted() {
			let _this = this;
			_this.originalOpts = _this.opts;
			if(_this.defaultSelect) {
				let index = _this.defaultSelect - 1;
				if(_this.opts.length > 0 && index >= 0) {
					_this.inputModel = _this.opts[index].value;
					_this.id = _this.opts[index].id;
					this.$emit('disp-selectCallBack', _this.id);
				}
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.base-select {
		position: relative;
	}
	
	.selectBox {
		width: 100%;
		height: 40px;
		border: solid 1px #DCDFE6;
		border-radius: 5px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		.selectInput {
			display: block;
			position: relative;
			width: 100%;
			font-size: 14px;
			cursor: pointer;
			input {
				position: relative;
				height: 34px;
				border: none;
				outline: none;
				font-size: 16px;
				margin-top: 2px;
				cursor: pointer;
				overflow: hidden;
				border-radius: 5px;
				text-indent: 10px;
				width: 98%;
			}
			input:focus {
				border: none;
				outline: none;
			}
			.selectIcon {
				border-radius: 5px;
				position: absolute;
				top: 0px;
				right: 0px;
				pointer-events: none;
				background-color: #fff;
				width: 20px;
				height: 40px;
				padding-left: 10px;
				i {
					margin-left: -5px;
					display: block;
					margin-top: 10px;
				}
			}
		}
	}
	
	.selectFocus {
		border-color: #409EFF;
	}
	
	.selectContent {
		z-index: 10000;
		position: absolute;
		background-color: white;
		margin-top: 2px;
		width: 100%;
		max-height: 300px;
		border: solid 1px #DCDFE6;
		border-radius: 5px;
		box-shadow: 0px 0px 2px gray;
		overflow-y: auto;
		transition: opacity .3s linear;
		ul {
			list-style: none;
			padding: 6px 0;
			margin: 0;
			box-sizing: border-box;
			li {
				font-size: 16px;
				padding: 0 15px;
				position: relative;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #606266;
				height: 34px;
				line-height: 34px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				cursor: pointer;
			}
			li:hover {
				background-color: #F5F7FA;
			}
		}
	}
	
	.opacity0 {
		opacity: 0;
	}
	
	.opacity1 {
		opacity: 1;
	}
	
	.itemSelected {
		background-color: #F5F7FA;
	}
</style>