<template>
    <div class="sh-layout ny-page-monitor">
        <div class="sh-layout-content">
            <!-- 头部信息 -->
            <div class="ny-layout-header">
                <div class="sh-layout-title">实时状态</div>
                <div class="header-select">
                    <sh-select v-model="areaCode"
                        :filter="true"
                        placeholder="搜索地块名称">
                        <sh-option v-for="area in areaSelectList"
                            :key="area.id"
                            :label="area.idName"
                            :value="area.areaCode">
                        </sh-option>
                    </sh-select>
                </div>
            </div>
            <!-- 地块标题 -->
            <div class="sh-layout-subtitle">
                <span>{{subTitle}}</span>
                <span class="ny-layout-tooltip">
                    <i class="iconfont icon-icon_shishijiankong_yichangshuoming"></i>
                    <div>
                        <p>监测异常状态</p>
                        <div class="ny-status">
                            <i class="iconfont icon-icon_shishijiankong_guogao"></i>
                            <p>过高</p>
                        </div>
                        <div class="ny-status">
                            <i class="iconfont icon-icon_shishijiankong_guodi"></i>
                            <p>过低</p>
                        </div>
                        <div class="ny-status">
                            <i class="iconfont icon-icon_shishijiankong_piangao"></i>
                            <p>偏高</p>
                        </div>
                        <div class="ny-status">
                            <i class="iconfont icon-icon_shishijiankong_piandi"></i>
                            <p>偏低</p>
                        </div>
                        <div class="ny-status">
                            <i class="iconfont icon-icon_shishijiankong_duankai"></i>
                            <p>断开</p>
                        </div>
                    </div>
                </span>
            </div>
            <sh-row :gutter="20">
                <sh-col :span="4"
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    :xl="4"
                    v-for="(device, index) in monitorDeviceList"
                    :key="index">
                    <div :class="['ny-monitor-info',{'active':device.id===selectDevice.id}]"
                        @click="handleLoadChartData(device)">
                        <i :class="['iconfont',getMointorIcon(device.assertName),'ny-monitor-info--icon']"></i>
                        <div>
                            <p class="title"
                                :title="device.assertName">{{device.assertName}}</p>
                            <p :title="convertTitle(device)">
                                <span>{{convertTitle(device)}}</span>
                                <i :class="['iconfont',getStatusIcon(device.deviceStatusName)]"></i>
                            </p>
                        </div>

                    </div>
                </sh-col>
            </sh-row>
            <div class="ny-monitor-line"></div>
            <div class="ny-chart-empty"
                v-if="chartData.length<1">暂无监测数据</div>
            <sh-row :gutter="20"
                v-else>
                <sh-col>
                    <div class="ny-monitor-chart--description">
                        <i :class="['iconfont',chartIcon]"></i>
                        <span>{{selectDevice.assertName}}</span>
                        <span>({{selectDevice.unit}})</span>
                    </div>
                </sh-col>
                <sh-col class="chart-box">
                    <sh-echart :chartData="chartData"
                        ref="$realStat"
                        echartsType="TimeBar"
                        :titleText="selectDevice.assertName"
                        :subtitle="selectDevice.unit"
                        xText=""
                        yText=""
                        :unit="selectDevice.unit"></sh-echart>
                </sh-col>
            </sh-row>

        </div>
    </div>
</template>

<script>
import ShSelect from '@com/sh-ui/components/sh-select/sh-select'
import ShOption from '@com/sh-ui/components/sh-select/sh-option'
import ShRow from '@com/sh-ui/components/sh-row'
import ShCol from '@com/sh-ui/components/sh-col'
import ShEchart from "@com/sh_echart";
import moment from 'moment'
import { setResizeCallback } from "@lib/js/mUtils";
import { getStore, setStore } from '@lib/js/mUtils';

