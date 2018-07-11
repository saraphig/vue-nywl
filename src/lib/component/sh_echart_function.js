
// import {
//     Sample_chart_data
// } from "@nongye/views/page_monitor/sample_data.js";
import { getDateFormat } from "@lib/js/mUtils";

//---------------------------------------------------------------------------------------------------------------------
//农业首页环状图
export function drawLoopPie(InParam) {
    let chart = InParam.objecharts.init(document.getElementById(InParam.id));

    //console.log("drawLoopPie 环状图");
    //console.log(InParam.chartData);//

    let data = [12, 33, 22], item_name = [],
        item_data = [],
        allCount = 0,
        tmpitem = 0;
    item_name = InParam.chartData.map(function(item) {
            return item.name;
    });
    data = InParam.chartData.map(function(item) {
            return item.value;
    });
    for (let i = 0; i < data.length; i++) {
        allCount += data[i];
    }
    //console.log(allCount);
    for (let i = 0; i < data.length; i++) {
        tmpitem = Math.round(data[i] * 100 / allCount);
        item_data.push(tmpitem);
        //console.log(tmpitem);
    }

    chart.setOption({
        title: {
            show: false,
            text: "",
            subtext: "",
            sublink: "",
            x: "center",
            y: "center",
            itemGap: 20,
            textStyle: {
                color: "rgba(30,144,255,0.8)",
                fontFamily: "微软雅黑",
                fontSize: 35,
                fontWeight: "bolder"
            }
        },
        tooltip: {
            show: true,
            //formatter: "{b} ({d}%)"
            formatter: function (params) {
                if (params.name !="invisible") {
                    //console.log(params);
                    let strtmp = params.name + " (" + params.value + "%)";
                    return strtmp;
                }
                /*if (strtmp.indexOf(".") >= 0) {
                    strtmp = strtmp.substr(0,strtmp.indexOf(".") + 3);
                }
                let res = params[0].value[0].substr(5) + "<br />" + strtmp;*/
            }
        },
        legend: {
            show: false,
            orient: "vertical",
            x: 420,
            y: 145,
            itemGap: 12,
            data:InParam.chartData // ["主机 12", "传感器 33", "控制器 22"]
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: false }
            }
        },
        series: [
            {
                name: item_name[2],
                type: "pie",
                clockWise: false,
                radius: [118, 134],
                center: ["30%", "50%"],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                data: [
                    {
                        value: 100 - item_data[2],
                        name: "invisible",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: "#f5f6fa",
                            }
                        }
                    },
                    {
                        value: item_data[2],
                        name: item_name[2] + " " + data[2],
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        //itemStyle : placeHolderStyle
                        itemStyle: {
                            normal: {
                                color: "#0e81fe",
                            }
                        }
                    }
                ]
            },
            {
                name: item_name[1],
                type: "pie",
                clockWise: false,
                radius: [86, 102],
                center: ["30%", "50%"],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                data: [
                    {
                        value: 100 - item_data[1],
                        name: "invisible",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: "#f5f6fa",
                            }
                        }
                    },
                    {
                        value: item_data[1],
                        name: item_name[1] + " " + data[1],
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: "#67d303",
                            }
                        }
                        //itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name: item_name[0],
                type: "pie",
                clockWise: false,
                radius: [54, 70], //内半径外半径
                center: ["30%", "50%"], //圆心所在位置
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                data: [
                    {
                        value: 100 - item_data[0],
                        name: "invisible",
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },

                        itemStyle: {
                            normal: {
                                color: "#f5f6fa" //环颜色
                            }
                        }
                    },
                    {
                        value: item_data[0],
                        name: item_name[0] + " " + data[0],
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: "#ffc30d" //环颜色
                            }
                        }
                        //itemStyle : placeHolderStyle
                    }
                ]
                // itemStyle: {
                //     //柱形图圆角，鼠标移上去效果
                //     emphasis: {
                //         barBorderRadius: [0,10, 10, 0]
                //     },
                //     normal: {
                //         color:"#0b82fd",
                //         //柱形图圆角，初始化效果
                //         barBorderRadius:[0, 10, 10, 0],
                //     }
                // }
            }
        ]
        //color: ["#66d202", "#0b82fd", "#ffc30d", "#feb600"]
    });
    window.onresize = chart.resize;
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
//农业首页向右条形图
export function drawRadiusBarY(InParam) {

    console.log("drawRadiusBarY 向右条形图");
    console.log(InParam.chartData);

    let chart = InParam.objecharts.init(document.getElementById(InParam.id));
    // let data = [
    //     { name:"水温传感器",value:"11" },
    //     { name:"PH值传感器",value:"34" },
    //     { name:"溶氧量传感器",value:"67" },
    //     { name:"氨氮量传感器",value:"8" },
    //     { name:"水位传感器",value:"29" },
    //     { name:"浊度传感器",value:"71" },
    //     { name:"风机",value:"120" },
    //     { name:"增氧泵",value:"45" },
    //     { name:"自动天窗",value:"81" },
    //     { name:"水口电磁阀",value:"95" },
    //     { name:"检测灯",value:"111" },
    // ];
    let labels = [], values = [];
    labels = InParam.chartData.map(function(item) {
         return item.name;
    });
    values = InParam.chartData.map(function(item) {
        return (item.value * 100).toFixed(2);
   });

    //console.log(labels);
    //console.log(values);

    chart.setOption({
        grid:{
          x:120,
        },
        title: {
            text: "",
            subtext: ""
        },
        tooltip: {
            trigger: "axis",
            formatter: "告警设备占比<br/>{b} \n {c}%",
            axisPointer: {
                type: 'none',
            }
        },
        legend: {
            show: false,
            //data: ["2011年", "2012年"]
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: false }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: "value",
                boundaryGap: [0, 0.01],
                splitLine:{
                    show:false
                }
            }
        ],
        yAxis: [
            {
                type: "category",
                data: labels
                /*[
                    "PH值传感器",
                    "印尼传感器",
                    "美国传感器",
                    "印度传感器",
                    "中国传感器",
                    "世界人口(万)"
                ]*/
            }
        ],
        series: [
            {
                name: "2011年",
                type: "bar",
                barWidth: 15,
                data:values,// [18203, 23489, 29034, 104970, 131744, 630230],
                itemStyle: {
                    //柱形图圆角，鼠标移上去效果
                    emphasis: {
                        barBorderRadius: [0, 10, 10, 0]
                    },
                    normal: {
                        color: "#0b82fd",
                        //柱形图圆角，初始化效果
                        barBorderRadius: [0, 10, 10, 0],
                        label: {
                            show: true,
                            position: "right",
                            formatter: "{c}%",
                            //position: "inner", //outer',
                            textStyle: {
                                color: "#313131",
                                fontSize: 15
                                //align: "left",
                                //baseline: "top"
                            }
                        }
                    }
                }
            }
        ]
    });
    chart.resize();
    return chart;
}

