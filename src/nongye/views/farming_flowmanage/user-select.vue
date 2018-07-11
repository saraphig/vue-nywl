<template>
    <div class="ny-farm-user-select">
        <div class="ny-farm-user-select--selected"
            v-for="user in value"
            :key="user.id"
            :title="user.userName">
            <i class="iconfont icon-icon_close"
                @click.stop="deleteSelectUser(user.id)"></i>
            <sh-avatar>{{user.userName}}</sh-avatar>
        </div>

        <sh-button left-icon="icon-icon_shipinjiankong_zengjia"
            circle
            plain
            @click.stop="handleAddClick"></sh-button>
        <transition name="ny-farm-user-select--tarintision">
            <div class="ny-farm-user-select--dropdown"
                v-show="visiable"
                v-clickoutside="handleClickOutSide">
                <sh-input placeholder="搜索"
                    v-model="queryText"
                    @keyup.native.enter="queryUser">
                    <i slot="suffix"
                        class="iconfont icon-icon_shipinjiankong_suofang"
                        @click="queryUser"></i>
                </sh-input>
                <sh-checkbox-group v-model="checkIdList">
                    <ul @scroll="handleScrollLoadData">

                        <li v-for="(user, index) in userList"
                            :key="index">
                            <sh-checkbox :label="user.id"
                                @change="handleUserCheck(user)">
                                <sh-avatar>{{user.userName}}</sh-avatar>
                                <span class="ny-farm-user-select--name">{{user.userName}}</span>
                            </sh-checkbox>
                        </li>

                    </ul>
                </sh-checkbox-group>
                <div v-if="userList.length<1"
                    class="ny-fram-confirm-user--empty">
                    <p>
                        <i class="iconfont icon-zanweitianjiaquerendan"></i>
                    </p>
                    <p>暂无查询结果</p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import ShButton from '@com/sh-ui/components/sh-button'
import ShInput from '@com/sh-ui/components/sh-input'
import ShCheckbox from '@com/sh-ui/components/sh-checkbox'
import ShCheckboxGroup from '@com/sh-ui/components/sh-checkbox-group'
import ShAvatar from '@com/sh-ui/components/sh-avatar'
import clickoutside from '@com/sh-ui/directives/clickoutside.js'
export default {
    components: { ShButton, ShInput, ShCheckboxGroup, ShCheckbox, ShAvatar },
    directives: {
        clickoutside
    },
    inject: ['projectContent'],
    data() {
        return {
            visiable: false,
            queryText: '',
            checkIdList: [],
            userList: [],
            pageNo: 1,
            pageTotal: 2
        };
    },
    props: {
        value: Array
    },
    methods: {
        handleAddClick() {
            this.visiable = true;
        },
        handleClickOutSide() {
            this.visiable = false;
        },
        getUsers(queryText) {
            if (this.pageNo > this.pageTotal) {
                return;
            }
            let queryParams = queryText ? { userName: queryText } : {}
            queryParams.pageSize = 20;
            queryParams.pageNo = this.pageNo;
            this.$store.dispatch("getExecuteUsers", queryParams).then(
                ({ data, pageNo, pageTotal }) => {

                    if (data) {
                        this.userList = this.userList.concat(data);
                        this.pageNo += 1;
                    } else {
                        this.userList = [];
                        this.pageNo = 1;
                        this.pageTotal = 2;
                    }
                },
                error => {
                    this.userList = [];
                }
            );
        },
        queryUser() {
            this.pageNo = 1;
            this.userList = [];
            this.getUsers(this.queryText);
        },
        handleScrollLoadData(e) {
            if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight && e.target.scrollTop > 0) {
                this.getUsers(this.queryText);
            }
        },
        handleUserCheck(user) {
            let index = -1;
            for (let i = 0; i < this.value.length; i++) {
                const selectUser = this.value[i];
                if (selectUser.id === user.id) {
                    index = i;
                }
            }
            if (index > -1) {
                this.value.splice(index, 1);
            } else {
                this.value.push(user);
            }
        },
        deleteSelectUser(id) {
            let index = -1;
            for (let i = 0; i < this.value.length; i++) {
                const selectUser = this.value[i];
                if (selectUser.id === id) {
                    index = i;
                }
            }
            this.value.splice(index, 1);
        }
    },
    watch: {
        visiable(value) {
            if (value) {
                this.queryText = '';
                this.queryUser();
            }
        },
        value() {
            debugger
            let idList = [];
            this.value.forEach(item => {
                idList.push(item.userId);
            });
            this.checkIdList = idList;
        }
    }
}
</script>
<style lang="stylus">
.ny-farm-user-select {
    position: relative;

    .sh-avatar {
        background-color: #6EBCF9;
        color: #ffffff;
    }

    .ny-farm-user-select--selected {
        display: inline;
        position: relative;

        >i {
            position: absolute;
            right: 5px;
            top: -15px;
            z-index: 100;
            font-size: 10px;
            border-radius: 50%;
            color: #999999;
            background-color: #eeeeee;
            cursor: pointer;

            &:hover {
                color: #ffffff;
                background-color: #41A259;
            }
        }

        > .sh-avatar {
            margin: 0 10px 10px 0;
        }
    }

    .sh-button {
        border: 1px dashed #dddddd;
        color: #dddddd;
        display: inline-block;
        text-align: center;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        vertical-align: top;
        margin: 0 10px 10px 0;
    }

    .ny-farm-user-select--dropdown {
        background-color: #ffffff;
        width: 280px;
        box-sizing: border-box;
        box-shadow: 0 0 20px 0 #E3E8EA;
        border-radius: 2px;
        position: absolute;
        z-index: 900;
        padding: 34px 20px;
        margin-top: 10px;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 260px;
            overflow: auto;
            margin-top: 10px;
            padding-right: 15px;

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

            li {
                list-style: none;
                padding: 0;
                margin: 0;
                height: 52px;
                line-height: 52px;
                border-bottom: 1px solid rgba(227, 232, 234, 0.5);

                .ny-farm-user-select--name {
                    padding-left: 15px;
                }
            }
        }
    }

    .ny-farm-user-select--tarintision-enter-active, .ny-farm-user-select--tarintision-leave-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        transform-origin: center top;
    }

    .ny-farm-user-select--tarintision-enter, .ny-farm-user-select--tarintision-leave-active {
        opacity: 0;
        transform: scaleY(0);
    }

    .ny-fram-confirm-user--empty {
        font-size: 14px;
        color: #999999;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;

        i {
            font-size: 50px;
        }

        p {
            margin: 15px 0;
        }
    }
}
</style>