export default {
    name: "page-monitor",
    components: { ShSelect, ShOption, ShRow, ShCol, ShEchart },
    data() {
        return {
            // 选中的地块名称
            areaCode: '',
            // 地块下拉框数据
            areaSelectList: [],
            //监测设备信息
            monitorDeviceList: [],
            // 图表数据
            chartData: [],
            // 选中设备信息
            selectDevice: {},
            loacalStoreCode: 'monitor-area-code'
        }
    },
    methods: {
        getAreaList() {
            this.$store.dispatch('fetchMonitorAreaGet', {
                pageNo: 1,
                pageSize: 1000
            }).then(({ data }) => {
                this.areaSelectList = data || [];
                this.$nextTick(() => {
                    let cacheCode = getStore(this.loacalStoreCode);
                    if (cacheCode) {
                        this.areaCode = cacheCode;
                    } else {
                        if (this.areaSelectList[0]) {
                            this.areaCode = this.areaSelectList[0].areaCode;
                        }
                    }
                })
            }, error => {
                this.areaSelectList = [];
            });
        },
        getAreaMoinitorList() {
            let queryParams = { areaCode: this.areaCode, deviceType: 1 }
            this.$store.dispatch("fetchMonitorAreaListGet", queryParams).then((data) => {
                this.monitorDeviceList = data || [];
                if (this.monitorDeviceList[0]) {
                    this.handleLoadChartData(this.monitorDeviceList[0]);
                }
            }, error => {
                this.monitorDeviceList = [];
            });
        },
        convertTitle(device) {
            if (device.field === undefined) {
                return '-';
            }
            return device.field + (device.unit || '')
        },
        handleLoadChartData(device) {
            this.chartData = [];
            this.selectDevice = device;
            let queryParams = {
                startTime: moment().subtract(1, 'day').valueOf(),
                endTime: moment().valueOf(),
                id: device.id,
                period: "2h",
                pageNo: 1,
                pageSize: 10
            }
            // 查询获取图表数据
            this.$store.dispatch("fetchMonitorGet", queryParams).then(
                ({ data }) => {
                    this.chartData = data || [];
                },
                error => {
                    this.chartData = [];
                }
            );
        },
        getMointorIcon(text) {
            let icon = 'icon-icon_tianqi_wushuju';
            if (!text) return text;
            text = text.toUpperCase();
            let incnMap = {
                '温度': 'icon-icon_jiankongzhongxin_turangwendu_b',
                '湿度': 'icon-icon_jiankongzhongxin_turangshidu_b',
                '盐度': 'icon-icon_jiankongzhongxin_turangyandu_b',
                '光照': 'icon-icon_jiankongzhongxin_dapengguangzhao_b',
                'CO': 'icon-icon_jiankongzhongxin_dapengCO_b',
                'PH': 'icon-icon_jiankongzhongxin_turangPH_b',
                '气压': 'icon-icon-icon_daohang_caidanshouqi',
                '土壤盐度': 'icon-icon_jiankongzhongxin_turangyandu_s',
                '土壤盐度': 'icon-icon_jiankongzhongxin_turangyandu_b',
                '大棚温度': 'icon-icon_jiankongzhongxin_dapengwendu_s',
                '大棚温度': 'icon-icon_jiankongzhongxin_dapengwendu_b',
                '土壤温度': 'icon-icon_jiankongzhongxin_turangwendu_s',
                '土壤温度': 'icon-icon_jiankongzhongxin_turangwendu_b',
                '大棚CO': 'icon-icon_jiankongzhongxin_dapengCO_s',
                '大棚CO': 'icon-icon_jiankongzhongxin_dapengCO_b',
                '土壤PH': 'icon-icon_jiankongzhongxin_turangPH_s',
                '土壤PH': 'icon-icon_jiankongzhongxin_turangPH_b',
                '土壤湿度': 'icon-icon_jiankongzhongxin_turangshidu_s',
                '土壤湿度': 'icon-icon_jiankongzhongxin_turangshidu_b',
                '大棚光照': 'icon-icon_jiankongzhongxin_dapengguangzhao_s',
                '大棚光照': 'icon-icon_jiankongzhongxin_dapengguangzhao_b'
            }

            for (var key in incnMap) {
                if (text.indexOf(key) > -1) {
                    icon = incnMap[key];
                };
            };
            return icon;
        },
        getStatusIcon(text) {
            switch (text) {
                case '过高':
                    return 'icon-icon_shishijiankong_guogao';
                case '过低':
                    return 'icon-icon_shishijiankong_guodi';
                case '偏高':
                    return 'icon-icon_shishijiankong_piangao';
                case '偏低':
                    return 'icon-icon_shishijiankong_piandi';
                case '断开':
                    return 'icon-icon_shishijiankong_duankai';
                default:
                    return '';
            }

        }
    },
    computed: {
        chartIcon() {
            return this.getMointorIcon(this.selectDevice.assertName);
        },
        subTitle() {
            if (this.areaCode) {
                for (let i = 0; i < this.areaSelectList.length; i++) {
                    const area = this.areaSelectList[i];
                    if (area.areaCode === this.areaCode) {
                        return area.idName;
                    }
                }
            } else {
                return '正在加载中...';
            }
        }
    },
    watch: {
        areaCode() {
            this.getAreaMoinitorList();
            this.chartData = [];
            setStore(this.loacalStoreCode, this.areaCode)
        }
    },
    created() {
        this.getAreaList();
    },
    mounted() {
        setResizeCallback((fontSize, clientWidth) => {
            if (this.$refs.$realStat != undefined && typeof this.$refs.$realStat.chartResize == "function") {
                this.$refs.$realStat.chartResize();
            }
        });
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../lib/component/sh-ui/styles/layout.styl';

.ny-page-monitor {
    .ny-layout-header {
        margin-top: -8px;
        height: 56px;
        border-bottom: 1px solid #e3e8ea;
    }

    .sh-layout-title {
        display: inline-block;
    }

    .header-select {
        width: 250px;
        display: inline-block;
        font-weight: normal;
        margin-left: 40px;
    }

    .ny-layout-tooltip {
        position: relative;

        >i {
            position: relative;
            top: 2px;
            font-size: 20px;
            cursor: pointer;
        }

        &:hover {
            > div {
                display: inline-block;
            }
        }

        > div {
            display: none;
            box-sizing: border-box;
            position: absolute;
            width: 200px;
            height: 244px;
            top: 23px;
            left: 0;
            font-size: 14px;
            line-height: 34px;
            color: #444;
            background: #fff;
            border: 1px solid #e3e8ea;
            box-shadow: 0 0 20px 0 #e3e8ea;
            border-radius: 2px;
            padding: 20px;
            z-index: 999;

            > p {
                color: #999;
            }

            .ny-status {
                position: relative;

                > i {
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                > p {
                    padding-left: 25px;
                }
            }
        }
    }

    .ny-monitor-info {
        border: 1px solid #e3e8ea;
        height: 72px;
        position: relative;
        padding: 10px 30px 10px 30px;
        box-sizing: border-box;
        margin-bottom: 15px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;

        &.active {
            border: 1px solid #41a259;
            box-shadow: 0 0 16px 0 rgba(65, 162, 89, 0.2);
        }

        i {
            font-size: 18px;

            &.ny-monitor-info--icon {
                width: 36px;
                height: 36px;
                font-size: 36px;
                color: #41a259;
                position: relative;
                top: -5px;
            }
        }

        > div {
            display: inline-block;
            padding-left: 15px;
            padding-right: 10px;

            p {
                max-width: 110px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            > p:first-child {
                color: #999;
                padding: 3px 0px;
                text-align: left;
            }

            > p:last-child {
                text-align: left;
                font-size: 20px;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                max-width: 90px;

                i {
                    font-weight: normal;
                }
            }
        }
    }

    .ny-monitor-chart--description {
        height: 24px;
        line-height: 24px;

        i {
            font-size: 24px;
            color: #41a259;
            vertical-align: top;
        }

        span {
            vertical-align: top;
            font-size: 16px;
            color: #444444;

            &:last-child {
                color: #999;
            }
        }
    }

    .chart-box {
        height: 450px;
    }

    .ny-monitor-line {
        border-bottom: 1px solid #e1e6e9;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .ny-chart-empty {
        height: 450px;
        text-align: center;
        line-height: 450px;
        font-size: 24px;
        color: #888;
    }

    .icon-icon_shishijiankong_guogao {
        color: #ed5e5e;
    }

    .icon-icon_shishijiankong_guodi {
        color: #3b61ff;
    }

    .icon-icon_shishijiankong_piangao {
        color: #f9ab21;
    }

    .icon-icon_shishijiankong_piandi {
        color: #56b5ff;
    }

    .icon-icon_shishijiankong_duankai {
        color: #cccccc;
    }
}
</style>