//---------------------------------------------------------------------------------------------------------------------
//农业首页饼图
export function drawCookiePie(InParam) {
    let chart = InParam.objecharts.init(document.getElementById(InParam.id));

    //console.log("drawCookiePie 饼图");
    //console.log(InParam.chartData);

    chart.setOption({
        grid: {
            //显示区域大小和位置
            //x: 0,
            //y: 20,
            //height: 325,
            //right: 20,
             //left:0
        },
        title: {
            text: "",
            subtext: "",
            x: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: "vertical",
            x: "left"
            //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            // data:['一般告警','重要告警','紧急告警']
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ["pie", "funnel"],
                    option: {
                        funnel: {
                            x: "25%",
                            width: "50%",
                            funnelAlign: "left",
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: false }
            }
        },
        calculable: true,
        series: [
            {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["45%", "50%"],
                data: InParam.chartData,
                /*[
                    { value: 30, name: "一般告警" },
                    { value: 12, name: "重要告警" },
                    { value: 6, name: "紧急告警" }
                ],*/
                //roseType: "area",//
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n\n{c}次",
                            textStyle: {
                                color: "#313131",
                                fontSize: 18
                            }
                        },
                        labelLine: {
                            show: true,
                            length: 36,
                            lineStyle: {
                                color: "#d6dae2"
                            }
                        },
                        // color: "#c23531",
                        shadowBlur: 20,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ],
        color: ["#0b81fa", "#ffc30d", "#f85158"]
    });
    chart.resize();
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
//农业监控曲线图
export function drawTimeAndBar_new(InParam) {
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    let data = [],item = {},xdata=[],ydata=[],anchor=[];
    console.log("drawTimeAndBar--");
    console.log(InParam.chartData);
    let tmpsave = "";
    data = InParam.chartData.map(function(item) {
        let tmpnum = item.filed;
        let tmpval = item.updateTime.substr(5,5) + " " + item.updateTime.substr(12,5);
            //tmpval = tmpval.replace(/ /, "\n");
        // if (tmpsave != tmpval) {
        //     tmpsave = tmpval
            //return [ tmpval, item.filed ];//2018-05-07 19:18:06
            return item.filed;//2018-05-07 19:18:06
        // };
    });
    xdata = InParam.chartData.map(function(item) {
        let tmpval = item.updateTime.substr(5,5) + "\n" + item.updateTime.substr(11,5);
        //tmpval = tmpval.replace(/ /, "\n");
        // if (tmpsave != tmpval) {
        //     tmpsave = tmpval
            return tmpval;
        // };
    });
    anchor = [
        xdata[0].substr(0,5) + "\n00:00:00",
        xdata[xdata.length - 1].substr(0,5) + "\n00:00:00",
    ];
    ydata = InParam.chartData.map(function(item) {
        return item.filed;
    });
    console.log(anchor);

    //console.log("xdata");
    //console.log(xdata);
   // console.log(ydata);

    chart.setOption({
        noDataLoadingOption: {
            text: "暂无监测数据",
            textStyle: {
                fontSize: "36px",
                fontFamily: "Microsoft YaHei",
                fontWeight: "bolder"
            }
        },
        title: {
            show:false,
            left:'left',
            text: InParam.titleText, //主标题
            subtext: "",//InParam.subtitle //子标题
        },
        grid: {
            //显示区域大小和位置
            x: 18,
            x2: 0,
            y: 0,
            height: 320,
            right: 22,
            left: 28,
            top: 10,
            bottom:30,
        },
        tooltip: {
            trigger: "axis", //触发类型 axis
            backgroundColor: "rgba(92,92,92,0.7)",
            borderColor: "#ccc",
            borderRadius: 4,
            borderWidth: 1,
            axisPointer: {
                //坐标轴指示器
                type: "line",
                lineStyle: {
                    color: "#ccc"
                },
                label: {
                    show: false,
                    backgroundColor: "#ccc"
                }
            },
            textStyle: {
                color: "#000000",
                align: 'left',
            },
            formatter: function (params) {
                //console.log("formatter");
                //console.log(params);
                let value = params[0].value + "";
                let date = params[0].axisValue + "";
                //let date = params[0].value[0] + "";
                //console.log(date);
                if (date.indexOf(".") >= 0) {
                    date = date.substr(0,date.indexOf("."));
                }   
                if (value.indexOf(".") >= 0) {
                    value = value.substr(0,value.indexOf(".") + 3);
                }
                 let res = date + "<br />" + InParam.titleText + ":" + value + InParam.subtitle;
                return res;
            }
            //formatter: "{b} : {c}"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',//'time',//'category',
                boundaryGap : false,
                inverse:true,
                min:xdata[0],
                max:xdata[xdata.length - 1],
               // splitNumber:15,
              //  minInterval:1,
                axisLabel:{
                    //interval:'auto', //间隔个数（前后有10个数据）
                    interval:8, //间隔个数（前后有10个数据）
                //     formatter: function (value, index) {
                //         value = value.replace(/ /, "\n");
                //         return value; 
                //     }
                },
                data : xdata,
            }
        ],
        yAxis : [
            {
                type : 'value',
                data : ydata
            }
        ],
        series : [
            {
                name:'',
                type:'line',
                smooth: true,
                showAllSymbol: true,
                symbolSize: 5,
                symbol: "emptyCircle",
                itemStyle: {
                    normal: {
                        color: "#0b81fc",
                        lineStyle: { color: "#0b81fc", width: 3 },
                        //areaStyle: { color: "#e7f3ff", type: "default" }
                    },
                    borderColor: "#0b81fc",
                    borderWidth: 0,
                },
                stack: '',
                data:data
            },
            {
                name:'.anchor',
                type:'line', 
                showSymbol:false, 
                data:anchor,
                //itemStyle:{normal:{opacity:0}}, //透明不显示
                //lineStyle:{normal:{opacity:0}}
            }
        ]
    });
    
    chart.resize();
    return chart;
}
    //---------------------------------------------------------------------------------------------------------------------
