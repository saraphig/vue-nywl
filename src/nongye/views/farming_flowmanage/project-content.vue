<template>
    <div>
        <div v-if="type==='add'"
            class="ny-farm-project-add"
            @click="handleAddClick">
            <i class="iconfont icon-icon_shipinjiankong_zengjia"></i>
            <span>添加工作项</span>
        </div>
        <sh-modal v-model="visiable"
            :title="title">
            <div class="ny-farm-project-add--title">农事名称</div>
            <div class="ny-farm-project-add--input">
                <sh-input placeholder="请输入农事名称"
                    v-model="name"></sh-input>
            </div>

            <div class="ny-farm-project-add--title">添加执行人</div>
            <div class="ny-farm-project-add--input">
                <sh-user-select v-model="selectUserList"></sh-user-select>
            </div>

            <div class="ny-farm-project-add--title">添加确认单</div>
            <div class="ny-farm-project-add--input">
                <sh-confirm-sheet v-model="selectConfirmList"></sh-confirm-sheet>
            </div>

            <span slot="footer">
                <sh-button @click="visiable = false"
                    plain>取 消</sh-button>
                <sh-button @click="handleConfirmClick">确 定</sh-button>
            </span>
        </sh-modal>
    </div>
</template>
<script>
import ShModal from '@com/sh-ui/components/sh-modal'
import ShButton from '@com/sh-ui/components/sh-button'
import ShInput from '@com/sh-ui/components/sh-input'
import ShUserSelect from "./user-select"
import ShConfirmSheet from "./confirm-sheet"
import { mapGetters } from "vuex";
import moment from 'moment'
export default {
    components: { ShModal, ShButton, ShInput, ShUserSelect, ShConfirmSheet },
    data() {
        return {
            visiable: false,
            name: '',
            selectConfirmList: [],
            selectUserList: []
        }
    },
    provide() {
        return { projectContent: this }
    },
    inject: ['index'],
    props: {
        type: {
            type: String,
            default: 'add'
        }
    },
    computed: {
        title() {
            return this.index.editProject ? "编辑农事工作" : "新增农事工作";
        },
        ...mapGetters({
            organizationEntity: 'getOrganizationEntity'
        })
    },
    methods: {
        handleAddClick() {
            this.visiable = true;
        },
        getFornInfo() {
            if (/[a-zA-Z0-9]+/.test(this.name)) {
                alert("项目名称只能输入1~15个汉字和符号");
                return false;
            }
            if (this.name.length < 1 || this.name.length > 15) {
                alert("项目名称只能输入1~15个汉字和符号");
                return false;
            }
            let params = {
                areaCode: this.organizationEntity.areaCode,
                checkListIds: this.selectConfirmList,
                name: this.name,
                projectGroupId: this.index.selectProjectGroup.id,
                userIds: this.selectUserList
            }
            return params;
        },
        addProject() {
            let params = this.getFornInfo();
            if (params === false) return;
            params.projectTypeCode = "other";
            this.$store.dispatch("insertProject", params).then(
                ({ data }) => {
                    this.visiable = false;
                    this.index.getProjectList(this.index.selectProjectGroup.id);
                },
                error => {
                    alert(error)
                }
            );

        },
        editProject() {
            let params = this.getFornInfo();
            if (params === false) return;
            let model = Object.assign({}, this.index.editProject, params);
            this.$store.dispatch("editProject", model).then(
                ({ data }) => {
                    this.visiable = false;
                },
                error => {
                    alert(error)
                }
            );
        },
        handleConfirmClick() {
            if (this.index.editProject) {
                this.editProject();
            } else {
                this.addProject();
            }
        }
    },
    watch: {
        visiable(value) {
            if (value) {
                let project = this.index.editProject;
                if (project) {
                    // 设置项目名称
                    this.name = project.name;
                    // 获取想项目的关联确认单信息
                    let params = { projectId: project.id, time: moment().utc() };
                    this.$store.dispatch("getProjectCheckLists", params).then(
                        ({ data }) => {
                            this.selectConfirmList = data || [];
                        },
                        error => {
                            this.selectConfirmList = []
                        }
                    );
                    // 获取关联的用户信息
                    this.$store.dispatch("getProjectSummary", params).then(
                        ({ users }) => {
                            this.selectUserList = users || [];
                        },
                        error => {
                            this.selectUserList = []
                        }
                    );
                }
            } else {
                // 关闭窗体清空工作项名称
                this.name = '';
                // 清空选中确认单
                this.selectConfirmList = [];
                // 清空用户
                this.selectUserList = [];
                // 清空选中的项目
                this.index.editProject = null;
                // 刷新列表项目
                this.index.getProjectList(this.index.selectProjectGroup.id);
            }



        },
        'index.editProject'(project) {
            if (project) {
                this.visiable = true;
            }
        }
    }
}
</script>
<style lang="stylus">
.ny-farm-project-add {
    color: #999999;
    height: 62px;
    text-align: center;
    border-radius: 2px;
    background-color: #ffffff;
    cursor: pointer;
    position: relative;
    line-height: 62px;
    border: 1px dashed #cccccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    > span {
        padding-left: 5px;
    }

    &:hover {
        color: #41A259;
        border-color: #41A259;
    }
}

.ny-farm-project-add--title {
    margin: 20px 0;
    padding-left: 15px;
    border-left: 4px solid #41a259;
    font-size: 14px;
    color: #444;
    width: 500px;
}
</style>

