<template>
	<div class="slde-wrap" :class="shrinkage ? '':'slde-wrap-little'">
		<div class="sidebar">
			<div class="top" :class="shrinkage ? '':'top-little'">
				<div class="top-portrait">
					<span class="top-portrait-img" v-show='shrinkage'>
            <img :src="info.imgUrl"
              name="sidebarLogoName"
              @click='personalToggle()'>
          </span>
					<span class="top-shrinkage" @click='topShrinkage()'>
            <i class="iconfont"
              :class="shrinkage?'icon-icon_daohang_caidanshouqi':'icon-icon_daohang_caidanzhankai'"></i>
          </span>
				</div>
				<div class="user-info" v-show='shrinkage' @click='personalToggle()'>
					<div>
						<span class="top-username">{{userInfo.userName}}</span>

					</div>
					<div>
						<i class="trangle iconfont" :class="showPersonal?'icon-icon_jiantou_shangshouqi':'icon-icon_jiantou_xiazhankai'">
            </i>
					</div>
				</div>
				<div>
					<div class="personalCenter" v-show="showPersonal">
						<div class="center-item" :class='{safeOut: index == 2}' v-for='(item, index) in centerList' :key="index" @click="funcAlert(item.type)" :name="'personalCenter_'+index">
							<span>{{item.text}}</span>
						</div>
					</div>
				</div>

			</div>
			<div class="sidebar-main">
				<ul class="sidebar-menu" :class="shrinkage ? '':'sidebar-menu-little'">
					<template v-for="(item ,index) in menulist">
						<li class="itemClass" :class="item.menuName===maintoggleName ? 'active' : ''" @mouseenter='isToggleLittle(item.menuName,  index)' @mouseleave='isToggleLittle(item.menuName,  index)'>
							<template v-if="item.menuUrl">
								<div class="single" @click="isToggle(item.menuName, item.d, index)">
									<router-link :to="item.menuUrl" :name="'sidebar_item_'+index">
										<span class="" v-show='shrinkage'>{{item.menuName}}</span>
									</router-link>
								</div>
							</template>
							<template v-else-if="item.children">
								<div class="single" @click="isToggle(item.menuName, item.d, index)">
									<i :class="['iconfont-left',item.menuIcon]"></i>
									<span class="" v-show='shrinkage'>{{item.menuName}}</span>
									<i class="trangle iconfont" v-show='shrinkage' :class="item.menuName === toggleName?'icon-icon_jiantou_shangshouqi':'icon-icon_jiantou_xiazhankai'"></i>
								</div>
								<transition name="sliderToggle" mode="out-in">
									<ul :class="shrinkage ? 'tree-menu':'tree-menu-little'" v-show="item.menuName === toggleName">
										<li v-for="(subitem,subindex) in item.children" :class="currentUrl == subitem.menuUrl ? 'active':''" @mouseenter='isTogglethreelittle(subitem.menuName)' @mouseleave='isTogglethreelittle(subitem.menuName)'>
											<template v-if="subitem.children">
												<div @click='isTogglethree(subitem.menuName)'>
													<router-link :to="subitem.menuUrl" :name="'sidebar_child_'+subindex">
														<!--<i :class="subitem.menuIcon"></i>-->
														<span class="">{{subitem.menuName}}</span>
														<i class="trangle iconfont" v-show='shrinkage' :class="subitem.menuName === toggleNameLittle?'icon-icon_jiantou_shangshouqi':'icon-icon_jiantou_xiazhankai'"></i>
													</router-link>
												</div>
												<ul :class="shrinkage ? 'tree-menu2':'tree-menu-little2'" v-show='subitem.menuName === toggleNameLittle'>
													<li v-for="(lsubitem,lsubindex) in subitem.children" :key="lsubindex" :class="currentUrl == lsubitem.menuUrl ? 'active':''" @click='selectSidebarDec(index)'>
														<div>
															<router-link :to="lsubitem.menuUrl" :name="'sidebar_child_'+subindex">
																<!--<i :class="subitem.menuIcon"></i>-->
																<span class="">{{lsubitem.menuName}}</span>
															</router-link>
														</div>
													</li>
												</ul>
											</template>
											<template v-if="!subitem.children">
												<div>
													<router-link :to="subitem.menuUrl" :name="'sidebar_child_'+subindex">
														<!--<i :class="subitem.menuIcon"></i>-->
														<span class="">{{subitem.menuName}}</span>
													</router-link>
												</div>
											</template>
										</li>
									</ul>
								</transition>
							</template>
						</li>
					</template>
				</ul>
			</div>

		</div>
		<SH-Layer :title="'基本信息'" v-model="dialogVisible">
			<ul class="layer-base">
				<li>
					<span class="user-title">用户角色:</span>
					<span class="contxt contxt-name" v-text="usergroupname">
          </span>
				</li>
				<li>
					<span class="user-title">用户账号:</span>
					<span class="contxt">{{userInfo.telephone}}</span>
				</li>
				<li>
					<span class="user-title">最近登录时间:</span>
					<span class="contxt">{{userInfo.lastLoginTime|filterGetDateTime}}</span>
				</li>
			</ul>
			<template slot="footer">
				<div class="layer-base-btn">
					<sh-button plain @click="layerBack()">关闭</sh-button>
				</div>
			</template>
		</SH-Layer>

	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import VMessagebox from '@com/alert/message-box'
	import eventBus from '@com/event-bus';
	import { EventBus } from '@lib/js/event-bus';
	import SHLayer from '@com/sh-ui/components/sh-modal'
	import ShButton from "@com/sh-ui/components/sh-button";
	export default {
		name: 'v-sidebar',
		components: {
			VMessagebox,
			SHLayer,
			ShButton
		},
		data() {
			return {
				show: false,
				dialogVisible: false,
				dialogVisible: false,
				usergroupname: '',
				nowIndex: 0,
				childIndex: 0,
				currentUrl: '', // 当前浏览器的url
				maintoggleName: '', //主菜单名称
				toggleName: '', // 菜单子项目名称
				toggleNameLittle: '', //二级菜单子项目名称
				shrinkage: true, //当前菜单栏展开
				shrinkageLi: false, //小菜单下的显示子目录
				config: {
					'iconfont': 'iconfont', // iconfont的字体
					'icon_collapse': 'icon-tubiao-', // 箭头 下
					'icon_expand': 'icon-jiantou_up' // 箭头 上
				},
				props: ['toggle', 'padMode'], // 这里是用来构成布局响应传递的props,单一组件不用管他

				showPersonal: false,
				baseInfo: {
					name: '测试者',
					number: '159 6027 8888',
					time: '2018-3-9 11:25'
				},
				info: {
					imgUrl: require('../assets/img/logo.png'),
					administrators: '管理员',
					adminName: '石先生'
				},
				menulist: [{
						index: '',
						menuName: "监控中心",
						menuIcon: 'iconfont icon-icon_daohang_jiankongzhongxin',
						menuUrl: "",
						groupCode: "3.2.1.2",
						children: [{
								menuName: "实时状态",
								"menuUrl": "/page_monitor",
								groupCode: "3.2.1.2.2"
							},
							{
								menuName: "地图监控",
								"menuUrl": "/map_monitor",
								groupCode: "3.2.1.2.3"
							},
							{
								menuName: "视频监控",
								"menuUrl": "/monitor",
								groupCode: "3.2.1.2.4"
							}
						]
					},
					{
						menuName: "告警中心",
						menuIcon: 'iconfont icon-icon_topbar_gaojingtongzhi',
						menuUrl: "",
						groupCode: "3.2.1.4",
						children: [{
								menuName: "实时告警",
								"menuUrl": "/page_realwarning",
								groupCode: "3.2.1.4.1"
							},
							{
								menuName: "告警记录",
								"menuUrl": "/page_warnlog",
								groupCode: "3.2.1.4.2"
							},
							{
								menuName: "告警通知",
								"menuUrl": "/page_warnnotice",
								groupCode: "3.2.1.4.3"
							},
						]
					},
					{
						menuName: "农事管理",
						menuIcon: 'iconfont icon-icon_daohang_gaojingguanli',
						menuUrl: "",
						groupCode: "3.2.1.10",
						children: [{
								menuName: "工作日报",
								"menuUrl": "/dailypaper",
								groupCode: "3.2.1.10.1"
							},
							{
								menuName: "农事流程",
								"menuUrl": "/farming_flowmanage",
								groupCode: "3.2.1.10.2"
							},
						]
					},
					{
						menuName: "设备管理",
						menuIcon: 'iconfont icon-icon_daohang_shebeiguanli',
						menuUrl: "",
						groupCode: "3.2.1.3",
						children: [{
								menuName: "设备列表",
								"menuUrl": "/equipment",
								groupCode: "3.2.1.3.1"
							},
							// { menuName: "设备故障管理", "menuUrl": "", groupCode: "3.2.1.3.2.1" },
						]
					},
					/*{
          menuName: "策略中心",
          menuIcon: 'iconfont icon-icon_daohang_celvezhongxin',
          menuUrl: "",
          groupCode: "3.2.1.9",
          children: [
            { menuName: "决策管理", "menuUrl": "/strategy1", groupCode: "3.2.1.9.2" },
            { menuName: "联动管理", "menuUrl": "/strategy2", groupCode: "3.2.1.9.3" }
          ]
        },
        {
         menuName: "统计中心",
         menuIcon: 'iconfont icon-31',
         menuUrl: "",
         groupCode: "6",
         children: [
            {menuName: "数据统计", "menuUrl": "/statistical"}
         ]
       },
        {
         menuName: "溯源中心",
         menuIcon: 'iconfont icon-31',
         menuUrl: "",
         groupCode: "7",
         children: [
            {menuName: "溯源设置", "menuUrl": "/roots"}
         ]
       },*/
					{
						menuName: "系统管理",
						menuIcon: 'iconfont icon-icon_daohang_xitongguanli',
						menuUrl: "",
						groupCode: "3.2.1.8",
						children: [{
								menuName: "机构管理",
								"menuUrl": "/organization",
								groupCode: "3.2.1.8.2"
							},
							{
								menuName: "地块管理",
								"menuUrl": "/area",
								groupCode: "3.2.1.8.3"
							},
							{
								menuName: "用户管理",
								"menuUrl": "/user",
								groupCode: "3.2.1.8.4"
							},
							{
								menuName: "角色管理",
								"menuUrl": "/rolemanage",
								groupCode: "3.2.1.8.5"
							},
							//{ menuName: "小程序用户管理", "menuUrl": "/smallprogram", groupCode: "3.2.1.8.6" },
							// { menuName: "系统配置", "menuUrl": "", groupCode: "3.2.1.8.7" },
							// { menuName: "日志管理", "menuUrl": "", groupCode: "3.2.1.8.8" }

						]
					}
				],
				munCb: [],
				mundatalist: {},
				centerList: [{
						type: 'baseData',
						index: '',
						text: "基本资料",
						icon: 'iconfont icon-ziliaoduibi',
					},
					{
						type: 'changePassword',
						index: '',
						text: "修改密码",
						icon: 'iconfont icon-lock',
					},
					{
						type: 'loginOut',
						index: '',
						text: "安全退出",
						icon: 'iconfont icon-tuichu',
					}
				]
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'getUserInfo',
			}),

		},
		destroyed: function() {},
		created: function() {
			if(this.$route.fullPath !== '/index') {
				let saveurl = this.$route.fullPath;
				let geturl = saveurl.split("?");
				let lasturl = geturl[0].split("/");
				this.currentUrl = "/" + lasturl[1];
			} else {
				this.currentUrl = '/page_monitor'
			}

			this.$nextTick(() => {
				this.maintoggleName = '';
				this.menulist.forEach((item, index) => { // 增加标记位,判断当前url然后自动展开或者激活对应项(刷新默认展开当前url的项)
					if(!item.children && item.menuUrl) {
						this.currentUrl === item.menuUrl ? '' : '';
					} else {
						if(item.children) {
							item.children.forEach((subitem, index) => {
								if(!subitem.children) {
									if(this.currentUrl === subitem.menuUrl) {
										this.maintoggleName = item.menuName;
										this.toggleName = subitem.menuName;
									}
								} else {
									subitem.children.forEach((threeitem, index) => {
										if(this.currentUrl === threeitem.menuUrl) {
											this.maintoggleName = item.menuName;
											this.toggleName = subitem.menuName;
										}
									})
								}
							})
						}
					}
				})
			});
		},
		methods: {
			selectSidebarDec(index) {},
			convertArray(array) {
				for(var i = 0; i < array.length; i++) {
					let item = array[i];
					this.munCb.push(item);
					if(item.childrens) {
						this.convertArray(item.childrens);
					}
				}
				// array.filter()

			},
			//菜单权限
			menuPower() {
				let that = this;
				this.$store.dispatch("getUserMenu", {}).then(data => {
						that.mundatalist = data;
						that.convertArray(data);
						let menudata = that.munCb.map(function(item) {
							return item.menuCode
						});
						that.menulist = that.menulist.filter(function(menu, index, array) {
							if(menu.children.length > 0) {
								menu.children = menu.children.filter(function(menut) {
									return(menudata.indexOf(menut.groupCode) !== -1);
									if(menut.children.length > 0) {
										menut.children = menut.children.filter(function(menutc) {
											return(menudata.indexOf(menutc.groupCode) !== -1);
										})
									}
								})
							}
							return(menudata.indexOf(menu.groupCode) !== -1);
						})
					},
					error => {
						console.log(error);
					}
				);

			},
			//获取当前导航位置
			getmenudress() {
				let menuLi = document.getElementsByClassName('itemClass');
				for(let i = 0; i < menuLi.length; i++) {

				}
			},
			topShrinkage() {
				this.shrinkage = !this.shrinkage;
				this.toggleName = ""
				this.$emit("leftSize", this.shrinkage);
			},
			isToggleLittle(name, d, index) {
				if(this.shrinkage == false) {
					if(this.toggleName == name) {
						this.toggleName = ""
					} else {
						this.toggleName = name;

					}
				}
			},
			sureHandel() {
				this.$store.dispatch('logout', {})
					.then(response => {
						// change checked token
						this.$store.commit('FETCH_CHECKED_TOKEN', false);
						this.$router.push({
							path: '/login'
						});
						localStorage.clear();
					});
			},
			onSelectType: function(type) {
				this.show = type;
			},
			isToggle(name, d, index) {
				if(this.shrinkage) {
					// 判断展开收缩的核心
					this.maintoggleName = name;
					if(this.toggleName == name) {
						this.toggleName = ""
					} else {
						this.toggleName = name;

					}

				}
			},
			isTogglethree(name) {
				if(this.shrinkage) {
					// 判断展开收缩的核心
					if(this.toggleNameLittle == name) {
						this.toggleNameLittle = ""
					} else {
						this.toggleNameLittle = name
					}

				}
			},
			isTogglethreelittle(name) {
				if(!this.shrinkage) {
					// 判断展开收缩的核心
					if(this.toggleNameLittle == name) {
						this.toggleNameLittle = ""
					} else {
						this.toggleNameLittle = name
					}

				}
			},
			cleard() {
				this.menulist.forEach(item => {
					this.$delete(item, 'd')
				})
			},

			personalToggle() {
				this.showPersonal = !this.showPersonal;
			},
			layerBack() {
				this.dialogVisible = !this.dialogVisible;
				EventBus.$emit('loginOutclicked', false);
			},
			baseDataToggle() {
				this.dialogVisible = !this.dialogVisible;
			},
			funcAlert(type) {
				switch(type) {
					case 'baseData':
						this.showPersonal = false;
						this.dialogVisible = !this.dialogVisible;
						EventBus.$emit('loginOutclicked', true);

						break;
					case 'loginOut':
						this.showPersonal = false;
						this.show = !this.show;
						EventBus.$emit('loginOutclicked', this.show);
						this.$shConfirm("是否确认退出？", "提示信息", {
							callback: type => {
								if(type === "confirm") {
									this.$store.dispatch('logout', {})
										.then(response => {
											// change checked token
											this.$store.commit('FETCH_CHECKED_TOKEN', false);
											this.$router.push({
												path: '/login'
											});
											localStorage.clear();
										});
								}
							}
						})
						break;
					case 'changePassword':
						this.showPersonal = false;
						this.$router.push({
							path: '/changepassword',
							name: 'changepassword',
							query: {
								isFromPersonalCenter: true
							},
							params: {
								backurl: this.$route.fullPath
							}
						});
						break;
					case 'photo':
						this.showPersonal = false;
						break;
				}
			},
			//     获取基本资料
			GetBasicData() {
				this.$store.dispatch("fetchBasicData", {
					id: 1
				}).then(
					response => {
						this.name = response.name;
					},
					error => {
						console.log(error);
					}
				);
			},
			Getgroupname() {
				this.$store.dispatch("getusergroup", {
					id: 1
				}).then(
					response => {
						this.usergroupname = response[0].userGroupName;
					},
					error => {
						console.log(error);
					}
				);
			},
			getUserMenuList() {

			}
		},
		mounted: function() {
			this.menuPower();
			this.getmenudress();
			this.Getgroupname();
			eventBus.$on('getSlidebarPosition', (data) => {
				this.nowIndex = data
			})
			console.log("菜单栏------------------");
			console.log(this.menulist);
		},
		watch: {
			dialogVisible() {
				if(!this.dialogVisible) {
					EventBus.$emit('loginOutclicked', false);
				}
			},
			'$route' () {
				if(this.$route.fullPath !== '/index') {
					let saveurl = this.$route.fullPath;
					let geturl = saveurl.split("?");
					let lasturl = geturl[0].split("/");
					this.currentUrl = "/" + lasturl[1];
				} else {
					this.currentUrl = '/page_monitor'
				}

				this.menulist.forEach((item, index) => { // 增加标记位,判断当前url然后自动展开或者激活对应项(刷新默认展开当前url的项)
					if(!item.children && item.menuUrl) {
						this.currentUrl === item.menuUrl ? '' : '';
					} else {
						if(item.children) {
							item.children.forEach((subitem, index) => {
								if(!subitem.children) {
									if(this.currentUrl === subitem.menuUrl) {
										this.maintoggleName = item.menuName;
									}
								} else {
									subitem.children.forEach((threeitem, index) => {
										if(this.currentUrl === threeitem.menuUrl) {
											this.maintoggleName = item.menuName;
										}
									})
								}

							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.sidebar-main {
		margin-top: -5px;
	}
	
	a:focus {
		outline: none;
	}
	
	.slde-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 250px;
		height: 100%;
		box-sizing: border-box;
		z-index: 99;
		background: #f8f9fa;
	}
	
	.slde-wrap-little {
		width: 72px;
	}
	
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #fff;
		opacity: 0;
		z-index: 9999;
	}
	
	.base-data {
		position: fixed;
		width: 100%;
		height: 100%;
	}
	
	.base-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 9999;
	}
	
	.layer-base {
		width: 440px;
		li {
			list-style: none;
			height: 42px;
			line-height: 42px;
			font-size: 14px;
			.user-title {
				display: inline-block;
				float: left;
				margin-right: 20px;
				color: #999;
			}
			.contxt {
				display: inline-block;
				float: left;
			}
			.contxt-name {
				display: inline-block;
				width: 300px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	
	.layer-base-btn {
		text-align: right;
	}
	
	.data-con {
		position: absolute;
		background: #fff;
		z-index: 99999;
		width: 500px;
		top: 50%;
		left: 50%;
		margin-left: -250px;
		margin-top: -170px;
		.tit {
			width: 100%;
			height: 50px;
			background: #f5faff;
			line-height: 50px;
			padding: 0 20px 0 25px;
			box-sizing: border-box;
			font-weight: bold;
			.fr {
				float: right;
				cursor: pointer;
			}
			span {
				font-size: 20px;
			}
		}
		ul {
			padding: 5px 20px 91px 20px;
			li {
				border-bottom: 2px solid #f0f0f0;
				color: #b0b1b4;
				line-height: 66px;
				padding: 0 5px 0 7px;
				box-sizing: border-box;
			}
			.contxt {
				float: right;
				color: #313131;
			}
		}
	}
	
	a {
		color: #313131;
		text-decoration: none;
	}
	
	body {
		background-color: rgba(242, 242, 242, 1);
		/* font-family "Microsoft YaHei" */
	}
	
	.personalCenter {
		box-sizing: border-box;
		color: #fff;
		font-size: 12px;
		border-top: 1px solid #09314B;
		margin-right: 25px;
		padding-top: 25px;
		padding-bottom: 15px;
		.center-item {
			height: 38px;
			line-height: 38px;
			display: block;
			cursor: pointer;
			color: #b0cbdc;
			span {
				height: 34px;
				line-height: 34px;
				display: block;
			}
			span:hover {
				color: #41a259;
			}
		}
		.safeOut {}
	}
	
	.personalCenter::after {
		content: '';
		position: absolute;
		top: 28px;
		left: -12px;
		width: 0;
		height: 0;
		border-top: 12px solid transparent;
		border-right: 12px solid #fff;
		border-bottom: 12px solid transparent;
	}
	
	.font_bold {
		font-weight: bold;
		font-size: 18px;
	}
	
	.sidebar {
		position: relative;
		float: left;
		width: 100%;
		position: relative;
		left: 0;
		top: 0;
		bottom: 0;
		background: #07263a url('../assets/img/left-bg.png');
		height: 100vh;
		box-shadow: 3px 3px 20px #e4e4e4;
		.top {
			min-height: 70px;
			padding-left: 30px;
			padding-top: 30px;
			margin-bottom: 45px;
			overflow: hidden;
			background-color: rgba(0, 0, 0, 0.2);
			.top-portrait {
				margin-bottom: 11px;
				overflow: hidden;
				.top-portrait-img {
					float: left;
					width: 70px;
					height: 70px;
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 70px;
						height: 70px;
						cursor: pointer;
					}
				}
				.top-shrinkage {
					width: 72px;
					float: right;
					text-align: center;
					font-size: 24px;
					color: #fff;
					cursor: pointer;
					.iconfont {
						font-size: 24px;
						color: #5e8fad;
						cursor: pointer;
					}
				}
			}
			.user-info {
				height: 60px;
				overflow: hidden;
				div:first-child {
					float: left;
					width: 75%;
				}
				div:last-child {
					float: right;
					width: 20%;
					text-align: right;
					cursor: pointer;
					.iconfont {
						font-size: 14px;
						color: #5e8fad;
						float: right;
						margin-right: 20px;
					}
				}
			}
			.top-username {
				width: 70px;
				font-size: 14px;
				text-align: left;
				color: #b0cbdc;
				cursor: pointer;
			}
			.admin {
				height: 25px;
				width: 70px;
				text-align: left;
				font-size: 12px;
				color: #5e8fad;
			}
			span {
				display: block;
				line-height: 25px;
			}
		}
		.top-little {
			height: 70px;
			padding-left: 0px;
			padding-top: 0px;
			margin-bottom: 70px;
			overflow: hidden;
			.top-portrait {
				margin-bottom: 0px;
				overflow: hidden;
				.top-shrinkage {
					width: 72px;
					height: 70px;
					line-height: 60px;
					float: right;
					text-align: center;
					font-size: 18px;
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
	
	.sidebar-menu>li {
		position: relative;
		width: 100%;
		padding: 0px;
		margin-bottom: 15px;
		line-height: 34px;
		font-size: 14px;
		box-sizing: border-box;
		cursor: pointer;
		.iconfont {
			margin-right: 19px;
			font-size: 24px;
		}
		.iconfont-left {
			float: left;
		}
		.single {}
		.sidebar-menu>li:hover {
			.tree-menu-little {
				display: block;
			}
		}
		.trangle {
			float: right;
			margin-right: 20px;
			font-size: 14px;
			color: #5e8fad;
		}
		&.active {
			box-sizing: border-box;
			>.single {
				background: #41a259;
				line-height: 34px;
				color: #fff;
				.trangle {
					color: #fff;
				}
				a {
					display: block;
					color: #b0cbdc;
				}
			}
		}
		.tree-menu {
			margin-left: 71px;
			li a {
				display: block;
				color: #b0cbdc;
				font-size: 12px;
				span {
					font-weight: 800;
				}
			}
			.active {
				a {
					color: #41a259;
				}
			}
		}
		.tree-menu2 {
			margin-left: 15px;
			li a {
				display: block;
				color: #b0cbdc;
				font-size: 12px;
				span {
					font-weight: 800;
				}
			}
			.active {
				a {
					color: #41a259;
				}
			}
		}
		.tree-menu-little {
			position: absolute;
			left: 72px;
			top: 0px;
			width: 150px;
			background: #09314b;
			li {
				position: relative;
				width: 126px;
				padding-left: 24px;
			}
			li:hover {
				background: #0c3b5a;
			}
			li a {
				display: block;
				color: #b0cbdc;
				font-size: 12px;
				span {
					font-weight: 800;
				}
			}
			.active {
				a {
					color: #fff;
				}
			}
		}
		.tree-menu-little2 {
			position: absolute;
			left: 150px;
			top: 0px;
			width: 150px;
			background: #09314b;
			overflow: hidden;
			li {
				width: 126px;
				padding-left: 24px;
			}
			li:hover {
				background: #0c3b5a;
			}
			li a {
				display: block;
				color: #b0cbdc;
				font-size: 12px;
				span {
					font-weight: 800;
				}
			}
			.active {
				a {
					color: #fff;
				}
			}
		}
	}
	
	.sidebar-menu-little>li {
		margin-bottom: 10px;
	}
	
	.sidebar-menu-little>li:hover {
		background: #09314b;
	}
	
	.sidebar-menu li .single {
		padding-left: 25px;
		margin: 0px;
		overflow: hidden;
		display: block;
		color: #b0cbdc;
		span {
			font-weight: 800;
		}
	}
	
	ul {
		list-style: none;
		margin: 0;
		padding-left: 0;
		li {
			font-size: 16px;
			display: block;
		}
	}
	
	.icon-touxiang:before,
	.icon-ziliaoduibi:before,
	.icon-lock:before,
	.icon-tuichu:before {
		color: #41a259;
	}
</style>