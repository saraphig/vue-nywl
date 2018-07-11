<template>
    <div class="home-container">
        <!-- <section class="home">
    {{ homeInfo }}
  </section> -->
        <!-- <div class="home-rem-test"></div>
        <div class="home-px-test"></div> -->
        <div class="home-weather-device">
            <div class="home-weather-box">
                <div class="model-label webfont">气象环境
                    <span class="weather-city"> ({{ cityName }})</span>
                </div><br />
                <div class="home-weather">
                    <div class="weather-item" v-for="(item, index) in weather_data" :class=" index % 2 ==0? 'fl' : 'fr'">
                        <div class="weather-data">
                            <span class="weather-name">{{ item.name }}</span><br />
                            <span v-if="item.style != ''" class="weather-value" style="font-size:24px;">{{ item.value }}</span>
                            <span v-if="item.style == ''" class="weather-value">{{ item.value }}</span>
                            <span class="weather-unit">{{ item.unit }}</span>
                        </div>
                        <img :src="weather_icon[item.icon]" class="weather-img" />
                    </div>
                </div>
            </div>

            <div class="home-device-box">
                <div class="model-label webfont">设备统计</div><br />
                <div class="home-device special">
                    <sh-echart class="home-echart" ref="$devCount" echartId="echart-devCount" :chartData="devCount.data" :echartsType="devCount.Type" :titleText="devCount.title" :subtitle="devCount.subtitle" :xText="devCount.xText" :yText="devCount.yText" customHeight="400px"></sh-echart>
                    <div class="devCount-message">
                        <i class="iconfont icon-dian icon-yellow"></i>
                        <span class="devCount-line">{{ devCount.data[0].name }} {{ devCount.data[0].value }} </span><br />
                        <i class="iconfont icon-dian icon-green"></i>
                        <span class="devCount-line">{{ devCount.data[1].name }} {{ devCount.data[1].value }}</span><br />
                        <i class="iconfont icon-dian icon-blue"></i>
                        <span class="devCount-line">{{ devCount.data[2].name }} {{ devCount.data[2].value }}</span><br />
                    </div>
                </div>
            </div>
        </div>

        <div class="home-warning-statistics">

            <div class="home-warning-left">
                <div class="model-label webfont">告警统计</div><br />
                <div class="home-device">
                    <sh-echart class="home-echart" ref="$warnCount" echartId="echart-warnCount" :chartData="warnCount.data" :echartsType="warnCount.Type" :titleText="warnCount.title" :subtitle="warnCount.subtitle" :xText="warnCount.xText" :yText="warnCount.yText" customHeight="400px" :customWidth="customWidth"></sh-echart>
                </div>
            </div>

            <div class="home-warning-right fr">
                <div class="model-label webfont">告警设备占比(%)
                    <select v-model="mac_selected" @change="machine_change" class="machine-select">
                        <option v-for="(item,index) in machine_data" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <br />
                <div class="home-device">
                    <span v-if="noHold_show" class="nothing webfont">暂无设备占比数据</span>
                    <sh-echart v-else class="home-echart" ref="$warnHold" echartId="echart-warnHold" :chartData="warnHold.data" :echartsType="warnHold.Type" :titleText="warnHold.title" :subtitle="warnHold.subtitle" :xText="warnHold.xText" :yText="warnHold.yText" customHeight="450px"></sh-echart>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setFontSize, strlen } from "@lib/js/mUtils";
import ShEchart from "@com/sh_echart";

