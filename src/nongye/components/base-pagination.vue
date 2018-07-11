<!--
	组件名称：基础分页组件
	作者：hzp
	
	参数格式：
	@props
		(Number) total 数据总条数
		(Number) currentPage 当前页码
		(Number) pageSize 每页显示条数
		(Number) pagegroup 分页条数
		
	@events
		pagechange(curPage) 切换页面时的回调方法。
			(Number) curPage:当前页码
			
	@ref
		$ref.*.setCurrent(curPage) 设置该组件到某页码数字。
			(Number) curPage:某个页码
-->
<template>
	<div class="base-pagination-box">
		<div class="info">共{{Math.ceil(total/pageSize)}}页/{{total}}条数据</div>
		<div class="base-pageBox">
			<ul class="base-pagination">
				<li>
					<a href="javascript:;" @click="setCurrent(current - 1)">&lt;</a>
				</li>
				<li :class="[hideFirstPageBtn ? {hideFirstPageBtnClass:true}:{hideFirstPageBtnClass:false}]">
					<a href="javascript:;" @click="setCurrent(1)"> 1 </a>
				</li>
				<li v-for="p in grouplist" :class="{'active': current == p.val}">
					<a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
				</li>
				<li :class="[hideLastPageBtn ? {hideLastPageBtnClass:true}:{hideLastPageBtnClass:false}]">
					<a href="javascript:;" @click="setCurrent(page)"> {{page}} </a>
				</li>
				<li>
					<a href="javascript:;" @click="setCurrent(current + 1)">&gt;</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				current: this.currentPage,
				hideFirstPageBtn: false,
				hideLastPageBtn: false
			}
		},
		props: {
			total: { // 数据总条数
				type: Number,
				default: 0
			},
			pageSize: { // 每页显示条数
				type: Number,
				default: 10
			},
			currentPage: { // 当前页码
				type: Number,
				default: 1
			},
			pagegroup: { // 分页条数
				type: Number,
				default: 3
			}
		},
		computed: {
			page: function() { // 总页数
				return Math.ceil(this.total / this.pageSize);
			},
			grouplist: function() { // 获取分页页码
				var len = parseInt(this.page);
				var temp = [];
				var list = [];
				var count = Math.floor(this.pagegroup / 2);
				var center = parseInt(this.current);
				if(len <= this.pagegroup) {
					for(var i = 0; i < len; i++) {
						temp.push({
							text: i + 1,
							val: i + 1
						});
					}
					this.hideFirstPageBtn = true;
					this.hideLastPageBtn = true;
					return temp;
				}
				for(var i = 0; i < len; i++) {
					temp.push(i + 1);
				}
				if(this.current <= 1) {
					center = center + count;
				} else if(this.current >= this.page) {
					center = this.page - count;
				}
				temp = temp.splice(center - count - 1, this.pagegroup);

				for(var i = 0; i < temp.length; i++) {
					list.push({
						text: temp[i],
						val: temp[i]
					});
				}
				if(this.page > this.pagegroup) {
					if((list[0].val - 1) == 1) {
						list.unshift({
							text: '1',
							val: '1'
						});
					} else {
						if(this.current > count + 1) {
							list.unshift({
								text: '...',
								val: list[0].val - 1
							});
						}
					}
					if((list[list.length - 1].val + 1) == this.page) {
						list.push({
							text: this.page,
							val: this.page
						});
					} else {
						if(this.current < this.page - count) {
							list.push({
								text: '...',
								val: list[list.length - 1].val + 1
							});
						}
					}
				}
				let listLen = list.length;
				if(listLen <= this.pagegroup) {
					this.hideFirstPageBtn = true;
					this.hideLastPageBtn = true;
				} else {
					if(list[0].text == "1") {
						this.hideFirstPageBtn = true;
					} else {
						this.hideFirstPageBtn = false;
					}
					if(list[(listLen - 1)].text == this.page) {
						this.hideLastPageBtn = true;
					} else {
						this.hideLastPageBtn = false;
					}
				}

				return list;
			}
		},
		methods: {
			setCurrent: function(idx) {
				if(this.current != idx && idx > 0 && idx < this.page + 1) {
					this.current = idx;
					this.$emit('pagechange', this.current);
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.hideFirstPageBtnClass {
		display: none;
	}
	
	.hideLastPageBtnClass {
		display: none;
	}
	
	.base-pagination-box {
		display: flex;
	}
	
	.info {
		margin-top: 10px;
		margin-right: 0;
		font-size: 14px;
		color: #444444;
	}
	
	.base-pageBox {
		.base-pagination {
			width: 100%;
			list-style: none;
			overflow: hidden;
			display: table;
			padding-left: 0px;
			li {
				float: left;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				margin-left: 10px;
				background-color: #fff;
				border: 1px solid #C6C6C6;
				a {
					display: block;
					width: 30px;
					height: 30px;
					text-align: center;
					line-height: 34px;
					font-size: 14px;
					border-radius: 5px;
					text-decoration: none;
					color: #C6C6C6;
				}
			}
			li:hover {
				a {
					color: #41a259;
				}
			}
			.active {
				border-color: #41a259;
				a {
					color: #41a259;
				}
			}
		}
	}
</style>