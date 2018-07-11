<template>
	<div class="global-confirm">
		<div class="confirm-layer"></div>
		<div class="confirm-box">
			<div class="title">
				<div class="title-name">{{title}}</div>
				<div class="close-icon" @click="cleanHandle">x</div>
			</div>
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
		z-index: 2000000;
	}
	
	.confirm-box {
		position: fixed;
		top: 220px;
		left: 0;
		right: 0;
		width: 420px;
		background-color: #fff;
		margin: auto;
		border-radius: 4px;
		border: 1px solid #ebeef5;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		text-align: left;
		overflow: hidden;
		z-index: 2000001;
		.title {
			position: relative;
			height: 39px;
			padding-top: 10px;
			.title-name {
				position: absolute;
				width: 310px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 17px;
				margin-left: 10px;
			}
			.close-icon {
				position: absolute;
				width: 20px;
				margin-left: 384px;
				cursor: pointer;
				height: 24px;
				padding-left: 10px;
				background-color: #fff;
			}
		}
		.message {
			margin-left: 44px;
			width: 333px;
			font-size: 14px;
		}
		.btn {
			position: relative;
			display: flex;
			margin-top: 30px;
			margin-bottom: 20px;
			.btn-clean {
				border: 1px solid #d7d0d0;
				width: 50px;
				font-size: 14px;
				text-align: center;
				padding-top: 5px;
				padding-bottom: 5px;
				border-radius: 5px;
				cursor: pointer;
				margin-left: 292px;
			}
			.btn-ok {
				border: 1px solid #d7d0d0;
				width: 50px;
				font-size: 14px;
				text-align: center;
				padding-top: 5px;
				padding-bottom: 5px;
				border-radius: 5px;
				margin-left: 8px;
				background-color: #409eff;
				color: white;
				cursor: pointer;
			}
		}
	}
</style>