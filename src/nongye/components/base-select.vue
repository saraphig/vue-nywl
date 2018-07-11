<!--
	组件名称：基础下拉列组件
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
	<div class="base-select" @mouseenter="mouseOverHandle" @mouseleave="mouseOutHandle">
		<div :class="{selectBox:true,selectFocus:inFocus}">
			<div class="selectInput" @click="selectClickHandle">
				<input v-model="inputModel" v-focus="setFocus" type="text" autocomplete="off" @blur="selectBlurHandle" :placeholder="placeholderStr" readonly="readonly" value="" />
				<div class="selectIcon">
					<svg t="1528103351049" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6548" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
						<path d="M822.125714 331.337143a73.142857 73.142857 0 0 0-103.131428 0L512 537.6 305.005714 331.337143a73.142857 73.142857 0 0 0-103.131428 0 73.142857 73.142857 0 0 0 0 103.131428l258.194285 258.194286a63.634286 63.634286 0 0 0 24.137143 16.091429 73.142857 73.142857 0 0 0 79.725715-16.091429l258.194285-258.194286a73.142857 73.142857 0 0 0 0-103.131428z" p-id="6549" fill="#999999"></path>
					</svg>
				</div>
			</div>
		</div>
		<div v-if="contentDisplay" :class="[{selectContent:true} , contentVisible ? {opacity1:true} : {opacity0:true}]">
			<ul>
				<li :class="{itemSelected : itemSelectedClass(item.id)}" v-for="item in opts" :id="item.id" @click="itemSelectedHandle">{{item.value}}</li>
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
				setFocus: false,
				ieFocus: false
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
			mouseOverHandle(e) {
				this.ieFocus = true;
				this.setFocus = false;
				this.setFocus = true;
			},
			mouseOutHandle(e) {
				this.ieFocus = false;
				this.setFocus = false;
				this.setFocus = true;
			},
			selectClickHandle() {
				if(this.contentVisible) {
					this.contentVisible = false;
				} else {
					this.contentVisible = true;
				}
			},
			selectBlurHandle(e) {
				let _this = this;
				if(this.ieFocus == false) {
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
			},
			initDefaultSelect(selectItemID, selectItemValue) {
				let _this = this;
				_this.id = selectItemID;
				this.$emit('disp-selectCallBack', _this.id);
			}
		},
		watch: {
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
			if(_this.defaultSelect) {
				let index = _this.defaultSelect - 1;
				if(_this.opts.length > 0 && index >= 0) {
					_this.inputModel = _this.opts[index].value;
					_this.id = _this.opts[index].id;
				}
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.base-select {
		position: relative;
		width: 100%;
	}
	
	.selectBox {
		width: 100%;
		height: 36px;
		border: solid 1px #DCDFE6;
		border-radius: 2px;
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
				text-indent: 10px;
				font-size: 14px;
				margin-top: 2px;
				cursor: pointer;
				overflow: hidden;
				width: 100%;
				outline: none;
			}
			.selectIcon {
				position: absolute;
				top: 0px;
				right: 2px;
				pointer-events: none;
				background-color: #fff0;
				width: 22px;
				height: 40px;
				padding-top: 8px;
				padding-right: 5px;
				i {
					margin-left: -5px;
					display: block;
					margin-top: 10px;
				}
			}
		}
	}
	
	.selectFocus {
		border-color: #41a259;
	}
	
	.selectContent {
		z-index: 10000;
		position: absolute;
		background-color: white;
		margin-top: 2px;
		width: 100%;
		max-height: 300px;
		border: solid 1px #DCDFE6;
		border-radius: 2px;
		box-shadow: 0px 0px 2px gray;
		overflow-y: auto;
		transition: opacity .3s linear;
		background-color: #ffffff;
		box-shadow: 0px 0px 20px 0px rgba(204, 204, 204, 0.4);
		border-radius: 2px;
		ul {
			list-style: none;
			padding: 6px 0;
			margin: 0;
			box-sizing: border-box;
			li {
				font-size: 14px;
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
				color: #41A259;
				background-color: #f1f7fa;
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
		background-color: #f1f7fa;
	}
</style>