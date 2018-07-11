<style scoped>
  .chart {
    width: 100%;
    height: 300px;
  }
</style>
<template>
  <div :id="echartId" class="chart"></div>
</template>

<script>
import echarts from 'echarts';
  export default {
    data() {
      return {
        
      }
    },
    props:{
      echartId:{
        type:String,
      },
      titleText:String,
      xText:String,
      yText:String,
      chartData:Array,
      echartsType:String,
      loadingState:Boolean
    },
    watch:{
      chartData(val){
        switch (this.echartsType){
          case "LineAndBar":
            drawLineAndBar(val,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
            break
          case "LineOrBar":
            drawLineOrBar(val,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
            break
          case "Line":
            drawLine(val,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
            break
          case "StepLine":
            drawStepLine(val,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
            break
          default:
            drawLine(val,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
            break
        }
      }
    },
    mounted() {
      switch (this.echartsType){
        case "LineAndBar":
          drawLineAndBar(this.chartData,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
          break
        case "LineOrBar":
          drawLineOrBar(this.chartData,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
          break
        case "Line":
          drawLine(this.chartData,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
          break
        case "StepLine":
          drawStepLine(this.chartData,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
          break
        default:
          drawLine(this.chartData,this.echartId,this.titleText,this.xText,this.yText,this.loadingState);
          break
      }
    }
  }

function drawLineAndBar(chartData,id,titleText,xText,yText,loadingState) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[1]})
    var yAxisData = chartData.map(function (item) {return item[0]})
    chart.setOption({
      
      title: {
        text: titleText,
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true}
        },
        top: 10,
        right: 40
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
       dataZoom: [{
            show: true
          }, {
            type: 'inside',
            
          }],
      xAxis: {
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: {show: false},
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [{
        name: yText,
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: yAxisData
      }, {
        name: yText,
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#14c8d4'},
                {offset: 1, color: '#43eec6'}
              ]
            )
          }
        },
        data: yAxisData
      }]
    })
  }
  function drawLineOrBar(chartData,id,titleText,xText,yText,loadingState) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[1]})
    var yAxisData = chartData.map(function (item) {return item[0]})
    if(loadingState==false){
      chart.showLoading({text:"读取数据中..."});
    }else{
      chart.hideLoading();
    }
    chart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          magicType:{show: true, type: ['line', 'bar']},
          saveAsImage: {show: true}
        },
        top: 10,
        right: 40
      },
      calculable: true,
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: yText,
          max: Math.max.apply(Math,yAxisData)
        }
      ],
       dataZoom: [{
            show: true
          }, {
            type: 'inside',
            
          }],
      series: [
        {
          name: yText,
          type: 'bar',
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          },
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: '#726dd1',
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          },
          
          data: yAxisData
        }
      ]
    })
  }
  function drawLine(chartData,id,titleText,xText,yText,loadingState) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[1]})
    var pieData = chartData.map(function (item) {return item[0]})
    if(loadingState==false){
      chart.showLoading({text:"读取数据中..."});
    }else{
      chart.hideLoading();
    }
    
    chart.setOption({
          title: {
            text: titleText
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          toolbox: {
            left: 'center',
          },
          dataZoom: [{
            show: true
          }, {
            type: 'inside'
          }],
          visualMap: {
            show: false,
            top: 10,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 200,
              color: '#096'
            }, {
              gt: 200,
              lte: 400,
              color: '#ffde33'
            }, {
              gt: 400,
              lte: 600,
              color: '#ff9933'
            }, {
              gt: 600,
              lte: 800,
              color: '#cc0033'
            }, {
              gt: 800,
              lte: 1000,
              color: '#660099'
            }, {
              gt: 1000,
              color: '#7e0023'
            }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: yText,
            type: 'line',
            data: pieData,
            markLine: {
              silent: true,
              data: [{
                yAxis: 200
              }, {
                yAxis: 400
              }, {
                yAxis: 600
              }, {
                yAxis: 800
              }, {
                yAxis: 1000
              }]
            }
          }
        })
  }

  function drawStepLine(chartData,id,titleText,xText,yText,loadingState){
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[1]})
    var stepData = chartData.map(function (item) {return item[0]})
    chart.setOption({
    title: {
        text: titleText
    },
    tooltip: {
        trigger: 'axis'
    },
   
     dataZoom: [{
            show: true
          }, {
            type: 'inside',
            
          }],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        // feature: {
        //     saveAsImage: {}
        // }
    },
    xAxis: {
        type: 'category',
        data: xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        
        {
            name:'Step Middle',
            type:'line',
            step: 'middle',
            data:stepData
        },
        
    ]
})
  }
</script>
