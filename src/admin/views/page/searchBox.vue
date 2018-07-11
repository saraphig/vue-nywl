<template>
	<div class="searchBox">
		<input type="text" class="seach_input" v-model="val" placeholder="输入检测区域名称" />
		<i class="seach_bott iconfont icon-sousuo" @click="search()"></i>
	</div>
</template>

<script>
	export default {
		name: 'vSearchBox',
		data() {
			return {
				val: '', //搜索框内容
			}
		},
		created: function() {

		},
		methods: {
			search: function() {
				this.$emit('SearchVal', this.val);
			}
		},
	}
</script>

<style scoped>
	.searchBox {
		position: relative;
		width: 260px;
		float: right;
		margin-top: 20px;
	}

	.seach_input {
		width: 240px;
		height: 46px;
		line-height: 46px;
		border-radius: 4px;
		border: #b1b4b6 2px solid;
		background: white;
		font-size: 18px;
		padding-left: 18px;
	}

	.seach_bott {
		position: absolute;
		right: 5px;
		top: 0px;
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 22px;
		color: #b0b1b4;
		font-weight: bold;
		cursor: pointer;
		text-align: center;
	}
</style>
