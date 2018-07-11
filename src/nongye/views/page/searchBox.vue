<template>
	<div class="searchBox">
		<input type="text" class="seach_input" v-model="val" placeholder="输入监测区域名称"  @keyup.enter="search()"/>
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
		methods: {
			search: function() {
				this.$emit('SearchVal', this.val);
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
:-moz-placeholder {
color: #b0b1b4;
}
::-moz-placeholder {
color: #b0b1b4;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
color: #b0b1b4;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
color: #b0b1b4;
}
.searchBox
  position: relative;
  width: 225px;
  float: right;
  .seach_input
    width: 202px;
    height: 46px;
    line-height: 46px;
    border-radius: 4px;
    border: #b1b4b6 2px solid;
    background: none;
    font-size: 18px;
    padding-left: 20px;
    font-weight: bold;
  .seach_bott
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
 input::-ms-clear{display:none;}
</style>