//农业监控曲线图
export function drawTimeAndBar(InParam) {
    // echarts,chartData, id, titleText, xText, yText, loadingState
    //console.log("InParam.chartData...");
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    /*var xAxisData = InParam.chartData.map(function(item) {
        return item[0];
    });
    //var xAxisData = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];//[5, 20, 36, 10, 10, 10, 10, 10, 20];
    console.log("xAxisData");
    console.log(xAxisData);
    var yAxisData = InParam.chartData.map(function(item) {
        return item[1];
    });
    //var yAxisData = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];//[5, 20, 36, 10, 10, 10, 10, 10, 20];
    console.log("yAxisData");
    console.log(yAxisData);*/

    let data = [],
        item = {};

    console.log("drawTimeAndBar");
    console.log(InParam.chartData);
    let maxVal = 0;
        
    data = InParam.chartData.map(function(item) {
        // if (item[0].indexOf("-") >= 0 || item[0].indexOf("/") >= 0) {
        //     return { name: item[0], value: item };
        // } else {
        //     return { name: item[1], value: [item[1], item[0]] };
        // }
        //console.log(item.updateTime);
        
        let TmpTime = item.updateTime.substr(0,10) + " " + item.updateTime.substr(11,8);
        let TmpVal = item.filed + "";
        if (TmpVal.indexOf(".") > -1) {
            TmpVal = TmpVal.substr(0,TmpVal.indexOf(".") + 3); //保留小数点后面2位
        }
        let tmpInt = Math.round(TmpVal).toString().length;//maxVal.toString().length
        if (tmpInt > maxVal) maxVal = tmpInt;
        //let TmdTime = item.updateTime.substr(0,10) + " " + item.updateTime.substr(11,2) + ":00:00";        
        return { name: TmpTime, value: [ TmpTime, TmpVal ] };
    });
    
    //console.log("InParam.chartData...");
    //console.log(data);

    function isArray(obj) {
        //判断是否为数组
        //console.log(Object.prototype.toString.call(obj));
        return Object.prototype.toString.call(obj) == "[object Array]";
    }
    if (!isArray(InParam.chartData)) {
        console.log("isArray...");
    }

    let Length = InParam.chartData.length;
    let anchor = [],
        temp = [];
        item = {};

    /*for (let i = 0; i < data.length; i ++) {
        let tmpval = (data[i].name.substr(0,13) + ":00:00");
        if (tmpval != anchor[anchor.length - 1]) {
            anchor.push(tmpval);
        };
    };
    anchor[anchor.length - 1] = data[data.length - 1].name;*/
    //console.log(anchor);

    if (Length > 0) {
        let temp = InParam.chartData[0];

        let TmpMinTime = temp.updateTime.substr(0,10) + " " + temp.updateTime.substr(11,2) + ":00:00";
        //item.name = TmpMinTime;
        //item.value = [ TmpstartTime ]; //, temp.filed
        //console.log(TmpMinTime);

        temp = InParam.chartData[Length - 1];
        //console.log(temp);
        let TmpMaxTime = temp.updateTime.substr(0,10) + " "+ temp.updateTime.substr(11,8) + ""
        //if (TmpMaxTime < temp)
        //item.name = temp;
        //item.value = [ TmpendTime ]; //, temp.filed //Length

        let minTime = new Date(TmpMinTime.replace(/-/g,"/")).getTime();//格式 2018/05/15
        let maxTime = new Date(TmpMaxTime.replace(/-/g,"/")).getTime();
        console.log(TmpMinTime + " < " + TmpMaxTime);

        let timestep = 2 * 60 * 60 * 1000;
        let timesubn = maxTime - minTime;
        //console.log(minTime + " < " + maxTime);
        let strTime = TmpMinTime;
        let splitCount = 6;
        //anchor.push(strTime);
        // if (timesubn > timestep) {
            for (let timevar = minTime; timevar < maxTime; timevar +=  timestep) { //递增2小时
                strTime = getDateFormat("yyyy-mm-dd hh:nn:ss",new Date(timevar));
                //console.log(strTime);
                if (timevar < maxTime) {
                    anchor.push(strTime);
                    //console.log(strTime);
                };//end if
            };//end for
        // } else if (timesubn > timestep) {

        // };
        anchor.push(TmpMaxTime);
        

        //console.log(TmpMaxTime);
        //填充不足的数据
        let aCount = 6;
        console.log(anchor.length);
        console.log(anchor);

        if (anchor.length < aCount) {
            let tmpval = anchor[anchor.length - 1];
            let tmplate = tmpval.substr(0,13) + ":00:00";
            anchor[anchor.length - 1] = tmplate; 
            let tmplen = (aCount - anchor.length);
                console.log(tmplen);
                for (let i = 0; i < tmplen; i ++) {
                anchor.push(tmplate);
                console.log(i + ":" + tmplate);
            };//end for
            anchor[anchor.length - 1] = tmpval;
        }

        console.log("anchor");
        console.log(anchor);
        
        //console.log(maxVal);
        maxVal = (maxVal <= 1? 32 : (maxVal + 2) * 8);//计算Y轴坐标数字显示宽度
        //console.log(maxVal);
/*
        if (temp[0].indexOf("-") >= 0 || temp[0].indexOf("/") >= 0) {
            item.name = temp[0];
            item.value = temp;
            anchor.push(item);

            temp = InParam.chartData[Length - 1];
            item.name = temp[0];
            item.value = temp;
            anchor.push(item);
        } else {
            item.name = temp[1];
            item.value = [temp[1], temp[0]];
            anchor.push(item);

            temp = InParam.chartData[Length - 1];
            item.name = temp[1];
            item.value = [temp[1], temp[0]];
            anchor.push(item);
        }*/
    };//end if


    chart.setOption({
        noDataLoadingOption: {
            text: "暂无监测数据",
            textStyle: {
                fontSize: "36px",
                fontFamily: "Microsoft YaHei",
                fontWeight: "bolder"
            }
        },
        title: {
            show:false,
            text: InParam.titleText, //主标题
            subtext: "",//InParam.subtitle //子标题
        },
        grid: {
            //显示区域大小和位置
            x: 18,
            x2: 0,
            y: 0,
            height: 320,
            right: 22,
            left: maxVal, //(maxVal > 999?48:32),
            top: 10,
            bottom:30,
        },
        tooltip: {
            trigger: "axis", //触发类型 axis
            backgroundColor: "rgba(92,92,92,0.7)",
            borderColor: "#ccc",
            borderRadius: 4,
            borderWidth: 1,
            axisPointer: {
                //坐标轴指示器
                type: "line",
                lineStyle: {
                    color: "#ccc"
                },
                label: {
                    show: true,
                    backgroundColor: "#ccc"
                }
            },
            textStyle: {
                color: "#000000",
                align: 'left',
            },
            formatter: function (params) {
                //console.log("formatter");
                //console.log(params);
                let date = params[0].value[0];
                //console.log(date);
                if (date.indexOf(".") >= 0) {
                    date = date.substr(0,date.indexOf("."));
                }
                let res = date + "<br />" + InParam.titleText + ":" + params[0].value[1] + InParam.unit;
                return res;
            }
            //formatter: "{b} : {c}"
        },
        toolbox: {
            feature: {
                saveAsImage: { show: false }
            },
            top: 10,
            right: 40
        },
        legend: {
            data: ["line", "bar"],
            textStyle: {
                color: "#ccc"
            }
        },
        // dataZoom: [
        //     {
        //         show: false
        //     },
        //     {
        //         type: "inside"
        //     }
        // ],
        xAxis: {
            type: "time",
            boundaryGap: false,
            //minInterval: 1,
            //maxInterval: 3600 * 24 * 1000,
            //interval:2,
            inverse:false,
            splitNumber:anchor.length - 1,
            min:anchor[0],
            max:anchor[anchor.length - 1],
            data: anchor,//data,
            axisLine: {
                lineStyle: {
                    color: "#ccc" //f2f2f2
                }
            },
            axisLabel:{
                interval:function (index,data) { //"auto"
                    console.log("######" + index +","+ data);
                    return true;//true
                }, ///间隔个数
                //interval:'auto', //间隔个数（前后有10个数据）= anchor.length / 10;
                //interval:8, //间隔个数（前后有10个数据）
                formatter: function (value, index) {
                    //value = value.replace(/ /, "\n");
                    //console.log("#####value####");
                    //console.log(index + ":" + anchor[index]); 
                    let resval = "";                   
                    if (anchor[index] != undefined && typeof(anchor[index]) == "string") {
                        resval = anchor[index].substr(11,5) +"\n"+ anchor[index].substr(5,5);
                        // if (index == anchor.length - 1) {
                        //     anchor.push(anchor[index]);
                        //     resval = anchor[index].substr(11,5) +"\n"+ anchor[index].substr(5,2) + ":00";
                        //     anchor[index] = resval;
                        //     console.log(index + ":" + resval);
                        // }
                    } else {
                        //console.log(index + ":" + resval);
                    }
                    return resval;
                },
                textStyle: {
                    color: "#aaa"
                }
            },
            splitLine:{                 //坐标轴在 grid 区域中的分隔线。
                show:true,              //是否显示分隔线。默认数值轴显示，类目轴不显示。
                //interval:"auto",        //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                interval:function (index,data) { //"auto"
                    console.log("######" + index +","+ data);
                    return true;//true
                }, ///间隔个数
                lineStyle:{
                    color: "#ccc"
                }
            },
            splitArea:{                 //坐标轴在 grid 区域中的分隔区域，默认不显示。
                interval:"auto",
                show:false,             //是否显示分隔区域
                areaStyle:{
                    color: "#ccc"
                }
            },
        },
        yAxis: {
            position: "left",
            splitLine: { show: true },
            axisLine: {
                lineStyle: {
                    color: "#ccc"
                },
            },
            axisLabel:{
                style : {
                    color: "#aaa"
                },
                textStyle: {
                    color: "#aaa"
                }
            },
            splitLine:{                 //坐标轴在 grid 区域中的分隔线。
                show:true,              //是否显示分隔线。默认数值轴显示，类目轴不显示。
                interval:"auto",        //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
                lineStyle:{
                    color: "#ccc"
                }
            },
            splitArea:{                 //坐标轴在 grid 区域中的分隔区域，默认不显示。
                interval:"auto",
                show:false,             //是否显示分隔区域
                areaStyle:{
                    color: "#ccc"
                }
            },
        },
        calculable: true,
        series: [
            {
                name: InParam.yText,
                type: "line",
                smooth: true,
                showAllSymbol: true,
                symbolSize: 5,
                symbol: "emptyCircle",
                itemStyle: {
                    normal: {
                        color: "#0b81fc",//
                        lineStyle: { color: "#0b81fc", width: 3 },
                        //areaStyle: { color: "#e7f3ff", type: "default" }
                    },
                    borderColor: "#0b81fc",
                    borderWidth: 0,
                    //emphasis:{color:"#ccff00",areaStyle: {color:"#0000ff", type: 'default'}}
                },
                // lineStyle:{
                //     normal:{
                //         color:"#333",
                //     },
                // },
                data: data
            },
            /*{
                name: InParam.yText,
                type: "bar",
                barWidth: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new InParam.objecharts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#cccccc" }, //14c8d4
                                { offset: 1, color: "#cccccc" } //43eec6
                            ]
                        )
                    }
                },
                data: data
            }*/
        ]
    });
    chart.resize();
    return chart;
}

