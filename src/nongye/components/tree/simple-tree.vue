<!--
    <tree-vue
            :data="treeData"         ————数据
            ref="treevue"            ————ref名
            :checkedIds='chencklist' ————默认选中的数据
            :options='options'       ————配置项
    >
    </tree-vue>
    获取选中的值————this.$refs.treevue.checkedIds



-->



<template>
    <div class="slmpleVue">
        <simple-vue ref="tree" 
            v-model="checkedIds"
            :tree-data="treeDatas"
            :options="options"
            @handle="someActions"
        >
        </simple-vue>
    </div>
</template>

<script>
import VueTree from 'vue-simple-tree/src/components/VueTree.vue'



export default {
    name:"simple-tree",
    components:{
        'simpleVue':VueTree
    },
    props:{
        //传入的选中值，也是获取的选择项的值
        checkedIds:{
            type:Array,
            default:function(){
                return []
            }
        },
        //配置项
        options:{
            type:Object,
            default:function(){
                return {
                    label:'actionGroupName',//显示的内容
                    depthOpen:99,//展开到低级层级
                    checkbox:true,//是否展示复选框
                    checkedIcon:'iconfont icon-icon_shipinjiankong_zengjia',//选中的iconfont
                    uncheckedIcon:"iconfont icon-yuntaikongzhi_tiaoxiao",//未选中的icofont
                    halfCheckedIcon:'iconfont icon-icon_shipinjiankong_jianxiao',//半选中的iconfont
                    idsWithParent:false//获取选中值时是否返回父级
                }
            }
        },
        //展示数据
        data:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data () {
        return {
            // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
            //checkedIds: [320],
            // tree数据
            //treeData: [],
            // 设置项
            // options: {
            //     label:'actionGroupName',
            //     depthOpen:99,
            //     checkbox:true,
            //     checkedIcon:'iconfont icon-icon_shipinjiankong_zengjia',
            //     uncheckedIcon:"iconfont icon-yuntaikongzhi_tiaoxiao",
            //     halfCheckedIcon:'iconfont icon-icon_shipinjiankong_jianxiao',
            //     idsWithParent:false
            // }
        }
  },
  computed:{
      treeDatas(){
            if(this.data!=[]){
                var kp = JSON.stringify(this.data);
                var kp1 = kp.replace(/groupCode/g, 'id');
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
  mounted(){
    //   this.$store.dispatch('getRole', {
    //     }).then((data) => {
    //         this.treeData=[];
    //         var kp = JSON.stringify(data);
    //         var kp1 = kp.replace(/groupCode/g, 'id');
    //         //var kp2 = kp1.replace(/actionGroupName/g, 'title');
    //         var kp3 = kp1.replace(/childrens/g, 'children');
    //         var kp4 = JSON.parse(kp3); 

            
    //         this.treeData = kp4;
    //         console.log(kp4);
    //     })
  },
  methods:{
      //节点点击事件
      someActions(){
         // console.log(this.checkedIds)
      }
  }
}
</script>

<style>
    .slmpleVue .item-checkbox{
        text-align: center;
        line-height: 18px;
        display: inline-block;
        height: 18px!important;
        width:18px!important;
        border: 1px solid black;
    }
    .slmpleVue .unchecked{
        background-color: #ffffff;
        color: #ffffff;
    }
</style>
