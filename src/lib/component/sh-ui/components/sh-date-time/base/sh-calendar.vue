<template>
    <div :class="['sh-calendar',{
        'sh-calendar-border':border
    }]">
        <!-- 日期选择开始 -->
        <div v-if="showView==='date'">
            <div class="sh-calendar--header">
                <i class="iconfont icon-arrow_doubleleft sh-calendar--button sh-calendar--button-prev-year"
                    @click="handlePrevYear"></i>
                <i class="iconfont icon-arrow_left sh-calendar--button sh-calendar--button-prev-month"
                    @click="handlePrevMonth"></i>
                <span class="sh-calendar--header-label"
                    @click="switchYearSelect(false)">{{year}}年</span>
                <span class="sh-calendar--header-label"
                    @click="switchMonthSelect">{{month}}月</span>
                <i class="iconfont icon-arrow_right sh-calendar--button sh-calendar--button-next-month"
                    @click="handleNextMonth"></i>
                <i class="iconfont icon-arrow_doubleright sh-calendar--button sh-calendar--button-next-year"
                    @click="handleNextYear"></i>
            </div>
            <div class="sh-calendar--body">
                <sh-date-table :date-value="dateTime"
                    :value="selectedDateValue"
                    :disabled-date="disabledCalendarDate"
                    @date-click="handleDateClick"></sh-date-table>
            </div>
        </div>
        <!-- 日期选择结束 -->

        <!-- 月份选择开始 -->
        <div v-if="showView==='month'">
            <div class="sh-calendar--header">
                <i class="iconfont icon-arrow_doubleleft sh-calendar--button sh-calendar--button-prev-year"
                    @click="handlePrevYear"></i>
                <span class="sh-calendar--header-label"
                    @click="switchYearSelect(true)">{{year}}年</span>
                <i class="iconfont icon-arrow_doubleright sh-calendar--button sh-calendar--button-next-year"
                    @click="handleNextYear"></i>
            </div>
            <div class="sh-calendar--body">
                <sh-month-table :date-value="dateTime"
                    :value="selectedDateValue"
                    :disabled-date="disabledCalendarDate"
                    @month-click="handleMonthClick"></sh-month-table>
            </div>
        </div>
        <!-- 月份选择结束 -->

        <!-- 年份选择开始 -->
        <div v-if="showView==='year'">
            <div class="sh-calendar--header">
                <i class="iconfont icon-arrow_doubleleft sh-calendar--button sh-calendar--button-prev-year"
                    @click="handlePrevPageYear"></i>
                <span class="sh-calendar--header-label">{{startYear}}年 - {{endYear}}年</span>
                <i class="iconfont icon-arrow_doubleright sh-calendar--button sh-calendar--button-next-year"
                    @click="handleNextPageYear"></i>
            </div>
            <div class="sh-calendar--body">
                <sh-year-table :date-value="dateTime"
                    :value="selectedDateValue"
                    :disabled-date="disabledCalendarDate"
                    @year-click="handleYearClick"></sh-year-table>
            </div>
        </div>
        <!-- 年份选择结束 -->

        <!-- 时间选择开始 -->
        <div v-if="showView==='time'">
            <div class="sh-calendar--header">
                <span class="sh-calendar--header-label">{{year}}年</span>
                <span class="sh-calendar--header-label">{{month}}月</span>
                <span class="sh-calendar--header-label">{{day}}日</span>
            </div>
            <div class="sh-calendar--time">
                <sh-time-table @time-click="handleTimeClick"></sh-time-table>
            </div>
        </div>
        <!-- 时间选择结束 -->

    </div>

