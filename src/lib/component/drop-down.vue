<template>
  <div class="drop-cont" id="rightarea">
		<i class="iconfont icon-shouye_shaixuanxiangxia dropno1" @click="areashow()"></i>
	  <div class="drop-cont-input">
	  	<span v-text="homearea.name" class="drop-cont-input-span" id="right-area-input" :title="homearea.name" @click="areashow()"></span>
	  </div>
	  <ul class="drop-down" id="drop">
	  	<li v-show="allArea">
				<p>
	    		<b class="drop-downbg"></b>
	    		<span class="" @click="area('所有区域',datalist[0].areaCode,'')">所有区域</span>
	    	</p>
			</li>
	    <li v-for="(val,key) in datalist"> 
	    	<p :id="'drop-down-title'+val.id">
	    		<b class="drop-downbg"></b>
	    		<i v-if="val.childrens" class="iconfont icon-shouye_shaixuanxiangxia" :id="'areaIco'+val.id" @click="areadown(val.id)"></i>
	    		<span v-html="val.idName" :title="val.idName" @click="area(val.idName,val.areaCode,val.id)"></span>
	    	</p>
	    	<ul class="drop drop2" :id="'area'+val.id" v-if="val.childrens">
	    		<li v-for="val2 in val.childrens">
	    			<p :id="'drop-down-title'+val2.id">
	    				<b class="drop-downbg"></b>
		    			<i v-if="val2.childrens" class="iconfont icon-shouye_shaixuanxiangxia" :id="'areaIco'+val2.id" @click="areadown(val2.id)"></i>
		    			<span v-html="val2.idName" :title="val2.idName" @click="area(val2.idName,val2.areaCode,val2.id)"></span>
	    			</p>
	    			<ul class="drop drop3" :id="'area'+val2.id" v-if="val2.childrens">
			    		<li v-for="val3 in val2.childrens">
			    			<p :id="'drop-down-title'+val3.id">
			    				<b class="drop-downbg"></b>
			    				<i v-if="val3.childrens" class="iconfont icon-shouye_shaixuanxiangxia" :id="'areaIco'+val3.id" @click="areadown(val3.id)"></i>
			    				<span v-html="val3.idName" :title="val3.idName" @click="area(val3.idName,val3.areaCode,val3.id)"></span>
			    			</p>
			    			<ul class="drop drop4" :id="'area'+val3.id" v-if="val3.childrens">
					    		<li v-for="val4 in val3.childrens">
					    			<p :id="'drop-down-title'+val4.id">
					    				<b class="drop-downbg"></b>
					    				<i v-if="val4.childrens" class="iconfont icon-shouye_shaixuanxiangxia" :id="'areaIco'+val4.id" @click="areadown(val4.id)"></i>
					    				<span v-html="val4.idName" :title="val4.idName" @click="area(val4.idName,val4.areaCode,val4.id)"></span>
					    			</p>
					    			<ul class="drop drop5" :id="'area'+val4.id" v-if="val4.childrens">
							    		<li v-for="val5 in val4.childrens">
							    			<p :id="'drop-down-title'+val5.id">
							    				<b class="drop-downbg"></b>
							    				<span v-html="val5.idName" :title="val5.idName" @click="area(val5.idName,val5.areaCode,val5.id)"></span>
							    			</p>
							    		</li>
							    	</ul>
					    		</li>
					    	</ul>
			    		</li>
			    	</ul>
	    		</li>
	    	</ul>
	    </li>
	  </ul>
	</div>
</template>

