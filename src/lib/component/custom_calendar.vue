<template>
    <div :id="CalendarId" class="base-calendar" :style="{width: widthData}">
        <div class="sub-calendar-data">
            <div class="sub-month-year" :style="{width: widthData}">
                <div class="year-box"><div class="year-up" @click.stop="subYear"></div><div class="year-down" @click.stop="addYear"></div></div>
                {{ current_Year }}年{{ current_Month }}月
                <div class="arrow-mark-left" @click.stop="subMonth"></div>
                <div class="arrow-mark-right" @click.stop="addMonth"></div>
            </div>
            <div class="sub-week-list" :style="{width: widthData}">
                <div class="sub-week-item" v-for="(item, index) in weekList" @click.stop="selectWeek(item, index)">
                    {{ item }}
                </div>
            </div>
            <div class="sub-day-list" :style="{width: widthData}">
                <div class="sub-day-item" v-for="(item, index) in dayList" @click.stop="selectDay(item, index)" :style="opt_select(item, index)" @mouseenter="enter(item, index)" @mouseleave="leave(item, index)">
                    {{ item.day }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { documentClick } from "@lib/js/mUtils";
//import { documentClick } from "../js/functions";


export default {
    name: "custom-calendar",
    props: {
        CalendarId: {
            type: String,
            default: "custom_calendar"
        },
        // dateList: {
        //     type: Array,
        //     default: function() {
        //         return [{ day: "0", selected:false }];
        //     }
        // },
        selectedValue: {
            type: Object,
            default: function() {
                return { day: "" };
            }
        },
        widthData: {
            type: String,
            default: "160px"
        }
    },
    computed: {},
    mounted() {

        documentClick(() => {
            //console.log("" + this.SelectId);
            let selfdiv = document.getElementById(this.CalendarId);
            //console.log("show:" + selfdiv);
            if (selfdiv) {
                if (!selfdiv.contains(event.target)) {
                    //判断点击到了id以外的区域
                    this.selectShow = false;
                }
            }
        });
        let toDate = new Date();
        this.current_Day = toDate.getDate();
        // console.log(this.selectedValue);
        this.fillDays(toDate.getFullYear(), toDate.getMonth() + 1);
        // console.log("selectedValue：");
        // console.log(this.selectedValue);
        
    },
    methods: {
        showDateList() {
            this.selectShow = !this.selectShow;
            console.log("showDataList" + this.selectShow);
        },
        selectWeek(item, index) {
            console.log("selectWeek" + this.item[index]);
        },
        selectDay(item, index) { //点击选中日期   当天日期选不中，设定选中日期
            this.selectShow = !(this.selectedValue.day == item.day);
            if (item.opt == "=" || item.opt == "@") { //当月日期
                this.selectedValue.day = item.day;
                item.fee = "=";
                //item.opt = "*";
                let outMonth =  (this.current_Month > 9? "":"0") + this.current_Month;
                let outDay = (item.day > 9? "" : "0") + item.day;
                this.selectDate = this.current_Year + "-" + outMonth + "-" + outDay;
                this.$emit("daychanged", this.selectDate);
            } else if (item.opt == "-") { //上个月末日期
                this.current_Month -= 1;
                if (this.current_Month < 1) {
                    this.current_Month = 12;
                    this.current_Year -= 1;
                }
                this.fillDays(this.current_Year, this.current_Month);
                this.setSelectDate(this.current_Year + "-" + this.current_Month + "-" + item.day);
            } else if (item.opt == "+") { //下个月初日期
                this.current_Month += 1;
                if (this.current_Month > 12) {
                    this.current_Month = 1;
                    this.current_Year += 1;
                }
                this.fillDays(this.current_Year, this.current_Month);
                this.setSelectDate(this.current_Year + "-" + this.current_Month + "-" + item.day);
            }
            console.log(this.dayList);            
        },
        setSelectDate(instrDate) { // "2018-05-28" 设定选中的日期
            let tmparr = instrDate.split("-");
            if (this.current_Year == tmparr[0]) { 
                if (this.current_Month == tmparr[1]) { //同年同月同日
                    this.selectedValue.day = parseInt(tmparr[2]);
                    for (let i = 0; i < this.dayList.length; i ++) {
                        if (this.dayList[i].day == this.selectedValue.day 
                            && (this.dayList[i].opt == "=" || this.dayList[i].opt == "@")) {
                            this.dayList[i].fee = "=";
                            //console.log("this.dayList");
                            //console.log(this.dayList[i]);
                            break;
                        };
                    }
                    let tmpnum = parseInt(tmparr[1]);
                    tmparr[1] = (tmpnum < 10?"0":"") + tmpnum;
                    tmpnum = parseInt(tmparr[2]);
                    tmparr[2] = (tmpnum < 10?"0":"") + tmpnum;
                    this.selectDate = tmparr.join("-");
                    //console.log(this.dayList);
                    //console.log(instrDate + "," + this.selectDate);
                    this.$emit("daychanged", this.selectDate);
                // } else if ((this.current_Month + 1) == tmparr[1] || (this.current_Month - 1) == tmparr[1]) {
                };
            };
        },
        opt_select(item, index) {
            if (this.selectedValue.day == item.day && item.fee=="="
                && (item.opt=="=" || item.opt=="@")) {
                //console.log(item,index)
                return { color: "#ffffff", background: "#41a259" }; //点中的日期
            }
            if (item.fee == "*") {
                //console.log(item,index)
                return { color: "#41a259", background: "#c9cfdb" }; //光标移入的效果
            } else {
                if (item.opt == "-") {
                    return { color: "#cccccc", background: "#ffffff" }; //上个月的日期
                } else if (item.opt == "+") {
                    return { color: "#cccccc", background: "#ffffff" }; //下个月的日期
                } else if (item.opt == "@") {
                    return { color: "#41a259", background: "#ffffff" }; //当前日期
                } else if (item.opt == "*") {
                    //return { color: "#ffffff", background: "#41a259" }; //不起作用
                }else{
                    return "";
                }
            }
        },
        enter(item, index) {
            item.fee = "*"; //鼠标标移入
        },
        leave(item, index) {//鼠标移出
            if (item.day != this.selectedValue.day) {
                item.fee = ""; 
            } else {
                item.fee = "="; 
            };
        },
        subYear() {
            this.current_Year -= 1;
        },
        addYear() {
            this.current_Year += 1;
        },
        subMonth() { //月份减
            this.current_Month -= 1;
            if (this.current_Month <= 0) {
                this.current_Month = 12;
                this.current_Year -= 1;
            }
            this.fillDays(this.current_Year, this.current_Month);
            this.setSelectDate(this.selectDate);
        },
        addMonth() { //月份加
            this.current_Month += 1;
            if (this.current_Month > 12) {
                this.current_Month = 1;
                this.current_Year += 1;
            }
            this.fillDays(this.current_Year, this.current_Month);
            this.setSelectDate(this.selectDate);
        },
        fillDays(inYear, inMonth) { //填充日期数据
            this.current_Year = inYear;
            this.current_Month = inMonth;
            let atDate = new Date(inYear, inMonth, 0); //当前月当天日期对象：
            let date_0 = atDate.getDate();
            let date_1 = new Date(atDate.setDate(1)); //当前月第一天日期对象
            let weekday_1 = date_1.getDay(); //当前月第一天星期几
            console.log(
                "inYear=" +
                    inYear +
                    ",inMonth=" +
                    inMonth +
                    ",weekday_1=" +
                    weekday_1 +
                    ",date_0=" +
                    date_0
            );
            if (weekday_1 == 0) {
                weekday_1 = 6; ////0 -- 6 0=星期天
            } else {
                weekday_1 -= 1; //作为下标从0开始
            }

            /* var nowdays = new Date();  //当前月当天日期对象：
            this.current_Year  = nowdays.getFullYear();  
            this.current_Month = nowdays.getMonth(); 
            this.current_Day   = nowdays.getDate();
            if (this.current_Month == 0)  
            {  
                this.current_Month = 12;  
                this.current_Year = this.current_Year - 1;  
            } */
            //var lastDay = this.current_Year + "-" + this.current_Month + "-" + myDate.getDate(); //上个月最后一天
            //console.log("lastDay=" + lastDay);
            //lastDay = myDate.getDate();
            let tmpDay = {};
            this.dayList = [];
            //上个月数据
            let lastDate = new Date(
                this.current_Year,
                this.current_Month - 1,
                0
            );
            let lastDay = lastDate.getDate();
            for (let i = 0; i < weekday_1; i++) {
                tmpDay = {
                    day: lastDay - weekday_1 + i + 1 + "",
                    opt: "-",
                    fee: ""
                };
                this.dayList.push(tmpDay);
            }
            //当前月数据
            //let currDate = new Date(this.current_Year, this.current_Month - 1, 0);
            //let currtDay = currDate.getDate();
            let numDay = 1;
            let toDate = new Date();
            let toMonth = toDate.getMonth();
            if (toMonth == 0) {
                toMonth = 12;
            } else {
                toMonth += 1;
            }
            console.log("toMonth=" + toMonth+",current_Month="+this.current_Month);            
            for (let i = weekday_1; i < weekday_1 + date_0; i++) {
                numDay = i - weekday_1 + 1;
                tmpDay = {
                    day: numDay + "",
                    opt: ((this.current_Day == numDay 
                           && this.current_Month == toMonth 
                           && this.current_Year == toDate.getFullYear())? "@" : "="),
                    fee: ""
                };
                this.dayList.push(tmpDay);
            }
            // console.log("lastDay=" + (weekday_1 + date_0));
            //下个月数据
            for (let i = weekday_1 + date_0; i < 42; i++) {
                tmpDay = {
                    day: i - weekday_1 - date_0 + 1 + "",
                    opt: "+",
                    fee: ""
                };
                this.dayList.push(tmpDay);
            }
        }
    },
    data: function() {
        return {
            selectShow: false,
            current_Month: 0,
            current_Year: 2018,
            current_Day: 0,
            weekList: ["一", "二", "三", "四", "五", "六", "日"],
            dayList: [{ day: "1", opt: "",fee:"" }], //日期结构：日期，选项（-上个月，=当前月，+下个月，@当前日期，*日期），动作（鼠标移入 * 鼠标移出 =）
            selectDate: "",
        };
    },
    created() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.base-calendar {
    position: relative;
    width: 300px;
    height: auto;
    box-sizing: border-box;
    border-radius: 4px;

    .sub-calendar-value {
        width: 100%;
        height: 50px;
        text-indent: 10px;
        // -ms-line-height: 40px !important;
        // border-radius: 4px;
        border: solid 2px #cccfd9;
        box-sizing: border-box;
        cursor: pointer;
    }

    .sub-calendar-data {
        position: relative;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        border-radius: 4px;
    }

    .sub-month-year {
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        border-top:solid 1px #c8cfd9;
        border-left: solid 1px #c8cfd9;
        border-right: solid 1px #c8cfd9;
        text-align: center;
        width: 100%;
        height: 30px;
        white-space: nowrap;
        line-height: 30px;
        font-size: 18px;
        font-weight: bold;
        .year-box {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            width: 10px;
            height: 20px;
            vertical-align middle

            .year-up {
                position: absolute;
                box-sizing: border-box;
                display: none;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 9px solid #c8d0db;
                left -1px 
                top -1px
            }
            .year-down {
                position: absolute;
                box-sizing: border-box;
                display: none;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 9px solid #c8d0db;
                left -1px 
                top 10px
            }
            .year-up:hover {
                border-bottom: 9px solid #666666;
            }
            .year-down:hover {
                border-top: 9px solid #666666;                
            }
        }
        .year-box:hover {
            .year-up {
                display: inline-block;
            }
            .year-down {
                display: inline-block;
            }
        }
    }

    .sub-week-list {
        display: inline-block;
        box-sizing: border-box;
        display: inline-block;
        border-left: solid 1px #c8cfd9;
        border-right: solid 1px #c8cfd9;
        width: 100%;
        height: 30px;
    }

    .sub-week-item {
        display: inline-block;
        box-sizing: border-box;
        // border: solid 1px #c8cfd9;
        width: 14.28%;
        height: 30px;
        line-height: 30px;
    }

    .sub-day-list {
        // position: absolute;
        top: 50px;
        border: 1px solid #c8cfd9;
        background: #fff;
        width: 100%;
        max-height: 246px;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 999;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .sub-day-item {
        display: inline-block;
        line-height: 30px;
        // text-indent: 10px;
        text-align: center;
        box-sizing: border-box;
        width: 14.28%;
        height: 30px;
        border-radius: 4px;
        cursor: pointer;        
    }

    // .sub-day-item:hover {
    //     background: #c9cfdb;
    //     color: #00cc00;
    // }

    .iconfont {
        position: absolute;
        top: 7px;
        right: 20px;
        font-size: 24px;
        color: #c9cfda;
    }

    .arrow-mark-left {
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 12px solid #c8d0db;
        left: 10px;
        top: 10px;
    }
    .arrow-mark-left:hover {
        border-right: 12px solid #666666;
    }
    .arrow-mark-right {
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 12px solid #c8d0db;
        right: 10px;
        top: 10px;
    }
    .arrow-mark-right:hover {
        border-left: 12px solid #666666;
    }
}
</style>