<!--
    <vuet-ree   
              v-model="checkedIds"   ————绑定的选中数据
              :tree-data="treeData"  ————传入的数据
              :options='options'     ————配置项
    >
    </vue-tree>

    推荐配置项：     label:'actionGroupName',//显示的内容
                    depthOpen:99,//展开到第几层级
                    checkbox:true,//是否展示复选框
                    checkedIcon:'iconfont icon-icon_shipinjiankong_zengjia',//选中的iconfont
                    uncheckedIcon:"iconfont icon-yuntaikongzhi_tiaoxiao",//未选中的icofont
                    halfCheckedIcon:'iconfont icon-icon_shipinjiankong_jianxiao',//半选中的iconfont
                    idsWithParent:false//获取选中值时是否返回父级
    获取选中值————this.checkedIds

-->


<template>
  <ul class="vue-tree-list">
    <!-- <li class="treePrompt"><p v-show="chuli">拼命处理中...</p></li> -->
    <tree-item
      v-for="(item, idx) in treeDatas"
      :ids="ids"
      :ids-with-parent="idsWithParent"
      :model="item"
      :options="termOptions"
      :depth="0"
      :state="state"
      :key="idx"
      @handle="handle"
      @checkstart='activepromt'
    />
  </ul>
</template>

<script>
  import Item from './Item.vue'
  import './vue-tree.css'

  export default {
    components: { 'tree-item': Item },

    model: {
      prop: 'ids',
      event: 'change'
    },

    props: {
      treeData: {
        type: Array,
        default: function () {
          return []
        }
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      ids: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed:{
      treeDatas:function(){
        if(this.treeData!=[]){
          var kp = JSON.stringify(this.treeData);
          var kp1 = kp.replace(/menuCode/g, 'id');
          //var kp2 = kp1.replace(/actionGroupName/g, 'title');
          var kp3 = kp1.replace(/childrens/g, 'children');
          var kp4 = JSON.parse(kp3);
          console.log(kp4)
          return kp4
        }else{
          return []
        }
      }       
    },
    data () {
      return {
        chuli:false,
        defaultOptions: {
          label: 'label',
          checkbox: true,
          checkedOpen: true,
          folderBold: true,
          idsWithParent: true,
          depthOpen: 0,
          openIcon: 'fa fa-angle-right',
          closeIcon: 'fa fa-angle-down',
          halfCheckedIcon: 'fa fa-minus-square-o fa-fw',
          checkedIcon: 'fa fa-check-square-o fa-fw',
          uncheckedIcon: 'fa fa-square-o fa-fw'
        },
        termOptions: {},
        idsWithParent: [],
        state: 0
      }
    },

    created () {
      this.initOptions()
      this.idsWithParent = this.ids.slice(0)
    },

    watch: {
      options: {
        handler: function (val) {
          this.initOptions()
        },
        deep: true
      }
    },

    methods: {
      activepromt(){
        console.log(1)
        // var that = this;
        
        // if(this.chuli==false){
        //   this.chuli=true;
        //   setTimeout(function(){
        //       that.chuli=false;         
        //   },500)
        // }
        
      },
      handle (item) {
        this.$emit('handle', item)
        console.log(item)
      },
      initOptions () {
        this.termOptions = Object.assign({}, this.defaultOptions, this.options)
        this.idsWithParent = this.ids.slice(0)
      }
    }
  }
</script>


<style>
    .item-checkbox{
        text-align: center;
        line-height: 16px;
        height: 16px;
        width: 16px;
        display: inline-block;
        height: 16px!important;
        width:16px!important;
        border: 1px solid black;
        border-color: #41a259;
        color: #41a259;
        margin-right: 5px;
    }
    .unchecked{
        background-color: #ffffff;
        color: #ffffff;
    }
    .treePrompt{
        height: 20px;
    }
</style>
