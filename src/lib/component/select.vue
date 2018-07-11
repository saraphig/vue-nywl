<template>
   <div class="selectBar" @click="toggle">
     <input type="text" v-model="value" class="input">
     <i class="iconfont icon1" @click.stop="toggle">&#xe654;</i>
     <ul  v-if="listShow">
         <li v-for="i in sData" @click.stop="selectVal(i)">{{i.name}}</li>
     </ul>
   </div>
</template>
<!--下拉列表组件使用说明：例如<vselect class="we" @info='info' :sData='selectData'></vselect> 先import，就可以使用。
 :sData是必传的数据，info是方法，方法里能得到id,name 如果需要修改样式，建议加class名字来改样式 ，如class="we"-->
<script>
    export default{
        name:'select',
        props:{
            sData:{
                type:Array,
                default:[],
                required:true
            }
        },
        data(){
             return{
                    value:'-.-',
                    // selectData:[
                    //     {
                    //         id:1,
                    //         name:'水产'
                    //     },
                    //     {
                    //         id:2,
                    //         name:'林业'
                    //     },
                    //     {
                    //         id:3,
                    //         name:'牧场'
                    //     }
                    // ],
                    listShow:false
             }   
        },
        methods:{
                toggle(){
                    this.listShow=!this.listShow;
                },
                selectVal(i){
                    this.value=i.name;
                    this.listShow=false;
                    this.$emit('info',i);
                }
        }
    }
</script>
<style lang="stylus" scoped>
*{
    padding 0
    margin 0
}
ul,ol,li{
    list-style none;
}
.selectBar{
    width 200px;
    height 50px;
    position relative;
    cursor pointer;
    .input{
        width 100%;
        height 100%;
        position relative
        border: 1px solid black;
        padding:0 15px;
        font-size 18px;
        box-sizing: border-box;
        cursor pointer;
    }
    .icon1{
        font-size 23px;
        position absolute;
        right 5px;
        top 16px;
        font-weight bold;
        }
    ul{
        border: 1px solid darkgray;
        max-height 150px;
        overflow auto;
         li{
            height 30px
            line-height 30px
          }
         li:hover{
             background gray 
          }    
    }
    
}
</style>
