<template>
    <div class="sh-layout">
        <div class="sh-layout-content">
            <div class="ny-farm-flow-header">
                <div class="sh-layout-title">{{this.$route.query.group}}-{{this.$route.query.title}}
                    <span class="ny-farm-flow-header--picker">
                        <sh-date-pciker type="date"
                            v-model="dateTime"></sh-date-pciker>
                    </span>
                    <sh-button @click="handleBack"
                        class="ny-farm-flow-header--button"
                        plain>返回</sh-button>
                </div>
            </div>
            <div class="ny-farm-flow-body">
                <div class="sh-layout-subtitle">人员列表</div>
                <sh-row :gutter="20">
                    <sh-col :span="6"
                        :xs="24"
                        :sm="24"
                        :md="12"
                        :lg="12"
                        :xl="6"
                        v-for="(user, index) in userList"
                        :key="index">
                        <div class="ny-farm-user"
                            :class="{'active':selectUser.userName&&selectUser.userName===user.userName}"
                            @click="handeUserClick(user)">
                            <sh-avatar>{{user.userName}}</sh-avatar>
                            <span class="ny-farm-user--name">{{user.userName}}</span>
                            <div class="ny-farm-user--info">
                                <p>
                                    <span :class="{'ny-farm-user--info-number':true,'ny-farm-error-color':user.checkNum<=0}">{{user.checkNum}}</span>/{{checkListNum}}</p>
                                <p>已确认</p>
                            </div>
                            <sh-circle :size="54"
                                :trail-width="7"
                                :stroke-width="8"
                                :percent="getFinishPercent(user.checkNum)">
                                <span :class="{'ny-farm-error-color':user.checkNum<=0}">{{getFinishPercent(user.checkNum)}}%</span>
                            </sh-circle>
                        </div>
                    </sh-col>
                    <sh-col :span="24"
                        v-if="userList.length<1">
                        <div class="ny-farm-user--info-empty">未添加执行人</div>
                    </sh-col>
                </sh-row>
                <div class="ny-farm-subtitle ny-farm-first-subtitle">进度与评价</div>
                <sh-row :gutter="20">
                    <sh-col :span="6">
                        <div class="ny-farm-project-info">
                            <div>{{checkListNum}}</div>
                            <p>确认单总数</p>
                        </div>
                    </sh-col>
                    <sh-col :span="6">
                        <div class="ny-farm-project-info">
                            <div>{{selectUser.checkNum||0}}</div>
                            <p>已确认总数</p>
                        </div>
                    </sh-col>
                    <sh-col :span="6">
                        <div class="ny-farm-project-info">
                            <div>{{evaluaPercent}}%</div>
                            <p>已评价率</p>
                        </div>
                    </sh-col>
                    <sh-col :span="6">
                        <div class="ny-farm-project-info">
                            <div>{{findEvaluaPercent}}%</div>
                            <p>优秀率</p>
                        </div>
                    </sh-col>
                </sh-row>
                <div class="ny-farm-subtitle">确认单列表</div>
                <sh-table :columns="columns"
                    :data="data"
                    @pageChange="pageChange"
                    :operate="false"></sh-table>
            </div>
        </div>
    </div>
