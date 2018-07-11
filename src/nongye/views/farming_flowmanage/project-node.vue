<template>
    <div class="ny-farm-project-node"
        v-clickoutside="handleOutsideClick"
        @mouseleave="handleMouseleave">
        <div class="ny-farm-project-node--text"
            v-if="showView==='text'"
            @click="handleDetailClick">
            <slot></slot>
            <i class="iconfont icon-icon_list_gengduo ny-farm-project-node--icon"
                @click="handleTextIconClick"></i>
        </div>
        <div class="ny-farm-project-node--operate"
            v-if="showView==='operate'">
            <span @click="handleEditClick">
                <i class="iconfont icon-icon_list_edit"></i>
                <span>编辑</span>
            </span>
            <span @click="handleDeleteClick">
                <i class="iconfont icon-icon_list_delete"></i>
                <span>删除</span>
            </span>
        </div>
    </div>
</template>
<script>
import clickoutside from '@com/sh-ui/directives/clickoutside.js'
export default {
    directives: {
        clickoutside
    },
    data() {
        return {
            showView: "text",
            isClickDetail: true
        }
    },
    methods: {
        handleTextIconClick() {
            this.showView = 'operate';
            this.isClickDetail = false;
        },
        handleOutsideClick() {
            this.showView = 'text';
        },
        handleEditClick() {
            this.$emit("edit-click");
        },
        handleDeleteClick() {
            this.$emit("delete-click");
        },
        handleDetailOut() {
            this.showView = 'text';
        },
        handleDetailClick() {
            if (this.isClickDetail) {
                this.$emit("detail-click");
            } else {
                this.isClickDetail = true;
            }

        },
        handleMouseleave() {
            this.showView = 'text';
        }
    }
}
</script>
<style lang="stylus" scoped>
.ny-farm-project-node {
    color: #666666;
    height: 64px;
    text-align: center;
    border-radius: 2px;
    background-color: #F6F9FB;
    cursor: pointer;
    position: relative;
    margin-bottom: 20px;

    .ny-farm-project-node--text {
        position: relative;
        line-height: 64px;
        height: 64px;
        overflow: hidden;
        white-space: nowrap;
        font-weight: bold;

        .ny-farm-project-node--icon {
            line-height: 18px;
            font-size: 18px;
            position: absolute;
            top: 6px;
            right: 6px;
            display: none;
        }

        &:hover {
            background: #41A259;
            color: #ffffff;

            .ny-farm-project-node--icon {
                display: block;
            }
        }
    }

    .ny-farm-project-node--operate {
        position: relative;
        background: #41A259;
        line-height: 64px;
        color: #ffffff;
        height: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;

        > span {
            line-height: 16px;
            padding: 3px 5px;
            margin: 0 15px;

            > span {
                padding-left: 5px;
            }
        }
    }
}
</style>

