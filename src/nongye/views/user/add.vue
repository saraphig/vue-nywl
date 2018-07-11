<template>
    <div class="sh-layout">
        <div class="sh-layout-content">
            <div class="sh-layout-header">
                <div class="sh-layout-title">{{this.$route.query.title}}</div>
                <sh-button @click="handleConfirmClick">保存</sh-button>
                <sh-button plain
                    @click="handleCanelClick">取消</sh-button>
            </div>

            <div class="sh-layout-subtitle">基础信息</div>
            <sh-row class="sh-form sh-from-font6"
                :gutter="20">
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>用户姓名:</label>
                    <div class="sh-form-text">
                        <sh-input placeholder="请输入用户姓名"
                            v-model="userName"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>人员状态:</label>
                    <div class="sh-form-text">
                        <sh-select placeholder="请选择人员状态"
                            v-model="used">
                            <sh-option label="启用"
                                :value="1">
                            </sh-option>
                            <sh-option label="禁用"
                                :value="0">
                            </sh-option>
                        </sh-select>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>电子邮箱:</label>
                    <div class="sh-form-text">
                        <sh-input placeholder="请输入电子邮箱"
                            v-model="email"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>性别:</label>
                    <div class="sh-form-text">
                        <sh-select placeholder="请选择性别"
                            v-model="sexName">
                            <sh-option label="男"
                                value="男">
                            </sh-option>
                            <sh-option label="女"
                                value="女">
                            </sh-option>
                        </sh-select>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>所属角色:</label>
                    <div class="sh-form-text">
                        <sh-select placeholder="请选择所属角色"
                            v-model="groupIds">
                            <sh-option v-for="(userItem, index) in userList"
                                :key="index"
                                :value="userItem.userGroupId"
                                :label="userItem.userGroupName">
                            </sh-option>
                        </sh-select>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">
                        <span class="require">*</span>手机号码:</label>
                    <div class="sh-form-text">
                        <sh-input placeholder="请输入手机号码"
                            v-model="telephone"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">微信昵称:</label>
                    <div class="sh-form-text">
                        <sh-input :disabled="true"
                            v-model="weChatName"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">公众号昵称:</label>
                    <div class="sh-form-text">
                        <sh-input :disabled="true"
                            v-model="weChatMpName"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">小程序名称:</label>
                    <div class="sh-form-text">
                        <sh-input :disabled="true"
                            v-model="weChatMaName"></sh-input>
                    </div>
                </sh-col>
                <sh-col :span="12">
                    <label class="sh-form-label">绑定时间:</label>
                    <div class="sh-form-text">
                        <sh-input :disabled="true"
                            v-model="weChatMpBindingDateTime"></sh-input>
                    </div>
                </sh-col>
            </sh-row>

            <div class="sh-layout-subtitle">备注说明</div>
            <sh-row>
                <sh-col>
                    <sh-textarea placeholder="备注说明"
                        :autosize="{minRows: 3,maxRows: 3}"></sh-textarea>
                </sh-col>
            </sh-row>

        </div>
    </div>