<script>
	export default {
		name: 'drop-down',
		props: {
			// 数据列表
			datalist: {
				type: Array,
				default: [],
				required: true
			},
		},
		data() {
			return {
				homearea:{id:0,name:'所有区域'},
        dropShow:false,
        allArea:false,
			}
		},
		methods: {
			area(m,i,t) {
	    	this.homearea.id=i
	    	this.homearea.name=m
	    	document.getElementById("drop").style.display="none"
	    	document.getElementById('drop').classList.remove("drop1")
	    	document.getElementsByClassName("dropno1")[0].classList.remove("open")
	    	if(m=='所有区域'){
	    		this.allArea=false
	    	}else{
	    		this.allArea=true
	    	}
	    	let doc=document.getElementById('drop').getElementsByTagName("p");
	    	for(let i=0;i<doc.length;i++){
	        doc[i].classList.remove("on")
	    	}
	    	if(t!=''){
	    		document.getElementById("drop-down-title"+t).classList.add("on")
	    	}
	    	this.$emit("homearea", this.homearea);
	    },
	    areashow() {
	    	if(document.getElementsByClassName('drop1')[0] == undefined  ){
	    		document.getElementById("drop").style.display="block"
	    		document.getElementById('drop').classList.add("drop1")
	    		document.getElementsByClassName("dropno1")[0].classList.add("open")
	    	}else{
	    		document.getElementById("drop").style.display="none"
	    		document.getElementById('drop').classList.remove("drop1")
	    		document.getElementsByClassName("dropno1")[0].classList.remove("open")
	    	}
	    },
	    areadown(i) {
	    	if(document.getElementById('areaIco'+i).getAttribute('class').indexOf('open')==-1){
	    		document.getElementById('areaIco'+i).classList.add("open")
					document.getElementById('area'+i).style.display="block"
				}else{
					document.getElementById('areaIco'+i).classList.remove("open")
					document.getElementById('area'+i).style.display="none"
				}
				document.getElementsByClassName("dropno1")[0].classList.remove("open")
	    },
		},
		mounted() {
			
			var myDiv = document.getElementById("rightarea");
	    document.addEventListener("click",function(){
	    	if(document.getElementById("drop")){
          document.getElementById("drop").style.display="none"
          document.getElementById('drop').classList.remove("drop1");
          document.getElementsByClassName("dropno1")[0].classList.remove("open")
	     }
	    });
	    myDiv.addEventListener("click",function(event){
	        event=event||window.event;
	        event.stopPropagation();
	    });

		},
		watch: {
			
			
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 /*开始*/
ul,li{
	list-style: none;
	margin: 0;
	padding: 0;
}
.drop-cont{
	position: relative;
	float: right;
	width: 235px;
	>i{
		position: absolute;
    top: 19px;
    right: 12px;
    font-size: 12px;
    color: #c9cfda;
    transform: rotate(-90deg);
    transition: all 0.2s;
	}
	.open{
  	transform: rotate(0deg);
  }
	.drop-cont-input{
		width: 100%;
    height: 50px;
    text-indent: 10px;
    line-height: 46px;
    border-radius: 4px;
    font-size: 18px;
    border: solid 2px #c9cfda;
    box-sizing: border-box;
    cursor: pointer;
    background: none;
    .drop-cont-input-span{
    	display: block;
	    width: 194px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    font-weight: bold;
    }
	}
	.drop-down{
		position: absolute;
    top: 50px;
    line-height: 46px;
    border: 2px solid #c9cfda;
    border-radius: 4px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    z-index: 999;
    max-height: 480px;
    overflow-y: auto;
    overflow-x: hidden;
    display: none;
    .drop{
    	display: none;
    }
    li{
    	position: relative;
	    box-sizing: border-box;
	    p{
	    	padding-right: 5px;
	    	margin: 0;
	    	b{
	    		display: block;
	    		width: 231px;
	    		height: 34px;
	    		position: absolute;
	    		left: 0px;
	    		z-index: -1;
	    	}
	    	i{
		    	position: absolute;
			    left: 0;
			    top: 0;
		    	padding: 0 3px 0 6px;
		    	font-size: 12px;
		    	line-height: 34px;
		    	cursor: pointer;
		    	transform: rotate(-90deg);
    			transition: all 0.2s;
		    }
		    .open{
		    	transform: rotate(0deg);
		    }
		    span{
			    display: block;
			    line-height: 34px;
			    font-size: 16px;
			    cursor: pointer;
			    text-indent: 28px;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
		    }
	    }
	    .on{
	    	color: #3cd2dc;
	    }
	    ul{
	    	padding-left: 8px;
	    	b{
	    		left: -8px;
	    	}
	    	ul{
	    		padding-left: 8px;
	    		b{
	    			left: -16px;
	    		}
	    		ul{
		    		padding-left: 8px;
		    		b{
		    			left: -24px;
		    		}
		    		ul{
			    		padding-left: 8px;
			    		b{
			    			left: -32px;
			    		}
			    	}
		    	}
	    	}
	    }
    }
    
	}
	
}

@media screen and (min-width: 1600px) and (max-width: 1699px) {
 	.drop-cont-input-span{
 		font-size: 16px;
 	}
}

.drop-down p:hover .drop-downbg{
	background: #e1fdfe;
}


  .monitor .drop-cont{
    float : none;
    left : 60px;
    margin-bottom : 30px;
    width : 300px;
    height : 54px;
  }
.monitor .drop-cont b{
	width:300px!important;
  }
  .monitor .drop-cont>i{
      top : 20px;
      right : 24px;
  }
  .monitor .drop-cont .drop-cont-input-span{
    width : 296px;
	text-indent :24px;
	font-weight :bold;
	font-size : 18px;
  }
  .monitor .regionalSelection .open{
		transform: rotate(0deg)!important;
  }
  .monitor .activeBox .open{
		transform: rotate(0deg)!important;
  }
/*结束*/
</style>
