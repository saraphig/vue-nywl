<!-- //////////////////////////////////////////////
//  自定义天气信息显示组件 (hyl 2018-05-09) :style="{width: widthData}"
////////////////////////////////////////////// -->
<template>
    <div :id="SelectId" class="base-select"  @mouseenter="weatherShow(true)" @mouseleave="weatherShow(false)" >
        <div class="sub-selected-value" :style="selectedShow">
            <div class="weather-city">
                    <i :class="weather_icon[cityicon]" class="city-icon"></i>
                <!-- <img :src="weather_icon[cityicon]" class="city-icon" /> -->
                <span class="city-temp" >{{ citytemp }}<br />{{ cityweather }}</span>
            </div><br />
            <!-- <i class="iconfont icon-shouye_weizhi"></i> -->
            <!-- <span class="weather-city">{{ cityName }}</span> -->
            <!--显示选择的值-->
            <div class="sub-select-list" v-if="selectShow">
                <div class="sub-select-item" v-for="(item, index) in weatherList" @click.stop="selectVal(item, index)" :style="itemLight(index,item.name)">
                    <div class="item-panel" :style="itemRight(index,item.name)">
                    <span class="weather-name" >{{ item.name }}</span><br/>
                    <span class="weather-date" >{{ item.date }}</span><br/>
                    <span class="weather-temp" >{{ item.temp }}</span><br/>
                    <!-- <img :src="weather_icon[item.icon]" class="weather-img" /><br/> -->
                    <!-- <i class="iconfont icon-icon_tianqi_yin weather-img"></i><br/> -->
                    <i :class="weather_icon[item.icon]"></i><br/>
                    <span class="weather-value" >{{ item.value }}</span><br/>
                    <span class="weather-wind" >{{ item.wind }}</span><br/>
                    <span class="weather-comp" :style="comp_color(item.comp)" >{{ item.comp }}</span><br/>
                    </div>
                </div>
                <div class="mark_act" :style="act_styles"></div>
                <br/>
                <!-- <div class="weather-bottom"></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { documentClick } from "@lib/js/mUtils";
import eventBus from '@com/event-bus';

//@click="showDataList" //点击显示消失   暂无天气预警信息