</template>
<script>
import moment from 'moment'
import ShDateTable from './sh-date-table'
import ShMonthTable from './sh-month-table'
import ShYearTable from './sh-year-table'
import ShTimeTable from './sh-time-table'
export default {
    name: "ShCalendar",
    componentName: "ShCalendar",
    components: { ShDateTable, ShMonthTable, ShYearTable, ShTimeTable },
    props: {
        value: String,
        type: {
            type: String,
            default: 'date'
        },
        border: {
            type: Boolean,
            default: true
        },
        disabledDate: Function
    },
    data() {
        return {
            dateValue: this.value ? moment(this.value) : moment(),
            selectedDateValue: this.value ? moment(this.value) : null,
            showView: this.type,
            isSwitchMonth: false
        }
    },
    computed: {
        dateTime: {
            get() {
                return this.dateValue;
            },
            set(date) {
                this.dateValue = moment(date);
            }
        },
        year() {
            return this.dateTime.year();
        },
        month() {
            return this.dateTime.month() + 1;
        },
        day() {
            return this.dateTime.date()
        },
        startYear() {
            return this.dateTime.year() - this.dateTime.year() % 10
        },
        endYear() {
            return this.dateTime.year() - this.dateTime.year() % 10 + 9
        }
    },
    methods: {
        handlePrevYear() {
            this.dateTime = this.dateTime.subtract(1, 'years');
        },
        handleNextYear() {
            this.dateTime = this.dateTime.add(1, 'years');
        },
        handlePrevMonth() {
            this.dateTime = this.dateTime.subtract(1, 'months');
        },
        handleNextMonth() {
            this.dateTime = this.dateTime.add(1, 'months');
        },
        handlePrevPageYear() {
            this.dateTime = this.dateTime.set('year', this.startYear - 1);
        },
        handleNextPageYear() {
            this.dateTime = this.dateTime.set('year', this.endYear + 1);
        },
        switchYearSelect(isSwitchMonth) {
            this.showView = "year";
            this.$nextTick(() => {
                this.isSwitchMonth = isSwitchMonth;
            })

        },
        switchMonthSelect() {
            this.showView = "month";
        },
        handleYearClick(year) {
            if (this.startYear - 1 === year) {
                this.handlePrevPageYear();
                return;
            }
            if (this.endYear + 1 === year) {
                this.handleNextPageYear();
                return;
            }
            this.dateTime = this.dateTime.year(year);
            if (this.isSwitchMonth) {
                this.showView = 'month';
                return;
            }
            if (this.type === "year") {
                this.selectDate(this.dateTime)
                return
            }
            this.showView = 'date';
        },
        handleMonthClick(month) {
            this.dateTime = this.dateTime.month(month);
            if (this.type === "month") {
                this.selectDate(this.dateTime)
                return
            }
            this.showView = 'date';
        },
        handleDateClick(date) {
            if (date.isBefore(this.dateTime, 'month')) {
                this.handlePrevMonth();
                return;
            }
            if (date.isAfter(this.dateTime, 'month')) {
                this.handleNextMonth();
                return;
            }
            this.selectDate(date);
        },
        handleTimeClick(date) {
            this.selectDate(date);
        },
        selectDate(date) {
            this.$emit("date-select", date);
        },
        disabledCalendarDate(date) {
            if (this.showView !== this.type) {
                return false;
            }
            if (this.disabledDate) {
                return this.disabledDate(date);
            } else {
                return false;
            }
        }
    },
    watch: {
        showView() {
            this.isSwitchMonth = false;
        },
        value() {
            this.selectedDateValue = this.value ? moment(this.value) : null;
        },
        type() {
            this.showView = this.type;
        }
    }
}
</script>
<style lang="stylus">
@import '../../../styles/variable';

.sh-calendar {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    color: $--date-time-color;
    width: 306px;

    &.sh-calendar-border {
        border: 1px solid $--date-time-boder-color;
    }

    .sh-calendar--header {
        height: 40px;
        line-height: 40px;
        text-align: center;
        user-select: none;
        position: relative;
        font-size: 14px;
        border-bottom: 1px solid $--date-time-boder-color;

        .sh-calendar--button {
            position: absolute;
            top: 0;
            color: $--date-time-color;
            padding: 0 5px;
            font-size: 18px;
            display: inline-block;
            line-height: 40px;
            cursor: pointer;

            &:hover {
                color: $--date-time-button-hover-color;
            }
        }

        .sh-calendar--button-prev-year {
            left: 7px;
        }

        .sh-calendar--button-prev-month {
            left: 29px;
        }

        .sh-calendar--button-next-month {
            right: 29px;
        }

        .sh-calendar--button-next-year {
            right: 7px;
        }

        .sh-calendar--header-label {
            padding: 0 4px;
            font-weight: 500;
            display: inline-block;
            line-height: 40px;
            cursor: pointer;

            &:hover {
                color: $--date-time-button-hover-color;
            }
        }
    }

    .sh-calendar--body {
        padding: 8px 12px;
    }

    .sh-calendar--time {
        .sh-time-table {
            width: 304px;

            .sh-time-table--body-select {
                height: 296px;

                &.sh-time-table--hour {
                    width: 101px;
                }

                &.sh-time-table--minute {
                    width: 102px;
                }

                &.sh-time-table--second {
                    width: 101px;
                }
            }
        }
    }
}
</style>

