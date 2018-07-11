<template>
    <div class="sh-layout ny-farm-flow">
        <div class="sh-layout-content">
            <div class="ny-farm-flow-header">
                <div class="sh-layout-title">农事流程</div>
            </div>
            <div class="ny-farm-flow-body">
                <div class="ny-farm-flow--toolbar">
                    <sh-group-add @add-success="handleAddCallback"></sh-group-add>
                    <div class="ny-farm-flow-list">
                        <template v-for="(projectGroup,index) in projectGroupList">
                            <div :class="{'active':projectGroup.id===selectProjectGroup.id}"
                                :key="projectGroup.id"
                                @click="handleSwitchProjectGroup(projectGroup)">{{projectGroup.name}}</div>
                            <div v-if="index%9===0&&index>0"
                                class="ny-farm-flow-list--separator"></div>
                        </template>
                    </div>
                </div>
                <div>
                    <template v-for="(project,title,index) of projectList">
                        <div class="ny-farm-flow-title">
                            <i class="iconfont icon-icon_liuchengguanli"></i>
                            <span>{{title}}</span>
                        </div>
                        <div class="ny-farm-flow-body">
                            <sh-row :gutter="20">
                                <sh-col :span="6"
                                    :xs="24"
                                    :sm="12"
                                    :md="8"
                                    :lg="6"
                                    :xl="4"
                                    v-for="item in project"
                                    :key="item.id">
                                    <sh-project-node @edit-click="handleEditProject(item)"
                                        @detail-click="handleDetailCilick(item)"
                                        @delete-click="handleDeleteProject(item)">{{item.name}}</sh-project-node>
                                </sh-col>
                            </sh-row>
                        </div>
                    </template>
                    <sh-row :gutter="20">
                        <sh-col :span="4">
                            <sh-project-content></sh-project-content>
                        </sh-col>
                    </sh-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ShRow from '@com/sh-ui/components/sh-row'
import ShCol from '@com/sh-ui/components/sh-col'
import ShProjectNode from './project-node'
import ShProjectContent from './project-content'
import ShGroupAdd from './group-add'
export default {
    components: { ShRow, ShCol, ShProjectNode, ShGroupAdd, ShProjectContent },
    data() {
        return {
            // 项目组
            projectGroupList: [],
            // 项目组对应的项目集合
            projectList: [],
            // 选中的项目组
            selectProjectGroup: null,
            // 当前编辑项目
            editProject: null,
        }
    },
    provide() {
        return { index: this }
    },
    methods: {
        // 获取项目组集合
        getProjectGroups() {
            this.$store.dispatch("getProjectGroups").then(
                data => {
                    this.projectGroupList = data;

                    if (this.$route.query.selectId) {
                        this.projectGroupList.forEach(item => {
                            if (item.id == this.$route.query.selectId) {
                                this.selectProjectGroup = item;
                            }
                        });

                    } else {
                        this.selectProjectGroup = data[0]
                    }
                    if (this.selectProjectGroup) {
                        this.getProjectList(this.selectProjectGroup.id);
                    }
                },
                error => {
                    this.projectGroupList = [];
                }
            );
        },
        // 获取具体的项目组内容
        getProjectList(projectGroupId) {
            this.$store.dispatch("getProjectList", { projectGroupId: projectGroupId }).then(
                data => {
                    this.projectList = data;
                },
                error => {
                    this.projectList = [];
                }
            );
        },
        // 切换项目组
        handleSwitchProjectGroup(group) {
            this.selectProjectGroup = group;
            this.getProjectList(this.selectProjectGroup.id);
        },
        handleAddCallback(group) {
            this.projectGroupList.push(group);
            this.selectProjectGroup = group;
            this.projectList = [];
        },
        handleEditProject(editProject) {
            this.editProject = editProject;
        },
        handleDeleteProject(deletProject) {
            this.$shConfirm(`您是否确定删除"${deletProject.name}"工作项？`, '删除提示', {
                callback: type => {
                    if (type === 'confirm') {
                        this.$store.dispatch("deleteProject", deletProject).then(
                            data => {
                                this.getProjectList(this.selectProjectGroup.id);
                            },
                            error => {
                                alert(error);
                            }
                        );
                    }
                }
            });
        },
        handleDetailCilick(project) {
            this.$router.push({
                path: '/farming_flowmanage/detail',
                query: {
                    selectGroupId: this.selectProjectGroup.id,
                    title: project.name,
                    group: this.selectProjectGroup.name,
                    id: project.id
                }
            })
        }
    },
    created() {
        this.getProjectGroups();
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../lib/component/sh-ui/styles/layout.styl';

.ny-farm-flow {
    .ny-farm-flow-header {
        color: #444444;
        margin-top: -8px;
        height: 56px;
        border-bottom: 1px solid #E3E8EA;
    }

    .ny-farm-flow-body {
        padding-top: 24px;

        .ny-farm-flow--toolbar {
            position: relative;
        }

        .ny-farm-flow-list {
            margin-bottom: 30px;
            font-size: 0;
            padding-right: 150px;

            > div {
                display: inline-block;
                font-size: 16px;
                color: #999999;
                height: 36px;
                line-height: 36px;
                box-sizing: border-box;
                font-weight: bold;
                margin-right: 30px;
                cursor: pointer;
                border-bottom: 3px solid #ffffff;

                &.active {
                    color: #41A259;
                    border-bottom: 4px solid #41A259;
                }

                &.ny-farm-flow-list--separator {
                    display: block;
                    height: 0;
                }
            }
        }

        .ny-farm-flow-title {
            > i {
                color: #41A259;
                font-size: 20px;
            }

            > span {
                font-size: 16px;
                line-height: 16px;
                padding-left: 10px;
            }
        }

        .ny-farm-flow-body {
            padding: 16px 0;
        }
    }
}
</style>

