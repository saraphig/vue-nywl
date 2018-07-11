<!--
	组件名称：全局询问框组件（只需全局初始化一次即可）
	作者：hzp
	
	参数格式：
	@props
		(String) title 询问标题
		(String) text 询问内容
		
	@events
		无
			
	@ref
		无
		
	用法：
		this.$globalConfirm("提示", "确认要删除吗？", () => {//确定},() => {//取消});
-->
<template>
	<div class="global-confirm">
		<div class="confirm-layer"></div>
		<div class="confirm-box">
			<div class="title">
				<div class="title-name">{{title}}</div>
				<i class="icon iconfont icon-icon_close close-icon" @click="cleanHandle"></i>
			</div>
			<div class="line"></div>
			<div class="message">{{text}}</div>
			<div class="btn">
				<div class="btn-clean" @click="cleanHandle">取消</div>
				<div class="btn-ok" @click="okHandle">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "GlobalConfirm",
		props: {
			title: {
				type: String,
				default: ""
			},
			text: {
				type: String,
				default: ""
			}
		},
		methods: {
			cleanHandle() {
				this.$emit('disp-cleanCallBack');
			},
			okHandle() {
				this.$emit('disp-okCallBack');
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.confirm-layer {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background: #000;
		z-index: 2000001;
	}
	
	.confirm-box {
		position: fixed;
		top: 220px;
		left: 0;
		right: 0;
		width: 470px;
		background-color: #fff;
		margin: auto;
		border-radius: 4px;
		border: 1px solid #ebeef5;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		text-align: left;
		overflow: hidden;
		z-index: 2000001;
		min-height: 205px;
		.title {
			position: relative;
			height: 40px;
			padding-top: 20px;
			.title-name {
				position: absolute;
				width: 310px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 16px;
				margin-left: 30px;
				color: #444444;
				font-weight: bold;
			}
			.close-icon {
				font-size: 22px;
				position: absolute;
				width: 15px;
				margin-left: 420px;
				cursor: pointer;
				height: 15px;
				padding-left: 10px;
				background-color: #fff;
			}
		}
		.line {
			width: 420px;
			height: 1px;
			border-bottom: solid 1px #e3e8ea;
			margin-left: 29px;
		}
		.message {
			margin-left: 29px;
			width: 333px;
			margin-top: 20px;
			color: #444444;
			font-size: 14px;
		}
		.btn {
			position: relative;
			display: flex;
			margin-top: 40px;
			margin-bottom: 20px;
			.btn-clean {
				font-size: 14px;
				text-align: center;
				cursor: pointer;
				color: #41a259;
				margin-left: 285px;
				width: 68px;
				height: 35px;
				border-radius: 2px;
				border: solid 1px #41a259;
				line-height: 33px;
			}
			.btn-ok {
				font-size: 14px;
				text-align: center;
				margin-left: 20px;
				color: #fff;
				cursor: pointer;
				width: 68px;
				height: 37px;
				background-color: #41a259;
				line-height: 36px;
				border-radius: 2px;
			}
		}
	}
</style>