export default {
    name: "weather_view",
    props: {
        SelectId: {
            type: String,
            default: "weather_view"
        },
        selectedValue: {
            type: Object,
            default: function() {
                return { key: "0", value: "无数据" };
            }
        },
        widthData: {
            type: String,
            default: "450px"
        }
    },
    computed: {
        selectedShow() {
            if (this.selectShow) {
                return { background:"#f1f7fa" } //edf3f5
            } else {
                return { background:"#ffffff" }
            }
        },
        act_styles() {
            if (this.selectShow) {
                return { display:"inline-block" }
            } else {
                return { display:"none" }
            }
        },
        
    },
    mounted() {
        documentClick(() => {
            //console.log("" + this.SelectId);
            let selfdiv = document.getElementById(this.SelectId);
            //console.log("show:" + selfdiv);
            if (selfdiv) {
                if (!selfdiv.contains(event.target)) {//判断点击到了id以外的区域
                    this.selectShow = false;
                };
            };
        });
        this.$nextTick(() => {
            this.GetCurrentWeatherData();
            //console.log("”）；
            this.GetWeatherData();
        });
    },
    methods: {
        weatherShow(isShow) {
            this.selectShow = isShow
            eventBus.$emit('weatherShow',isShow);
        },
        comp_color(key) {
            let colorVal = { background: "#8fc31f" };
            switch(key) {
                case "优": colorVal = { background: "#41a259" }; break;
                case "良": colorVal = { background: "#ffad1d" }; break;
                case "霾": colorVal = { background: "#8896ac" }; break;
                case "无": colorVal = { background: "#8fc31f" }; break;
                default: colorVal = { background: "#8fc31f" }; break;
            }
            return colorVal;
        },
        itemLight(index,name) {
            if (name == "今天") {
                return { background:"#f1f6f9" }
            }
        },
        itemRight(index,name) {
           if (index > 1 && index < 6 && name != "今天") {
                return { "border-right":"1px solid #cccccc" }
            } else {
                //return { "border-right":"1px solid #ffffff" }
            }
        },
        isArray(obj) {
            //判断是否为数组
            return Object.prototype.toString.call(obj) == "[object Array]";
        },
        showDataList() {
            this.selectShow = !this.selectShow;
            //console.log("showDataList" + this.selectShow);
        },
        selectVal(item, index) {
            this.selectShow = false;
            this.selectedValue.key = item.key;
            this.selectedValue.value = item.value;
            this.$emit("recSelected", item);
        },
        GetCurrentWeatherData(condition) {
            if (condition == undefined) {
                condition = {
                    //city: this.cityName
                    //city: "厦门"
                };
            }
            this.resCount ++;
            this.$store.dispatch("fetchCuttentWeatherGet", condition).then(
                response => {
                    console.log("fetchCuttentWeatherGet response");
                    console.log(response);

                    if (response.msg == "内网ip无法获取地址") {
                        setTimeout(() => {
                            this.resCount ++;
                            let condition = { city: "厦门" };
                            this.GetCurrentWeatherData(condition);
                            return;
                        },1000);
                    }
                    if (
                        response == null ||
                        typeof response != "object"
                    ) {
                        console.log("非法天气数据！");
                        return;
                    }

                    this.cityName = response.cityName;
                    this.citytemp = response.temperature;
                    this.cityweather  = response.weather;
                    this.cityicon = this.weather_dict[response.weather];

                    if (this.cityicon == undefined) {
                        let tmpweather = response.weather.substr(response.weather.length - 1,1);
                        this.cityicon = this.weather_dict[tmpweather];
                        if (this.cityicon == undefined) this.cityicon = "none";
                    }
                    this.resCount = 0;                    
                },
                error => {
                    console.log(
                        "[fetchCuttentWeatherGet] error:%c" + error,
                        "color:red"
                    );
                    // if (this.resCount < 3) {
                    //     setTimeout(() => {
                    //         this.resCount ++;
                    //         let condition = { city: "厦门" };
                    //         this.GetCurrentWeatherData(condition);
                    //     },1000);
                    // }

                }
            );
        },
        GetWeatherData(condition) {
            if (condition == undefined) {
                condition = {
                    //city: "厦门"
                    //cityName: this.cityName
                };
            }
            this.resCount ++;
            this.$store.dispatch("fetchWeatherGet", condition).then(
                response => {
                    //console.log("fetchWeatherGet response");
                    //console.log(response);

                    if (response.msg == "内网ip无法获取地址") {
                        setTimeout(() => {
                            this.resCount ++;
                            let condition = { city: "厦门" };
                            this.GetWeatherData(condition);
                            return;
                        }, 1000);
                    }
                    if (
                        response.data == null ||
                        typeof response.data != "object"
                    ) {
                        console.log("非法天气数据！");
                        return;
                    }
                        console.log("@@fetchWeatherGet response");
                        console.log(response.data);
                        //console.log(this.isArray(response.data));
                    if (this.isArray(response.data)) {

                        //console.log("########################");

                        let toweather = {},resDay,resMonth,resWeek,resIcon;
                        let toDate = new Date();
                        let toMonth = toDate.getMonth();
                        toMonth = (toMonth == 0? 12:(toMonth + 1));
                        let toDay = toDate.getDate();//今天日期

                        //console.log(toDay+","+toMonth);


                        this.weatherList = [];
                        let count = response.data.length;
                        count = (count > 7? 7: count);
                        for (let i = 0; i < count; i ++) {

                            resDay = response.data[i].date;
                            resMonth = (resDay.substr(4,2));//parseInt
                            resDay = (resDay.substr(6,2));//parseInt


                            //console.log(resDay+","+resMonth);

                            resWeek = response.data[i].week.replace(/星期/g, '周');
                            //console.log(resWeek);

                            resIcon = this.weather_dict[response.data[i].weather];
                            if (resIcon == undefined) {
                                let tmpweather = response.data[i].weather.substr(response.data[i].weather.length - 1,1);
                                resIcon = this.weather_dict[tmpweather];
                                if (resIcon == undefined) resIcon = "none";
                            }
                            if (response.data[i].quality == undefined) response.data[i].quality = "无";
                            toweather = {
                                name: (toDay == resDay?"今天":(toDay - 1 == resDay?"昨天":resWeek)),
                                date: (resMonth + "/" + resDay),
                                value: response.data[i].weather,
                                icon: resIcon,
                                temp: response.data[i].temperature, //response.data.temperature,
                                wind: response.data[i].wind,
                                comp: response.data[i].quality,
                                unit:""
                            };
                            console.log(toweather);
                            
                            this.weatherList.push(toweather);
                        }//end for
                        this.resCount = 0;
                    }
/*"cityName": "厦门",
"weather": "阴",
"temperature": "20℃~24℃",
"wind": "东北风3-4级",
"week": "星期四",
"date": "20180503"*/
/*                  //旧的接口数据
                    //this.cityName = response.result.today.city;
                    this.cityName = response.data.cityName;
                    //this.citytemp
                    //this.cityicon
                    console.log(this.cityName);

                    this.weatherList = [];
                    //天气图标
                    let iconName = "none";
                    let weather = response.data.weather;
                    iconName = this.weather_dict[weather];
                    if (iconName == undefined) iconName = "none";
                    console.log("iconName=" + iconName);
                    
                    this.cityicon = iconName;//

                    //console.log((strlen(response.result.today.weather) > 3?"font-size:30px;":"font-size:30px;"));
                    //温度
                    let temperature = response.data.temperature;
                    if (temperature.indexOf("~") > -1) {
                        temperature =
                            (parseInt(temperature.substr(0, 2)) +
                                parseInt(temperature.substr(temperature.indexOf("~") + 1,2))) / 2;
                        console.log(temperature);
                    }*/
                     /*
                    this.citytemp = temperature + "℃";

                    let toDate = new Date();
                    let toMonth = toDate.getMonth();
                    toMonth = (toMonth == 0? 12:(toMonth + 1));
                    let toDay = toDate.getDate();

                    let toweather = {
                        name: "今天",
                        date: toDay + "/" + toMonth,
                        value: response.data.weather,
                        icon: iconName,
                        temp: temperature + "℃", //response.data.temperature,
                        wind:response.data.windDirection,
                        comp:response.data.uvIndex,
                        unit:""
                    }*/
        
                    /*this.weatherList.push(toweather);*/
                        
                    //console.log(this.weatherList);
                },
                error => {
                    console.log(
                        "[fetchWeatherGet] error:%c" + error,
                        "color:red"
                    );
                    // if (this.resCount < 3) {
                    //     setTimeout(() => {
                    //         this.resCount ++;
                    //         let condition = { city: "厦门" };
                    //         this.GetWeatherData(condition);
                    //     },1000);
                    // }//end if
                }
            );
        }
    },
    data: function() {
        return {
            resCount:0,
            selectShow: false,
            weatherList:[
                { name:"昨天",date:"01/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"今天",date:"02/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"明天",date:"03/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"周四",date:"04/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"周五",date:"05/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"周六",date:"06/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" },
                { name:"周天",date:"07/05",temp:"25℃",value: "晴",unit: "",icon: "fine", wind:"东风",comp:"优" }
            ],
            cityName:"厦门市",
            citytemp:"25℃",
            cityicon:"fine",
            cityweather:"",
            weather_icon: { //iconfont icon-icon_tianqi_yin weather-img
                cloudy:      "iconfont icon-icon_tianqi_duoyun weather-img", //多云
                cloudysky:   "iconfont icon-icon_tianqi_yin weather-img", //阴天
                fine:        "iconfont icon-icon_tianqi_qing weather-img", //晴天 
                hail:        "iconfont icon-icon_tianqi_bingbao weather-img", //冰雹
                hailthunder: "iconfont icon-icon_tianqi_leiyubingbao weather-img", //冰雹雷雨
                shower:      "iconfont icon-icon_tianqi_zhenyu weather-img", //阵雨
                haze:        "iconfont icon-icon_tianqi_wumai weather-img", //雾霾
                none:        "iconfont icon-icon_tianqi_wushuju weather-img", //无数据
                rain:        "iconfont icon-icon_tianqi_yu weather-img", //雨天
                snow:        "iconfont icon-icon_tianqi_xue weather-img", //雪
                thunder:     "iconfont icon-icon_tianqi_leizhenyu weather-img", //雷雨

                // temp: require("../assets/img/home_temp.png"), //温度
                // humidity: require("../assets/img/home_humidity.png"), //湿度
                // airpress: require("../assets/img/home_airpress.png") //气压

                // cloudy: require("../assets/img/weather_cloudy.png"), //多云
                // cloudysky: require("../assets/img/weather_cloudysky.png"), //阴天
                // fine: require("../assets/img/weather_fine.png"), //晴天
                // hail: require("../assets/img/weather_hail.png"), //冰雹
                // hailthunder: require("../assets/img/weather_hailthunder.png"), //冰雹雷雨
                // shower: require("../assets/img/weather_shower.png"), //阵雨
                // haze: require("../assets/img/weather_haze.png"), //雾霾
                // none: require("../assets/img/weather_none.png"), //无数据
                // rain: require("../assets/img/weather_rain.png"), //雨天
                // snow: require("../assets/img/weather_snow.png"), //雪
                // thunder: require("../assets/img/weather_thunder.png"), //雷雨

                // temp: require("../assets/img/home_temp.png"), //温度
                // humidity: require("../assets/img/home_humidity.png"), //湿度
                // airpress: require("../assets/img/home_airpress.png") //气压
            },
            weather_dict: {
                晴: "fine",

                云: "cloudy",
                多云: "cloudy",
                小雨转多云: "cloudy",
                晴转多云: "cloudy",
                多云转晴: "cloudy",
                阴转多云: "cloudy",

                阴: "cloudysky",
                阴天: "cloudysky",
                多云转阴: "cloudysky",
                雷阵雨转阴: "cloudysky",
                阵雨: "shower",
                阵雨转阴: "shower",
                小雨转阴: "shower",
                多云转小雨: "shower",                           
                阴转小雨: "shower",                           
                雷阵雨: "thunder",
                雷雨: "thunder",
                冰雹: "hail",

                冰雹雷雨: "hailthunder",
                雷阵雨加冰雹: "hailthunder",
                雷阵雨伴有冰雹: "hailthunder",

                下雨: "rain",
                大雨转小雨: "rain", 
                中雨转小雨: "rain", 
                小雨转阵雨: "rain",  
                多云转阵雨: "rain",  
                雨夹雪: "rain",
                小雨: "rain",
                中雨: "rain",
                大雨: "rain",
                暴雨: "rain",
                大暴雨: "rain",
                特大暴雨: "rain",
                冻雨: "rain",
                雨: "rain",
                "阵雨转中雨": "rain",
                "小雨转中雨": "rain",
                "中雨转大雨": "rain",
                "大雨转暴雨": "rain",
                "暴雨转大暴雨": "rain",
                "大暴雨转特大暴雨": "rain",
                "小雨-中雨": "rain",
                "中雨-大雨": "rain",
                "大雨-暴雨": "rain",
                "暴雨-大暴雨": "rain",
                "大暴雨-特大暴雨": "rain",

                下雪: "snow",
                阵雪: "snow",
                小雪: "snow",
                中雪: "snow",
                大雪: "snow",
                暴雪: "snow",
                雪: "snow",
                "小雪-中雪": "snow",
                "中雪-大雪": "snow",
                "大雪-暴雪": "snow",

                雾: "haze",
                雾霾: "haze",
                霾: "haze",

                沙尘暴: "none",
                浮尘: "none",
                扬沙: "none",
                强沙尘暴: "none"
            },
        };
    },
    created() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

.sub-select-list {
    position: absolute;
    top 58px
    right -88px
    box-shadow: 0 0 10px 6px #edf0f2;
    // border 2px solid #edf0f2
    background #ffffff
    width: 700px
    height:251px;
    // max-height: 438px
    white-space: nowrap
    font-size 16px
    // overflow-y: scroll
    box-sizing border-box
    z-index 9999
    // color #ffffff
    // line-height 1.875rem
    text-align left
    border-radius 2px
    white-space nowrap 
    // margin-top 1.1rem

    .mark_act {
        position absolute
        display inline-block
        width: 0;
        height: 0;
        border-left 8px solid transparent
        border-right: 8px solid transparent
        border-bottom: 10px solid #ffffff
        top -10px
        right 142px
        // left: 43%;
    }

    .sub-select-item {
        position relative
        display inline-block
        box-sizing: border-box
        width  14.285%
        height 100%
        // height 192px
        //line-height 30px
        text-align center
        // background #3d321f
        // margin-top 30px
        // padding-top 0px
        line-height 18px
        z-index 9999
        margin 0
        padding 0
        // border-top 30px solid #ffffff
        // border-right 1px solid #e3e8ea
        //margin-left 18px //18px
        // border-left 9px solid #3a2e29
        // border-right 9px solid #3a2e29
        .item-panel {
            display inline-block
            width 100%
            // border-right 1px solid #e3e8ea
            line-height 18px
            text-align center
            box-sizing: border-box
            margin-top 30px
        }

        

        /*.sub-select-item:hover { 
            background #c9cfdb
        }*/
        .weather-name {
            display inline-block
            font-size 14px
            color #666666
            margin-top -2px
        // font-weight bold
        }
        .weather-date {
            display inline-block
            font-size 11px
            color #999999
            margin-top 10px
        }
        .weather-temp {
            display inline-block
            font-size 11px
            color #666666
            margin-top 10px
        }
        .weather-img {
            display inline-block
            // width 28px
            // height 28px
            font-size 36px
            color #41a259
            margin-top 10px
            margin-left 0px
            // border 1px solid #ff0000
        }
        .weather-value {
            display inline-block
            font-size 13px
            color #666666
            margin-top 10px
        }
        .weather-wind {
            display inline-block
            font-size 11px
            color #999999
            margin-top 10px
        }
        .weather-comp {
            display inline-block
            width 22px
            height 16px
            border-radius:4px;
            font-size 11px
            line-height 16px
            color #ffffff
            //font-weight bold
            box-sizing border-box
            background #8fc31f
            margin-top 12px
        }
    }
    .weather-bottom {
        display inline-block
        width 100%
        height 2.5rem 
        background #3f3329
        vertical-align middle
        font-size 13px
        text-align center
        line-height 7.5rem
        margin-top 0.825rem
    }
}

.base-select {
    position: relative;
    width: 130px;
    height: 60px;
    font-size: 16px;
    //font-weight: bold;
    // background: #7b6f71;
    // //border-radius:27px;
    // margin-right: 24px //24px;
    // margin-top: 34px;
    box-sizing: border-box;
    // white-space: nowrap;    
    cursor: pointer;
    text-align left
    vertical-align middle
    // border 1px solid #f1f7fa

    .sub-selected-value {
        position relative
        display inline-block
        text-align center
        width 100%
        height 100%
        vertical-align middle
    }
    // .weather-city {
    //     display inline-block
    //     font-size 16px
    //     line-height 100%
    //     // vertical-align middle
    // }
    .weather-city {
        position: relative
        display inline-block
        font-size 18px        
        color #666666
        line-height 100%
        text-align center
        vertical-align middle
        margin-top 10px
        width auto
        overflow visible
    }
    .city-temp {
        display inline-block
        font-size 12px
        font-weight bold
        color #666666
        line-height 18px
        text-align left
        // vertical-align middle
        // float right
    }
    .city-icon {
        // display inline-block
        // width 32px
        // height 32px
        // margin-right 30px
        // vertical-align middle
        float left
        // border 1px solid #ff0000
        font-size 32px
        color #666666
        line-height 32px
    }

    .iconfont {
        display inline-block
        // font-size 18px
        // color #009dd9
        // margin-left 30px
        vertical-align middle
    }
}

</style>