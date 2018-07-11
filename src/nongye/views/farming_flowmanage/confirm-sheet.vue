<template>
    <div class="ny-fram-confirm-sheet">
        <sh-row>
            <sh-col :span="11">
                <div class="ny-fram-confirm-sheet--title">确认单列表</div>
                <div class="ny-fram-confirm-sheet--search">
                    <sh-input placeholder="搜索"
                        v-model="queryText"
                        @keyup.native.enter="queryConfirmOrder">
                        <i slot="suffix"
                            class="iconfont icon-icon_shipinjiankong_suofang"
                            @click="queryConfirmOrder"></i>
                    </sh-input>
                </div>
                <sh-checkbox-group v-model="checkedIdList"
                    class="ny-farm-confirm-sheet--group"
                    @scroll.native="handleScrollLoadData">
                    <div class="ny-fram-confirm-sheet--item"
                        v-for="(confirmOrder, index) in confirmOrders"
                        :key="index">
                        <p>{{confirmOrder.content}}</p>
                        <span>
                            <sh-checkbox :label="confirmOrder.id"
                                @change="handleOrderCheck(confirmOrder)"></sh-checkbox>
                        </span>
                    </div>

                    <div v-if="confirmOrders.length<1"
                        class="ny-fram-confirm-sheet--empty">
                        <p>
                            <i class="iconfont icon-zanweitianjiaquerendan"></i>
                        </p>
                        <p>暂无查询结果</p>
                    </div>
                </sh-checkbox-group>
            </sh-col>
            <sh-col class="ny-farm-confirm-sheet--separator"
                :span="2">
                <div></div>
            </sh-col>
            <sh-col :span="11">
                <div class="ny-fram-confirm-sheet--title">
                    已选确认单（
                    <span style="color:#41A259">{{value.length}}条</span>）
                </div>
                <div class="ny-farm-confirm-sheet--list">

                    <div class="ny-fram-confirm-sheet--item"
                        v-for="(item, index) in value"
                        :key="index">
                        <p>{{item.content}}</p>
                        <i class="iconfont icon-icon_xiaofucengguanbishanchu"
                            @click="deleteSelectConfirmList(item.id)"></i>
                    </div>

                    <div v-if="value.length<1"
                        class="ny-fram-confirm-sheet--empty">
                        <p>
                            <i class="iconfont icon-zanweitianjiaquerendan"></i>
                        </p>
                        <p>暂未添加确认单</p>
                    </div>

                </div>
            </sh-col>
        </sh-row>
    </div>
</template>
<script>
import ShRow from '@com/sh-ui/components/sh-row'
import ShCol from '@com/sh-ui/components/sh-col'
import ShInput from '@com/sh-ui/components/sh-input'
import ShCheckbox from '@com/sh-ui/components/sh-checkbox'
import ShCheckboxGroup from '@com/sh-ui/components/sh-checkbox-group'
export default {
    components: { ShRow, ShCol, ShInput, ShCheckboxGroup, ShCheckbox },
    data() {
        return {
            queryText: "",
            confirmOrders: [],
            pageNo: 1,
            pageTotal: 2,
            checkedIdList: [],
        }
    },
    inject: ['projectContent'],
    props: {
        value: Array
    },
    methods: {
        getConfirmOrders(queryText) {
            if (this.pageNo > this.pageTotal) {
                return;
            }
            let queryParams = queryText ? { content: queryText } : {};
            queryParams.pageSize = 20;
            queryParams.pageNo = this.pageNo;
            this.$store.dispatch("getConfirmOrders", queryParams).then(
                ({ data, pageNo, pageTotal }) => {
                    this.pageTotal = pageTotal;
                    if (data) {
                        this.confirmOrders = this.confirmOrders.concat(data);
                        this.pageNo += 1;
                    } else {
                        this.confirmOrders = [];
                        this.pageNo = 1;
                        this.pageTotal = 2;
                    }
                },
                error => {
                    this.confirmOrders = [];
                }
            );
        },
        queryConfirmOrder() {
            this.pageNo = 1;
            this.confirmOrders = [];
            this.getConfirmOrders(this.queryText);
        },
        handleScrollLoadData(e) {
            if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight && e.target.scrollTop > 0) {
                this.getConfirmOrders(this.queryText);
            }
        },
        handleOrderCheck(order) {
            let index = -1;
            for (let i = 0; i < this.value.length; i++) {
                const selectOrder = this.value[i];
                if (selectOrder.id === order.id) {
                    index = i;
                }
            }
            if (index > -1) {
                this.value.splice(index, 1);
            } else {
                this.value.push(order);
            }
        },
        deleteSelectConfirmList(id) {
            let index = -1;
            for (let i = 0; i < this.value.length; i++) {
                const selectOrder = this.value[i];
                if (selectOrder.id === id) {
                    index = i;
                }
            }
            this.value.splice(index, 1);
        }
    },
    watch: {
        'projectContent.visiable'(value) {
            if (value) {
                this.queryText = '';
                this.queryConfirmOrder();
            }
        },
        value() {
            let idList = [];
            this.value.forEach(item => {
                idList.push(item.id);
            });
            this.checkedIdList = idList;
        }
    }
}
</script>
<style lang="stylus">
.ny-fram-confirm-sheet {
    width: 910px;
    border: 1px solid #E3E8EA;
    padding: 20px;

    p {
        margin: 0;
        padding: 0;
    }

    .ny-fram-confirm-sheet--title {
        color: #999999;
        font-size: 12px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
    }

    .ny-fram-confirm-sheet--search {
        margin-bottom: 20px;
        padding-right: 25px;
    }

    .ny-fram-confirm-sheet--item {
        position: relative;
        padding: 10px 35px 10px 15px;
        background: #FFFFFF;
        border: 1px solid #E3E8EA;
        border-radius: 2px;
        font-size: 14px;
        color: #444444;
        margin-bottom: 15px;
        box-sizing: border-box;
        width: 392px;

        > span, > i {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }

        > i {
            color: #CCCCCC;
            display: none;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            > i {
                display: inline-block;
            }
        }
    }

    .ny-farm-confirm-sheet--group {
        height: 300px;
        overflow-y: auto;
        padding-right: 15px;

        &::-webkit-scrollbar {
            height: 6px;
            width: 6px;
            // margin-right: 5px;
            background-color: rgba(241, 247, 250, 0.8);
            transition: all 0.3s ease-in-out;
            border-radius: 3px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: #41A259;
        }
    }

    .ny-farm-confirm-sheet--separator {
        height: 400px;
        padding: 10px 0 5px 0;
        text-align: center;

        > div {
            width: 1px;
            background-color: #F6F9FB;
            height: 100%;
            display: inline-block;
        }
    }

    .ny-farm-confirm-sheet--list {
        height: 360px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            height: 6px;
            width: 6px;
            margin-right: 5px;
            background-color: rgba(241, 247, 250, 0.8);
            transition: all 0.3s ease-in-out;
            border-radius: 3px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: #41A259;
        }

        .ny-fram-confirm-sheet--empty {
            padding-top: 130px;
        }
    }

    .ny-fram-confirm-sheet--empty {
        font-size: 14px;
        color: #999999;
        text-align: center;
        padding-top: 70px;

        i {
            font-size: 50px;
        }

        p {
            margin: 15px 0;
        }
    }
}
</style>