</template>
<script>
import ShButton from "@com/sh-ui/components/sh-button";
import ShRow from "@com/sh-ui/components/sh-row";
import ShCol from "@com/sh-ui/components/sh-col";
import ShInput from "@com/sh-ui/components/sh-input";
import ShTextarea from "@com/sh-ui/components/sh-textarea/sh-textarea";
import ShSelect from '@com/sh-ui/components/sh-select/sh-select'
import ShOption from '@com/sh-ui/components/sh-select/sh-option'
import { mapGetters } from "vuex";
import moment from 'moment'
export default {
    components: { ShButton, ShRow, ShCol, ShInput, ShTextarea, ShSelect, ShOption },
    data() {
        return {
            userName: "",
            email: "",
            used: 1,
            sexName: '男',
            groupIds: "",
            telephone: "",
            remark: "",
            weChatName: '',
            weChatMpName: '',
            weChatMaName: '',
            weChatMpBindingDateTime: '',
            userList: [],
            userInfo: {}
        }
    },
    computed: {
        ...mapGetters({
            organizationEntity: 'getOrganizationEntity'
        })
    },
    methods: {
        getRoleList() {
            let queryParams = {
                pageNo: 1,
                pageSize: 100000
            }
            this.$store.dispatch("getRoleList", queryParams).then(
                ({ data }) => {
                    this.userList = data || [];
                },
                error => {
                    this.userList = [];
                });
        },
        getFormInfo() {
            let formInfo = {
                areaCode: this.organizationEntity.areaCode,
                loginCode: this.telephone,
                userName: this.userName,
                email: this.email,
                used: this.used ? true : false,
                sexName: this.sexName,
                groupIds: this.groupIds.toString(),
                telephone: this.telephone,
                remark: this.remark
            }
            return formInfo
        },
        addUserInfo() {
            let form = this.getFormInfo();
            form.password = this.telephone.substr(this.telephone.length - 6)
            this.$store.dispatch("addUserInfo", form).then(
                ({ msg, status }) => {
                    if (status === 0) {
                        this.handleCanelClick();
                    } else {
                        alert(msg);
                        return
                    }
                },
                error => {
                    if (error) {
                        alert(error);
                    }
                });
        },
        editUserInfo() {
            let form = this.getFormInfo();
            let userInfo = Object.assign({}, this.userInfo, form);
            this.$store.dispatch("updateUserInfo", userInfo).then(
                ({ msg, status }) => {
                    if (status === 0) {
                        this.handleCanelClick();
                    } else {
                        alert(msg);
                        return
                    }
                },
                error => {
                    if (error) {
                        alert(error);
                    }
                });
        },
        handleCanelClick() {
            this.$router.push({
                path: '/user'
            });
        },
        handleConfirmClick() {
            if (!this.userName) {
                alert("请输入用户姓名");
                return;
            }
            if (!this.email) {
                alert("请输入邮箱");
                return;
            }
            if (this.email && /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.email) === false) {
                alert("请输正确的邮箱");
                return;
            }
            if (!this.groupIds) {
                alert("请选择角色");
                return;
            }
            if (!this.telephone) {
                alert("请输入手机号码");
                return;
            }
            if (this.telephone && /^\d{11}$/.test(this.telephone) === false) {
                alert("请输正确的手机号码");
                return;
            }

            if (this.$route.query.title === "新增用户") {
                this.addUserInfo();
            } else {
                this.editUserInfo();
            }

        },
        getUserInfo() {
            this.$store.dispatch("getUserAllInfoById", { id: this.$route.query.id }).then(
                data => {
                    this.userInfo = data;
                    this.loginCode = data.telephone;
                    this.userName = data.userName;
                    this.email = data.email;
                    this.used = data.used ? 1 : 0;
                    this.sexName = data.sexName;
                    this.groupIds = Number(data.groupIds);
                    this.telephone = data.telephone;
                    this.password = data.password;
                    this.remark = data.remark;
                    if (data.wxUser) {
                        this.weChatName = data.wxUser.weChatName;
                        this.weChatMpName = data.wxUser.weChatMpName;
                        this.weChatMaName = data.wxUser.weChatMaName;
                        this.weChatMpBindingDateTime = data.wxUser.weChatMpBindingDateTime ?
                            moment(data.wxUser.weChatMpBindingDateTime).format("YYYY-MM-DD HH:mm:ss") : '';
                    }
                },
                error => {
                    if (error) {
                        alert(error);
                    }
                });
        }

    },
    created() {
        this.getRoleList();
    },
    mounted() {
        if (this.$route.query.id) {
            this.getUserInfo();
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../lib/component/sh-ui/styles/layout.styl';
@import '../../../lib/css/form.styl';

.sh-layout {
    .sh-layout-header {
        .sh-layout-title {
            display: inline-block;
        }

        .sh-button {
            float: right;
            margin-left: 20px;
        }
    }

    .sh-layout-subtitle {
        margin-left: -15px;
    }

    .sh-form {
        margin-left: -20px !important;
    }
}
</style>


