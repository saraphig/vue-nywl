<!-- //////////////////////////////////////////////
//  自定义图表组件 (hyl 2018-03-08)
////////////////////////////////////////////// -->

<style scoped>
.chart {
    width: 90%;
    height: 22.5rem; /*360px;*/
}
</style>
<template>
    <!-- <div class="charts"> class="chart"  :style="custom_styles" -->
        <div :id="echartId" ></div>
    <!-- </div> -->
</template>

<script>
import echarts from "echarts";
import { getDateFormat } from "@lib/js/mUtils";
import {
    drawLineAndBar,
    drawLineOrBar,
    drawLine,
    drawStepLine,
    drawTimeBar,
    drawTimeAndBar,
    drawCookiePie,
    drawRadiusBarY,
    drawLoopPie,
} from "@com/sh_echart_function.js";


export default {
    name: "sh-echart",
    props: {
        parentId: {
            type: String,
            default: ""
        },
        echartId: {
            //echartId
            type: String,
            default: "sh_echart"
        },
        titleText: {
            type: String,
            default: ""
        },
        subtitle: {
            type: String,
            default: ""
        },
        xText: {
            type: String,
            default: ""
        },
        yText: {
            type: String,
            default: ""
        },
        unit: {
            type: String,
            default: ""
        },
        chartData: {
            type: Array,
            default: function() {
                return [
                    /*[5, 5],
                    [20, 20],
                    [36, 36],
                    [10, 10],
                    [10, 10],
                    [20, 20]*/
                ];
            }
        },
        echartsType: {
            type: String,
            default: "LineAndBar" //"TimeBar" /*"LineAndBar"*/
        },
        loadingState: {
            type: Boolean
        },
        customHeight: {
            type: String,
            default: "360px"
        },
        customWidth: {
            type: String,
            default: "100%"
        },
    },
    data() {
        return {
            id: "sh_echart",
            funEchartDicts: { //调用串对应的图表选项函数字典
                LoopPie:    drawLoopPie,
                RadiusBar:  drawRadiusBarY,
                Cookie:     drawCookiePie,
                TimeBar:    drawTimeAndBar,
                LineAndBar: drawLineAndBar,
                LineOrBar:  drawLineOrBar,
                Line:       drawLine,
                StepLine:   drawStepLine,
            },
            saveEchart:{},//保存当前对象的实例
        };
    },
    computed: {
        custom_styles() {
            //echarts.resize();
            return {
                height: this.customHeight,
                width: this.customWidth,
            };
        },
        toParams() {
            return {
                objecharts: echarts,
                chartData: this.chartData,
                id: this.echartId,
                titleText: this.titleText,
                subtitle: this.subtitle,
                unit: this.unit,
                xText: this.xText,
                yText: this.yText,
                loadingState: this.loadingState
            };
        }
    },
    watch: {
        chartData(val) {
            this.resizeChartsContainer(this.echartId);
            var funCall = this.funEchartDicts[this.echartsType];
            if (typeof funCall == "function") {
                this.saveEchart = funCall.call(this,this.valParams(val));
            };
            /*switch (this.echartsType) {
                case "LoopPie":
                    drawLoopPie(this.valParams(val));
                    break;
                case "RadiusBar":
                    drawRadiusBarY(this.valParams(val));
                    break;
                case "Cookie":
                    //drawLoopPieExt(this.valParams(val));
                    drawCookiePie(this.valParams(val));
                    break;
                case "TimeBar":
                    drawTimeAndBar(this.valParams(val));
                    break;
                case "LineAndBar":
                    drawLineAndBar(this.valParams(val));
                    break;
                case "LineOrBar":
                    drawLineOrBar(this.valParams(val));
                    break;
                case "Line":
                    drawLine(this.valParams(val));
                    break;
                case "StepLine":
                    drawStepLine(this.valParams(val));
                    break;
                default:
                    this.drawLine(this.valParams(val));
                    break;
            }*/
        }
    },
    mounted() {
        //this.addLoadEvent(echarts.resize);
        //this.drawLine();
        //console.log("drawLine");
        this.resizeChartsContainer(this.echartId);
        var funCall = this.funEchartDicts[this.echartsType];
        if (typeof funCall == "function") {
             this.saveEchart = funCall.call(this,this.toParams);
        };
        /*switch (this.echartsType) {
            case "LoopPie":
                drawLoopPie(this.toParams);
                break;
            case "RadiusBar":
                drawRadiusBarY(this.toParams);
                break;
            case "Cookie":
                drawCookiePie(this.toParams);
                //drawLoopPieExt(this.toParams);
                break;
            case "TimeBar":
                drawTimeAndBar(this.toParams);
                break;
            case "LineAndBar":
                drawLineAndBar(this.toParams);
                break;
            case "LineOrBar":
                drawLineOrBar(this.toParams);
                break;
            case "Line":
                drawLine(this.toParams);
                break;
            case "StepLine":
                drawStepLine(this.toParams);
                break;
            default:
                drawLine(this.toParams);
                break;
        } */
    },
    methods: {
        valParams(val) {
            return {
                objecharts: echarts,
                chartData: val,
                id: this.echartId,
                titleText: this.titleText,
                subtitle: this.subtitle,
                unit: this.unit,
                xText: this.xText,
                yText: this.yText,
                loadingState: this.loadingState
            };
        },
        addLoadEvent(fn) {
            var old = window.onresize;
            if(typeof window.onresize != 'function'){
                window.onresize = fn;
            }else{
                window.onresize = function(){
                    old();
                    fn();
                    console.log("fn......");
                }
            }
        },
        resizeChartsContainer(e) {
            var main = document.getElementById(e);
            main.style.width = main.parentNode.clientWidth + 'px';
            main.style.height = main.parentNode.clientHeight + 'px';
        },
        chartResize() {
            this.resizeChartsContainer(this.echartId);
            if (typeof this.saveEchart.resize == "function") {
                 this.saveEchart.resize();
            } else {
                console.log(typeof  this.saveEchart.resize);                
            }
        }
    }
};
</script>