//---------------------------------------------------------------------------------------------------------------------

export function drawTimeBar(InParam) {
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    let data = [],
        item = {};
    console.log("drawTimeBar");
    console.log(InParam.chartData);
    data = InParam.chartData.map(function(item) {
        if (item[0].indexOf("-") >= 0 || item[0].indexOf("/") >= 0) {
            return { name: item[0], value: item };
        } else {
            return { name: item[1], value: [item[1], item[0]] };
        }
    });
    let Length = InParam.chartData.length;
    var anchor = [],
        temp = [];
    item = {};
    temp = InParam.chartData[0];
    if (temp[0].indexOf("-") >= 0 || temp[0].indexOf("/") >= 0) {
        item.name = temp[0];
        item.value = temp;
        anchor.push(item);

        temp = InParam.chartData[Length - 1];
        item.name = temp[0];
        item.value = temp;
        anchor.push(item);
    } else {
        item.name = temp[1];
        item.value = [temp[1], temp[0]];
        anchor.push(item);

        temp = InParam.chartData[Length - 1];
        item.name = temp[1];
        item.value = [temp[1], temp[0]];
        anchor.push(item);
    }
    //console.log(anchor);

    // for (let i = 0; i < InParam.chartData.length; i ++) {
    //     item.name = InParam.chartData[i]
    // }
    // InParam.chartData;
    
    data = [
        {
            name: "2018-03-14 09:28:26.0",
            value: ["2018-03-14 09:28:26.0", 220]
        },
        {
            name: "2018-03-14 09:29:26.0",
            value: ["2018-03-14 09:29:26.0", 182]
        },
        {
            name: "2018-03-14 09:32:26.0",
            value: ["2018-03-14 09:32:26.0", 191]
        },
        {
            name: "2018-03-14 09:48:26.0",
            value: ["2018-03-14 09:48:26.0", 234]
        },
        {
            name: "2018-03-14 09:51:26.0",
            value: ["2018-03-14 09:51:26.0", 290]
        },
        {
            name: "2018-03-14 09:57:26.0",
            value: ["2018-03-14 09:57:26.0", 330]
        },
        {
            name: "2018-03-14 10:03:26.0",
            value: ["2018-03-14 10:03:26.0", 310]
        },
        {
            name: "2018-03-14 10:07:26.0",
            value: ["2018-03-14 10:07:26.0", 123]
        },
        {
            name: "2018-03-14 10:11:26.0",
            value: ["2018-03-14 10:11:26.0", 442]
        },
        {
            name: "2018-03-14 10:13:26.0",
            value: ["2018-03-14 10:13:26.0", 321]
        },
        { name: "2018-03-14 10:15:26.0", value: ["2018-03-14 10:15:26.0", 90] },
        {
            name: "2018-03-14 10:17:26.0",
            value: ["2018-03-14 10:17:26.0", 149]
        },
        {
            name: "2018-03-14 10:20:26.0",
            value: ["2018-03-14 10:20:26.0", 210]
        },
        {
            name: "2018-03-14 10:22:26.0",
            value: ["2018-03-14 10:22:26.0", 122]
        },
        {
            name: "2018-03-14 10:25:26.0",
            value: ["2018-03-14 10:25:26.0", 133]
        },
        {
            name: "2018-03-14 10:27:26.0",
            value: ["2018-03-14 10:27:26.0", 334]
        },
        {
            name: "2018-03-14 10:29:26.0",
            value: ["2018-03-14 10:29:26.0", 198]
        },
        {
            name: "2018-03-14 10:31:26.0",
            value: ["2018-03-14 10:31:26.0", 123]
        },
        {
            name: "2018-03-14 10:33:26.0",
            value: ["2018-03-14 10:33:26.0", 125]
        },
        { name: "2018-03-14 10:36:26.0", value: ["2018-03-14 10:36:26.0", 220] }
    ];
    /*var anchor = [
        { name: "2018-03-14 09:28:26.0", value: ["2018-03-14 09:28:26.0", 0] },
        { name: "2018-03-14 10:36:26.0", value: ["2018-03-14 10:36:26.00", 0] }
    ];*/

    chart.setOption({
        noDataLoadingOption: {
            text: "暂无监测数据",
            textStyle: {
                fontSize: "36px",
                fontFamily: "Microsoft YaHei",
                fontWeight: "bolder"
            }
        },
        title: {
            show: false,
            text: "",//InParam.titleText, //主标题
            subtext: "",//InParam.subtitle //子标题
        },
        grid: {
            //显示区域大小和位置
            x: 0,
            x2: 0,
            y: 0,
            height: 325,
            right: 22
        },
        tooltip: {//###############################################
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderColor: "#ccc",
            borderRadius: 4,
            borderWidth: 1,
            axisPointer: {
                //坐标轴指示器
                type: "line",
                lineStyle: {
                    color: "#ccc"
                },
                label: {
                    show: true,
                    backgroundColor: "#ccc"
                }
            },
            textStyle: {
                color: "#000000"
            },
            formatter: function (params) {
                console.log(params);
                //     if (params.name !="invisible") {
                //     console.log(params);
                //     let strtmp = params.name + " (" + params.value + "%)";
                //     return strtmp;
                // }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: { show: false }
            },
            top: 10,
            right: 40
        },
        legend: {
            data: ["line", "bar"],
            textStyle: {
                color: "#ccc"
            }
        },
        dataZoom: [
            {
                show: false
            },
            {
                type: "inside"
            }
        ],
        // axis:{
        //     show:true,
        //     axisLabel:{
        //         formatter:function(value) {
        //             console.log("formatter");
        //             console.log(params);
        //             //     params = params[0];
        //             return ("星期" + "日一二三四五六".charAt(value))
        //         }
        //     }
        // },
        xAxis: {
            type: "time",
            boundaryGap: false,
            // splitLine: {
            //     show: false
            // },
            axisLine: {
                lineStyle: {
                    color: "#000000"
                }
            }
        },
        yAxis: {
            type: "value",
            position: "left",
            splitLine: { show: true },
            axisLine: {
                symbol: "none",
                lineStyle: {
                    color: "#000000"
                }
            }
            // boundaryGap: [0, "100%"],
            // splitLine: {
            //     show: false
            // }
        },
        //calculable: true,
        series: [
            {
                name: InParam.yText,
                type: "line",
                // showSymbol: false,
                // hoverAnimation: false,
                smooth: true,
                showAllSymbol: true,
                symbolSize: 5,
                symbol: "emptyCircle",
                itemStyle: {
                    normal: {
                        color: "#0b81fc",
                        lineStyle: { color: "#0b81fc", width: 3 },
                        areaStyle: { color: "#e7f3ff", type: "default" }
                    },
                    borderColor: "#0b81fc"
                    //emphasis:{color:"#ccff00",areaStyle: {color:"#0000ff", type: 'default'}}
                },
                data: data
            },
            {
                name: InParam.yText,
                type: "bar",
                barWidth: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new InParam.objecharts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#0b81fc" }, //14c8d4
                                { offset: 1, color: "#0b81fc" } //43eec6
                            ]
                        )
                    }
                },
                // type: "line",
                // showSymbol: false,
                data: anchor
                // itemStyle: { normal: { opacity: 0 } },
                // lineStyle: { normal: { opacity: 0 } }
            }
        ]
    });
    //chart.setOption({});
    chart.resize();
    return chart;
}