</template>
<script>
import ShDatePciker from '@com/sh-ui/components/sh-date-time/sh-date-picker'
import ShRow from '@com/sh-ui/components/sh-row'
import ShCol from '@com/sh-ui/components/sh-col'
import ShAvatar from '@com/sh-ui/components/sh-avatar'
import ShCircle from '@com/sh-ui/components/sh-circle'
import ShButton from '@com/sh-ui/components/sh-button'
import ShTable from "../../components/sh-table";
import moment from 'moment'
export default {
    components: { ShDatePciker, ShRow, ShCol, ShAvatar, ShCircle, ShTable, ShButton },
    data() {
        return {
            dateTime: moment().format("YYYY-MM-DD"),
            columns: [
                { field: "content", title: "确认单内容", width: 1 },
                {
                    field: "check", title: "确认情况", width: 1,
                    formatter(row) {
                        if (row.check) {
                            return '已确认'
                        } else {
                            return `<span style='color: #ff5560;'>未确认</span>`;
                        }
                    }                },
                {
                    field: "evalua", title: "评价", width: 1,
                    formatter(row) {
                        switch (row.evalua) {
                            case 1:
                                return `<span style='color: #fff;background:##F36A6A;border-radius: 2px;padding:3px 5px'>不合格</span>`;
                            case 2:
                                return `<span style='color: #fff;background:##6ebcf9;border-radius: 2px;padding:3px 5px'>合格</span>`;
                            case 3:
                                return `<span style='color: #fff;background:##41A259;border-radius: 2px;padding:3px 5px'>优秀</span>`;
                            default:
                                return `<span style='color: #fff;background: #DDDDDD;border-radius: 2px;padding:3px 5px'>未评价</span>`;
                        }
                    }


                },
            ],
            data: {},
            userList: [],
            checkListNum: 0,
            selectUser: {},
            evaluaNum: 0,
            findEvaluaNum: 0
        }
    },
    computed: {
        evaluaPercent() {
            if (Number(this.evaluaNum) === 0 || Number(this.selectUser.checkNum) === 0) {
                return 0;
            }
            return parseInt(this.evaluaNum / this.selectUser.checkNum);
        },
        findEvaluaPercent() {
            if (Number(this.evaluaNum) === 0 || Number(this.findEvaluaNum) === 0) {
                return 0;
            }
            return parseInt(this.evaluaNum / this.findEvaluaNum);
        }
    },
    methods: {
        pageChange(pageNumber) {
            let params = {
                projectId: this.$route.query.id,
                time: moment().format(),
                pageNo: pageNumber,
                rowNum: 10
            }
            this.$store.dispatch("getProjectCheckLists", params).then(
                data => {
                    this.data = data;
                },
                error => {
                    this.data = {}
                }
            );

        },
        getProjectInfo() {
            let time = this.dateTime ? moment(this.dateTime) : moment();
            let params = { projectId: this.$route.query.id, time: time.format() }
            this.$store.dispatch("getProjectSummary", params).then(
                ({ users, checkListNum, evaluaNum, findEvaluaNum }) => {
                    this.checkListNum = checkListNum;
                    this.evaluaNum = evaluaNum;
                    this.userList = users || [];
                    this.findEvaluaNum = findEvaluaNum;
                    if (this.userList && this.userList.length > 0) {
                        this.handeUserClick(this.userList[0]);
                    }
                },
                error => {
                    this.userList = [];
                }
            );
        },
        getFinishPercent(checkNum) {
            if (Number(checkNum) === 0 || Number(this.checkListNum) === 0) {
                return 0;
            }
            return parseInt(checkNum / this.checkListNum);
        },
        handeUserClick(user) {
            this.selectUser = user;
        },
        handleBack() {
            this.$router.push({
                path: '/farming_flowmanage',
                query: {
                    selectId: this.$route.query.selectGroupId
                }
            })
        }
    },
    watch: {
        dateTime() {
            this.getProjectInfo(this.dateTime)
        }
    },
    mounted() {
        this.getProjectInfo();
        this.pageChange();
    }
}
</script>
<style lang="stylus">
@import '../../../lib/component/sh-ui/styles/layout.styl';

.ny-farm-flow-header {
    color: #444444;
    margin-top: -8px;
    height: 56px;
    border-bottom: 1px solid #E3E8EA;

    .ny-farm-flow-header--button {
        float: right;
        font-weight: normal !important;
    }

    .ny-farm-flow-header--picker {
        width: 250px;
        display: inline-block;
        font-weight: normal;
        margin-left: 40px;
    }
}

.ny-farm-user--info-number {
    color: #41A259;
    font-weight: bold;
}

.ny-farm-error-color {
    color: #ED5E5E;
}

.ny-farm-flow-body {
    padding-top: 24px;

    .ny-farm-user {
        border: 1px solid #E3E8EA;
        padding: 20px 30px;
        border-radius: 2px;
        position: relative;
        margin-bottom: 30px;
        cursor: pointer;

        &.active {
            border: 1px solid #41A259;
            box-shadow: 0 0 16px 0 rgba(65, 162, 89, 0.2);
        }

        .sh-avatar {
            background-color: #6EBCF9;
            color: #ffffff;
            width: 54px;
            height: 54px;
            border-radius: 27px;
            line-height: 54px;
            vertical-align: top;
        }

        .ny-farm-user--name {
            display: inline-block;
            font-size: 14px;
            color: #444444;
            line-height: 54px;
            height: 54px;
            padding-left: 16px;
            vertical-align: top;
        }

        .sh-circle {
            margin-right: 20px;
            margin-left: 30px;
            font-weight: bold;
            float: right;
        }

        .ny-farm-user--info {
            display: inline-block;
            vertical-align: top;
            padding-top: 7px;
            float: right;

            p {
                padding: 0;
                margin: 0;
                height: 20px;
                line-height: 20px;
                color: #999999;
            }
        }
    }

    .ny-farm-user--info-empty {
        text-align: center;
        border: 1px solid #e3e8ea;
        height: 94px;
        line-height: 94px;
        border-radius: 2px;
        position: relative;
        margin-bottom: 30px;
        cursor: pointer;
        color: #999999;
    }

    .ny-farm-subtitle {
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 16px;
        color: #999999;
        line-height: 16px;
    }

    .ny-farm-first-subtitle {
        margin-top: 0px;
    }

    .ny-farm-project-info {
        border: 1px solid #E3E8EA;
        padding: 20px 30px;

        >div {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }

        > p {
            ont-size: 14px;
            color: #999999;
            text-align: center;
            line-height: 14px;
            margin: 0;
            padding: 0;
            height: 24px;
            line-height: 24px;
        }
    }
}
</style>
