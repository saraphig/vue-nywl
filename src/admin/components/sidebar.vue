<template>
  <div class="slde-wrap">
    <div class="sidebar">
      <div class="top">
        <img :src="info.imgUrl" @click='personalToggle()'>
        <span class="font_bold">欢迎回来,{{userInfo.userName}}</span>
        <span class="admin">{{userInfo.userTypeName
          }}</span>
      </div>
      <div class="sidebar-main">
        <ul class="sidebar-menu">
          <template v-for="(item ,index) in menulist">
            <li  class="itemClass" :class=" index  == nowIndex ? 'active' : ''">
              <template v-if="item.menuUrl">
                <div class="single" @click="isToggle(item.menuName, item.defaultActive, index)">
                  <router-link :to="item.menuUrl">
                    <i :class="['iconfont', item.menuIcon]"></i>
                    <span  class="webfont">{{item.menuName}}</span>
                  </router-link>
                </div>
              </template>
              <template v-else-if="item.children">
                <div class="single" @click="isToggle(item.menuName, item.defaultActive, index)">
                  <i :class="['iconfont',item.menuIcon]"></i>
                  <span  class="webfont">{{item.menuName}}</span>
                  <i class="trangle"
                     :class="[config.iconfont, (item.menuName === toggleName) || item.defaultActive? config.icon_expand: config.icon_collapse]"></i>
                </div>
                <transition name="sliderToggle" mode="out-in">
                  <ul class="tree-menu" v-show="item.menuName === toggleName || item.defaultActive">
                    <li v-for="(subitem,subindex) in item.children" :key="subindex"
                        :class="currentUrl === subitem.menuUrl ? 'active':''" @click="tabIndex(index, subindex)">
                      <router-link :to="subitem.menuUrl">
                        <i :class="subitem.menuIcon"></i>
                        <span class="webfont">{{subitem.menuName}}</span>
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </template>
            </li>
          </template>
        </ul>
      </div>
      <div class="personalCenter" v-show="showPersonal">
        <div class="center-item" :class='{safeOut: index == 2}' v-for='(item, index) in centerList' :key="index"
             @click="funcAlert(item.type)">
          <i :class="item.icon ?item.icon : 'icon-menu'"></i>
          <span>{{item.text}}</span>
        </div>
      </div>
      <div class="mask" v-show="showPersonal" @click.stop='personalToggle()'></div>
    </div>
    <div class="base-data" v-show="baseMaskShow">
      <div class="base-mask" @click.stop='baseDataToggle()'></div>
      <div class="data-con">
        <div class="tit"><span>基本资料</span> <i class="fr iconfont icon-htmal5icon21" @click.stop='baseDataToggle()'></i>
        </div>
        <ul>
          <li><span class="user-title">用户角色</span><span class="contxt">{{userInfo.userTypeName
            }}</span></li>
          <li><span class="user-title">用户账号</span><span class="contxt">{{userInfo.telephone}}</span></li>
          <li><span class="user-title">最近登录时间</span><span class="contxt">{{userInfo.lastLoginTime}}</span></li>
        </ul>
      </div>
    </div>
    <v-messagebox v-show="show"  @select-type="onSelectType" :nobtnShow="true"  @sureHandel="sureHandel"></v-messagebox>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import VMessagebox from '@com/alert/message-box'

  export default {
    name: 'v-sidebar',
    components: {
      VMessagebox
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
      })
    },
    data() {
      return {
        show:false,
        baseMaskShow: false,
        nowIndex: 0,
        childIndex:0,
        currentUrl: '', // 当前浏览器的url
        toggleName: '',  // 菜单子项目名称
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
        menulist: [
          {
            index: '',
            menuName: "用户管理",
            menuIcon: 'iconfont icon-shouye',

            children: [
              {menuName: "用户列表", "menuUrl": "/user"},

            ]
          },
          {
            index: '',
            menuName: "区域管理",
            menuIcon: 'iconfont icon-shezhi',

            children: [
              {menuName: "区域列表", "menuUrl": "/area"},
            ]
          },
          {
            index: '',
            menuName: "设备管理",
            menuIcon: 'iconfont icon-shezhi',

            children: [
              {menuName: "设备列表", "menuUrl": "/equipment"},
            ]
          },
          {
            index: '',
            menuName: "系统设置",
            menuIcon: 'iconfont icon-shouye',

            children: [
              {menuName: "变量配置", "menuUrl": "/system"},

            ]
          },
        ],
        centerList: [
//          {
//            type: 'photo',
//            text: "修改头像",
//            icon: 'iconfont icon-touxiang',
//          },
          {
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
    watch: {
      '$route'() {
        this.currentUrl = this.$route.fullPath; // 实时监测当前路由的变化并且赋值
        localStorage.setItem('currentIndex', this.nowIndex);
      }
    },
    destroyed: function() {
    },
    mounted:function () {
      this.classObject()
    },
    created: function () {
      this.nowIndex = localStorage.getItem("currentIndex") || 0;
      this.$nextTick(() => {
        this.menulist.forEach((item, index) => { // 增加标记位,判断当前url然后自动展开或者激活对应项(刷新默认展开当前url的项)
          if (!item.children && item.menuUrl) {
            this.currentUrl === item.menuUrl ? this.$set(item, 'defaultActive', true) : '';
          } else {
            if (item.children) {
              item.children.forEach((subitem, index) => {
                this.currentUrl === subitem.menuUrl ? this.$set(item, 'defaultActive', true) : '';
              })
            }
          }
        })
      });
    },
    methods: {
      classObject: function () {
        document.getElementsByClassName('itemClass')[this.nowIndex].setAttribute('class','active')
      },
      sureHandel () {
        this.$store.dispatch('logout', {})
          .then(response => {
            this.$router.push({path: '/login'});
            localStorage.clear();
          });
      },
      onSelectType:function (type) {
        this.show = type;
      },
      tabIndex(index, subindex) {
        this.childIndex = subindex;
        this.currentUrl = this.menulist[index].children[subindex].menuUrl;
      },
      isToggle(name, defaultActive, index) {
        this.nowIndex = index;
        //点击默认第一个按钮
        this.currentUrl = this.menulist[index].children[0].menuUrl;
        this.$router.push({path: this.currentUrl});
        this.clearDefaultActive();
        // 判断展开收缩的核心
        ((defaultActive ? false : name) !== this.toggleName) ? this.toggleName = name : this.toggleName = '';
      },
      clearDefaultActive() {
        this.menulist.forEach(item => {
          this.$delete(item, 'defaultActive')
        })
      },
      personalToggle() {
        this.showPersonal = !this.showPersonal;
      },
      baseDataToggle() {
        this.baseMaskShow = !this.baseMaskShow;
      },
      funcAlert(type) {
        switch (type) {
          case 'baseData':
            this.showPersonal = false;
            this.baseMaskShow = !this.baseMaskShow;
            break;
          case 'loginOut':
            this.showPersonal = false;
            this.show = !this.show;
//            if (window.confirm("确定退出？")) {
//              this.$router.push({path: '/login'});
//              localStorage.clear();
//            }
            break;
          case 'changePassword':
            this.showPersonal = false;
            this.$router.push({path: '/changepassword', query: {isFromPersonalCenter: true}});
            break;
          case 'photo':
            this.showPersonal = false;
            console.log(11);
            break;
        }
      },
      //上传照片
      handleFile(e) {
        this.$bus.$emit('loading')
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          let img = new Image()
          img.onload = () => {
            // 回调更新父组件数据
            this.saveImg(res.result).then(() => {
              // 本地实在太快了，为了让你们看到loading效果, 加个延时
              setTimeout(() => {
                this.$bus.$emit('unload')
                this.$emit('update-userinfo', {headUrl: res.result})
              }, 1500)
            })
          }
          img.src = res.result
        }
        reader.readAsDataURL(file)
      },
      // 打开图片上传
      uploadHeadImg() {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 保存上传图片
      saveImg(dataUrl) {
        return this.$axios.get('./static/api.json')
          .then((data) => {
            localStorage.setItem('headImg', dataUrl)
          })
          .catch((data) => {
            console.log(data)
            this.$bus.$emit('unload')
          })
      },
//      获取基本资料
      GetBasicData() {
        this.$store.dispatch("fetchBasicData", {
          id: 1
        }).then(
          response => {
            console.log(response);
            this.name = response.name;
          },
          error => {
            console.log(error);
          }
        );
      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar-main ul li.active:nth-child(1) a, .sidebar-main ul li.active .router-link-exact-active {
    color: #0b82fd;
  }

  @media screen and (min-width: 1700px) {
    .slde-wrap {
      width: 350px;
    }

    .personalCenter {
      right: 0;
    }
  }

  @media screen and (min-width: 1600px) and (max-width: 1699px) {
    .slde-wrap {
      width: 330px;
    }

    .personalCenter {
      right: 0;
    }
  }

  @media screen and (min-width: 1499px) and (max-width: 1599px) {
    .slde-wrap {
      width: 320px;
    }

    .personalCenter {
      right: 0;
      width: 180px;
    }

    .data-con {
      position: absolute;
      width: 500px;
      top: 50%;
      left: 50%;
      margin-left: -250px;
      margin-top: -170px;
      ul li {
        line-height: 60px;
      }
    }
  }

  @media screen and (min-width: 1400px) and (max-width: 1499px) {
    .slde-wrap {
      width: 310px;
    }

    .personalCenter {
      right: -15px;
    }

    .data-con {
      position: absolute;
      width: 450px;
      top: 50%;
      left: 50%;
      margin-left: -225px;
      margin-top: -150px;
      ul li {
        line-height: 55px;
      }
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1399px) {
    .slde-wrap {
      width: 290px;
    }

    .personalCenter {
      right: 0px;
    }

    .data-con {
      position: absolute;
      width: 400px;
      top: 50%;
      left: 50%;
      margin-left: -200px;
      margin-top: -150px;
      ul li {
        line-height: 50px;
      }
    }
  }

  @media screen and (max-width: 1199px) {
    .slde-wrap {
      width: 280px;
    }

    .personalCenter {
      right: -40px;
    }

    .data-con {
      position: absolute;
      width: 380px;
      top: 50%;
      left: 50%;
      margin-left: -190px;
      margin-top: -140px;
      ul li {
        line-height: 45px;
      }
    }
  }

  .slde-wrap {
    position fixed;
    top: 0;
    left: 0;
    height: 100%;
    box-sizing: border-box;
    z-index: 99;
    background #f8f9fa;
  }

  .mask {
    position fixed;
    width 100%;
    height 100%;
    top: 0;
    left: 0;
    background #fff;
    opacity 0;
    z-index 9999
  }

  .base-data {
    position fixed
    width 100%
    height 100%
  }

  .base-mask {
    position: fixed;
    width: 100%;
    height 100%;
    background: #000;
    opacity 0.5;
    z-index 9999;
  }

  .data-con {
    position: absolute;
    background #fff;
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
      padding: 20px 20px 80px 20px;
      li {
        border-bottom: 2px solid #f0f0f0;
        color: #b0b1b4;
        line-height: 60px;
      }
      .contxt {
        float: right;
        color: #313131;
      }
    }

  }

  a {
    color: #313131;
    text-decoration none
  }

  body {
    background-color: rgba(242, 242, 242, 1);
    /*font-family "Microsoft YaHei"*/
  }

  .personalCenter {
    position: absolute;
    top: 40px;
    background #fff;
    padding: 15px 0 15px 30px;
    z-index: 999999;
    width: 176px;
    box-sizing: border-box;
    box-shadow: 3px 3px 20px #e4e4e4;
    .safeOut{
      margin-top: 5px;
      padding-top: 5px;
    }

    .center-item {
      line-height: 40px;
      padding-right: 50px;
      cursor pointer
      .iconfont {
        margin-right: 10px;
      }
      span:hover {
        color #47a1fd
      }
    }
    .safeOut {
      border-top: 2px solid #f0f0f0;
    }
  }

  .personalCenter::after {
    content: "";
    position absolute
    top 28px;
    left -12px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 12px solid transparent;
  }

  .font_bold {
    font-weight bold;
    font-size 18px
  }

  .sidebar {
    float: left;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    bottom: 0;
    background: #f8f9fa;
    height: 100vh;
    box-shadow: 3px 3px 20px #e4e4e4;
    .top {
      padding: 48px 0 30px 70px;
      overflow: hidden;
      .admin {
        font-size 14px
        color: #b0b1b4
      }
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 11px;
        cursor: pointer;
      }
      span {
        display: block;
        line-height: 25px;
      }
    }
  }

  .sidebar-menu > li {
    padding: 10px 0 10px 35px;
    line-height: 40px;
    font-weight bold;
    border-left 5px solid #f6f7f8;
    font-size 18px;
    box-sizing border-box;
    cursor: pointer;
    .iconfont {
      margin-right: 8px;
    }
    .trangle {
      float: right
      margin-right: 40px;
    }
    &.active {
      background: #f5faff;
      border-left: 5px solid #0b82fd;
      box-sizing: border-box;
      > .single {
        color #0b82fd
        a {
          display block
        }
      }
    }
    .tree-menu {
      margin-left: 35px;
      li a{
        display block
      }
      &.active {
        > a {
          color #0b82fd
        }
      }
    }
  }

  .sidebar-menu li .single {
    overflow: hidden
    display: block;
    color: #313131
  }

  ul {
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    li {
      font-size: 16px;
      display: block;
    }
  }

  .icon-touxiang:before, .icon-ziliaoduibi:before, .icon-lock:before, .icon-tuichu:before {
    color #47a1fd
  }


</style>