//---------------------------------------------------------------------------------------------------------------------
export function drawLineAndBar(InParam) {
    // echarts,chartData, id, titleText, xText, yText, loadingState
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    var xAxisData = InParam.chartData.map(function(item) {
        return item[0];
    });
    var xAxisData = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220
    ]; //[5, 20, 36, 10, 10, 10, 10, 10, 20];
    console.log("xAxisData");
    console.log(xAxisData);
    var yAxisData = InParam.chartData.map(function(item) {
        return item[1];
    });
    var yAxisData = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220
    ]; //[5, 20, 36, 10, 10, 10, 10, 10, 20];
    console.log("yAxisData");
    console.log(yAxisData);
    chart.setOption({
        noDataLoadingOption: {
            text: "暂无监测数据",
            textStyle: {
                fontSize: "36px",
                fontFamily: "Microsoft YaHei",
                fontWeight: "bolder"
            }
        },
        title: {
            text: InParam.titleText, //主标题
            subtext: InParam.subtitle //子标题
        },
        grid: {
            x: 0,
            x2: 0,
            y: 0,
            height: 330
        },
        tooltip: {
            trigger: "axis", //触发类型 axis
            backgroundColor: "rgba(255,255,255,0.7)",
            borderColor: "#ccc",
            borderRadius: 4,
            borderWidth: 1,
            axisPointer: {
                //坐标轴指示器
                type: "line",
                lineStyle: {
                    color: "#ccc"
                },
                label: {
                    show: true,
                    backgroundColor: "#ccc"
                }
            },
            textStyle: {
                color: "#000000"
            }
        },
        toolbox: {
            feature: {
                saveAsImage: { show: false }
            },
            top: 10,
            right: 40
        },
        legend: {
            data: ["line", "bar"],
            textStyle: {
                color: "#ccc"
            }
        },
        dataZoom: [
            {
                show: false
            },
            {
                type: "inside"
            }
        ],
        xAxis: {
            type: "time",
            // splitNumber:10,
            data: yAxisData,
            axisLine: {
                lineStyle: {
                    color: "#ccc"
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false
            },
            position: "right",
            //splitLine: { show: true },
            axisLine: {
                lineStyle: {
                    color: "#ccc"
                }
            }
        },
        calculable: true,
        series: [
            {
                name: InParam.yText,
                type: "line",
                smooth: true,
                showAllSymbol: true,
                symbolSize: 5,
                symbol: "emptyCircle",
                itemStyle: {
                    normal: {
                        color: "#0b81fc",
                        lineStyle: { color: "#0b81fc", width: 3 },
                        areaStyle: { color: "#e7f3ff", type: "default" }
                    },
                    borderColor: "#0b81fc"
                    //emphasis:{color:"#ccff00",areaStyle: {color:"#0000ff", type: 'default'}}
                },
                data: yAxisData
            },
            {
                name: InParam.yText,
                type: "bar",
                barWidth: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new InParam.objecharts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#cccccc" }, //14c8d4
                                { offset: 1, color: "#cccccc" } //43eec6
                            ]
                        )
                    }
                },
                data: yAxisData
            }
        ]
    });
    chart.resize();
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
export function drawLineOrBar(InParam) {
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    var xAxisData = InParam.chartData.map(function(item) {
        return item[1];
    });
    var yAxisData = InParam.chartData.map(function(item) {
        return item[0];
    });
    if (InParam.loadingState == false) {
        chart.showLoading({ text: "读取数据中..." });
    } else {
        chart.hideLoading();
    }
    chart.setOption({
        tooltip: {
            trigger: "axis"
        },
        toolbox: {
            feature: {
                magicType: { show: true, type: ["line", "bar"] },
                saveAsImage: { show: true }
            },
            top: 10,
            right: 40
        },
        calculable: true,
        grid: {
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                data: xAxisData
            }
        ],
        yAxis: [
            {
                type: "value",
                name: InParam.yText,
                max: Math.max.apply(Math, yAxisData)
            }
        ],
        dataZoom: [
            {
                show: true
            },
            {
                type: "inside"
            }
        ],
        series: [
            {
                name: InParam.yText,
                type: "bar",
                markPoint: {
                    data: [
                        { type: "max", name: "最大值" },
                        { type: "min", name: "最小值" }
                    ]
                },
                markLine: {
                    data: [{ type: "average", name: "平均值" }]
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: "#726dd1",
                        shadowColor: "rgba(0, 0, 0, 0.4)",
                        shadowBlur: 20
                    }
                },

                data: yAxisData
            }
        ]
    });
    chart.resize();
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
export function drawLine(InParam) {
    //chartData, id, titleText, xText, yText, loadingState
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    var xAxisData = InParam.chartData.map(function(item) {
        return item[1];
    });
    var pieData = InParam.chartData.map(function(item) {
        return item[0];
    });
    if (InParam.loadingState == false) {
        chart.showLoading({ text: "读取数据中..." });
    } else {
        chart.hideLoading();
    }

    chart.setOption({
        title: {
            text: InParam.titleText
        },
        tooltip: {
            trigger: "axis"
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
            left: "center"
        },
        dataZoom: [
            {
                show: true
            },
            {
                type: "inside"
            }
        ],
        visualMap: {
            show: false,
            top: 10,
            right: 10,
            pieces: [
                {
                    gt: 0,
                    lte: 200,
                    color: "#096"
                },
                {
                    gt: 200,
                    lte: 400,
                    color: "#ffde33"
                },
                {
                    gt: 400,
                    lte: 600,
                    color: "#ff9933"
                },
                {
                    gt: 600,
                    lte: 800,
                    color: "#cc0033"
                },
                {
                    gt: 800,
                    lte: 1000,
                    color: "#660099"
                },
                {
                    gt: 1000,
                    color: "#7e0023"
                }
            ],
            outOfRange: {
                color: "#999"
            }
        },
        series: {
            name: InParam.yText,
            type: "line",
            data: InParam.pieData,
            markLine: {
                silent: true,
                data: [
                    {
                        yAxis: 200
                    },
                    {
                        yAxis: 400
                    },
                    {
                        yAxis: 600
                    },
                    {
                        yAxis: 800
                    },
                    {
                        yAxis: 1000
                    }
                ]
            }
        }
    });
    chart.resize();
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
export function drawStepLine(InParam) {
    var chart = InParam.objecharts.init(document.getElementById(InParam.id));
    var xAxisData = InParam.chartData.map(function(item) {
        return item[1];
    });
    var stepData = InParam.chartData.map(function(item) {
        return item[0];
    });
    chart.setOption({
        title: {
            text: InParam.titleText
        },
        tooltip: {
            trigger: "axis"
        },

        dataZoom: [
            {
                show: true
            },
            {
                type: "inside"
            }
        ],
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        xAxis: {
            type: "category",
            data: xAxisData
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "Step Middle",
                type: "line",
                step: "middle",
                data: InParam.stepData
            }
        ]
    });
    chart.resize();
    return chart;
}
//---------------------------------------------------------------------------------------------------------------------