export default {
    //id="echart-warncount" echartId="echart-warncount"
    name: "home",
    components: {
        ShEchart
    },
    data() {
        return {
            cityName: "厦门",
            interface_path: {},
            weather_icon: {
                cloudy: require("../../assets/img/weather_cloudy.png"), //多云
                cloudysky: require("../../assets/img/weather_cloudysky.png"), //阴天
                fine: require("../../assets/img/weather_fine.png"), //晴天
                hail: require("../../assets/img/weather_hail.png"), //冰雹
                hailthunder: require("../../assets/img/weather_hailthunder.png"), //冰雹雷雨
                shower: require("../../assets/img/weather_shower.png"), //阵雨
                haze: require("../../assets/img/weather_haze.png"), //雾霾
                none: require("../../assets/img/weather_none.png"), //无数据
                rain: require("../../assets/img/weather_rain.png"), //雨天
                snow: require("../../assets/img/weather_snow.png"), //雪
                thunder: require("../../assets/img/weather_thunder.png"), //雷雨

                temp: require("../../assets/img/home_temp.png"), //温度
                humidity: require("../../assets/img/home_humidity.png"), //湿度
                airpress: require("../../assets/img/home_airpress.png") //气压
            },
            weather_dict: {
                晴: "fine",
                多云: "cloudy",
                晴转多云: "cloudy",
                多云转晴: "cloudy",

                阴: "cloudysky",
                阴天: "cloudysky",
                阵雨: "shower",
                阵雨转阴: "shower",
                雷阵雨: "thunder",
                雷雨: "thunder",
                冰雹: "hail",

                冰雹雷雨: "hailthunder",
                雷阵雨加冰雹: "hailthunder",
                雷阵雨伴有冰雹: "hailthunder",

                下雨: "rain",
                雨夹雪: "rain",
                小雨: "rain",
                中雨: "rain",
                大雨: "rain",
                暴雨: "rain",
                大暴雨: "rain",
                特大暴雨: "rain",
                冻雨: "rain",
                雨: "rain",
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
            weather_data: [
                {
                    id: "1001",
                    name: "天气",
                    value: "晴",
                    unit: "",
                    icon: "fine",
                    style: ""
                },
                {
                    id: "1001",
                    name: "温度",
                    value: "32",
                    unit: "℃",
                    icon: "temp",
                    style: ""
                },
                {
                    id: "1001",
                    name: "湿度",
                    value: "30",
                    unit: "%RH",
                    icon: "humidity",
                    style: ""
                },
                {
                    id: "1001",
                    name: "大气压",
                    value: "101",
                    unit: "kPa",
                    icon: "airpress",
                    style: ""
                }
            ],
            machine_data: [
                { id: "01", name: "BEC2000主机01" },
                { id: "02", name: "BEC2000主机02" },
                { id: "03", name: "BEC2000主机03" }
            ],
            mac_selected: "01",
            warnCount: {
                title: "",
                Type: "Cookie",
                data: [
                    { value: 30, name: "一般告警" },
                    { value: 12, name: "重要告警" },
                    { value: 6, name: "紧急告警" }
                ],
                subtitle: "",
                xText: "",
                yText: ""
            },
            warnHold: {
                title: "",
                Type: "RadiusBar",
                data: [],
                subtitle: "",
                xText: "",
                yText: ""
            },
            devCount: {
                title: "",
                Type: "LoopPie",
                data: [
                    { value: 12, name: "传感器" },
                    { value: 33, name: "控制器" },
                    { value: 22, name: "主机" }
                ], //[12, 33, 22]
                subtitle: "",
                xText: "",
                yText: ""
            },
            customWidth: "29rem"
        };
    },
    computed: {
        noHold_show() {
            return this.warnHold.data.length <= 0;
        },
        ...mapGetters({
            homeInfo: "getHomeInfo"
        })
    },
    created() {
        localStorage.setItem("currentIndex", 0);
    },
    mounted() {
        this.$nextTick(function() {});
        console.log("检索初始数据:");

        this.GetWeatherData(); //天气数据是从外部付费获取，故先注释
        this.GetDeviceCountData();
        this.GetDeviceListData();

        setFontSize(document, window, () => {

            //console.log("setFontSize");
            //console.log(this.$refs.$devCount);
            //console.log(this.$refs.$devCount.chartResize);
            
            if (this.$refs.$devCount != undefined && typeof this.$refs.$devCount.chartResize == "function") {
                this.$refs.$devCount.chartResize();
            }
            if (this.$refs.$warnCount != undefined && typeof this.$refs.$warnCount.chartResize == "function") {
                this.$refs.$warnCount.chartResize();
            }
            //console.log(this.$refs.$warnHold.chartResize);
            if (this.$refs.$warnHold != undefined && typeof this.$refs.$warnHold.chartResize == "function") {
                this.$refs.$warnHold.chartResize();
            }
        });
    },
    methods: {
        isArray(obj) {
            //判断是否为数组
            return Object.prototype.toString.call(obj) == "[object Array]";
        },
        funSetResize(doc, win) {
            var docEl = doc.documentElement,
                resizeEvt =
                    "orientationchange" in window
                        ? "orientationchange"
                        : "resize",
                recalc = function() {
                    let clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
                    //可以根据实际需要修改
                    docEl.style.fontSize = 16 * (clientWidth / 1920) + "px";
                    console.log(docEl.style.fontSize);
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener("DOMContentLoaded", recalc, false);
        },
        GetWeatherData(condition) {
            if (condition == undefined) {
                condition = {
                    //cityName: this.cityName
                };
            }
            this.$store.dispatch("fetchWeatherGet", condition).then(
                response => {
                    console.log("fetchWeatherGet response");
                    console.log(response);

                    if (response.msg == "内网ip无法获取地址") {
                        let condition = { city: "常州" };
                        this.GetWeatherData(condition);
                        return;
                    }
                    if (
                        response.data == null ||
                        typeof response.data != "object"
                    ) {
                        console.log("非法天气数据！");
                        return;
                    }

                    //this.cityName = response.result.today.city;
                    this.cityName = response.data.cityName;

                    this.weather_data = [];
                    //天气图标
                    let iconName = "none";
                    let weather = response.data.weather;
                    iconName = this.weather_dict[weather];
                    if (iconName == undefined) iconName = "none";
                    console.log("iconName=" + iconName);

                    //console.log((strlen(response.result.today.weather) > 3?"font-size:30px;":"font-size:30px;"));
                    let temperature = response.data.temperature;
                    if (temperature.indexOf("~") > -1) {
                        temperature =
                            (parseInt(temperature.substr(0, 2)) +
                                parseInt(
                                    temperature.substr(
                                        temperature.indexOf("~") + 1,
                                        2
                                    )
                                )) /
                            2;
                        console.log(temperature);
                    }

                    this.weather_data.push(
                        {
                            id: "1001",
                            name: "天气",
                            value: response.data.weather,
                            unit: "",
                            icon: iconName,
                            style:
                                strlen(response.data.weather) > 6
                                    ? "font-size:24px;"
                                    : ""
                        },
                        {
                            id: "1001",
                            name: "温度",
                            value: temperature, //response.data.temperature,
                            unit: "℃",
                            icon: "temp",
                            style: ""
                        },
                        {
                            id: "1001",
                            name: "湿度",
                            value: response.data.sd.substr(
                                0,
                                response.data.sd.indexOf("%")
                            ),
                            unit: "%RH",
                            icon: "humidity",
                            style: ""
                        },
                        {
                            id: "1001",
                            name: "大气压",
                            value: "101", //response.data.airPress,
                            unit: "kPa",
                            icon: "airpress",
                            style: ""
                        }
                    );
                    console.log(this.weather_data);
                },
                error => {
                    console.log(
                        "[fetchWeatherGet] error:%c" + error,
                        "color:red"
                    );
                }
            );
        },
        GetDeviceCountData(condition) {
            // if (condition == undefined) {
            //     condition = {
            //         region: 100000915
            //     };
            // }
            // console.log("condition:");
            // console.log(condition);
            this.$store.dispatch("fetchDeviceCountGet", condition).then(
                response => {
                    console.log("fetchDeviceCountGet response");
                    console.log(response);
                    if (typeof response != "object") {
                        console.log("收到非法数据!");
                        return;
                    }
                    if (this.isArray(response)) {
                        this.warnHold.data = [];
                        this.warnHold.data = response.map(function(item) {
                            return {
                                value: item.alarmShare.toFixed(4),
                                name: item.displaytype
                            };
                        });
                    } else {
                        this.warnCount.data = [];
                        this.warnCount.data.push(
                            { value: response.yiban, name: "一般告警" },
                            { value: response.zhongyao, name: "重要告警" },
                            { value: response.jinji, name: "紧急告警" }
                        );

                        this.devCount.data = [];
                        this.devCount.data.push(
                            { value: response.zjData, name: "主机" },
                            { value: response.cgqData, name: "传感器" },
                            { value: response.kzqData, name: "控制器" }
                        );
                    }
                },
                error => {
                    console.log(
                        "[fetchDeviceCountGet] error:%c" + error,
                        "color:red"
                    );
                }
            );
        },

        GetDeviceScaleData(condition) {
            // if (condition == undefined) {
            //     condition = {
            //         region: 100000915
            //     };
            // }
            // console.log("condition:");
            // console.log(condition);
            this.$store.dispatch("fetchDeviceScaleGet", condition).then(
                response => {
                    console.log("fetchDeviceScaleGet response");
                    console.log(response);
                    if (typeof response != "object") {
                        console.log("收到非法数据!");
                        return;
                    }
                    if (this.isArray(response)) {
                        this.warnHold.data = [];
                        this.warnHold.data = response.map(function(item) {
                            return {
                                value: item.alarmShare.toFixed(4),
                                name: item.devName
                            };
                        });
                    }
                },
                error => {
                    console.log(
                        "[fetchDeviceCountGet] error:%c" + error,
                        "color:red"
                    );
                }
            );
        },
        GetDeviceListData(condition) {
            this.$store.dispatch("fetchDeviceListGet", condition).then(
                response => {
                    console.log("fetchDeviceListGet response");
                    console.log(response);
                    if (this.isArray(response)) {
                        this.machine_data = [];
                        this.machine_data = response.map(function(item) {
                            return {
                                id: item.id,
                                name: item.assertName
                            };
                        });
                        this.mac_selected = this.machine_data[0].id;
                        this.machine_change();
                    } else {
                        console.log("收到非法数据!");
                    }
                },
                error => {
                    console.log(
                        "[fetchDeviceListGet] error:%c" + error,
                        "color:red"
                    );
                    //this.machine_data = [];
                    this.machine_data = [{ name: "暂无设备数据", id: 0 }];
                    this.mac_selected = this.machine_data[0].id;
                }
            );
        },
        machine_change() {
            let condition = {
                region: this.mac_selected
            };
            this.warnHold.data = [];
            this.GetDeviceScaleData(condition); //fetchDeviceScaleGet
        }
        // testGet() {
        //     // 测试get
        //     this.$store.dispatch("fetchTestGet", { test: 1 }).then(
        //         data => {
        //             //
        //         },
        //         error => {
        //             //
        //         }
        //     );
        // }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import 'index.styl';
</style>
