<template>
    <div :class="['sh-tree-node',{
        'sh-tree-node--expanded':expanded
        }]">
        <div :class="['sh-tree-node--content',{
            'sh-tree-node--content-selected':isSelected
        }]"
            :style="{ 'padding-left': paddingLeft }"
            @click="handleClickNode">
            <span :class="['iconfont','icon-icon_tree_collapse','sh-tree-node--icon',{
                'sh-tree-node--leaf':isLeaf,
                'sh-tree-node--expanded-icon':expanded,
                'sh-tree-node--visible-icon':!tree.showCollapse
            }]"
                @click.stop="handleExpandIconClick"></span>
            <sh-checkbox class="sh-tree-node--checkbox"
                :indeterminate="treeNode.indeterminate"
                v-if="showCheckbox"
                v-model="treeNode.checked"
                @change="handleCheckChange"></sh-checkbox>
            <tree-node-content :node="treeNode"></tree-node-content>
        </div>
        <sh-collapse-transition>
            <div class="sh-tree-node--children"
                v-show="expanded">
                <sh-tree-node v-for="childNode in treeNode.childNodes"
                    :treeNode="childNode"
                    :key="childNode.id"></sh-tree-node>
            </div>
        </sh-collapse-transition>
    </div>
</template>
<script>
import ShCheckbox from '../sh-checkbox'
import ShCollapseTransition from '../sh-transitions/sh-collapse-transition'
export default {
    name: "ShTreeNode",
    componentName: "ShTreeNode",
    components: {
        ShCheckbox,
        ShCollapseTransition,
        // 内部节点渲染，使用渲染函数处理
        treeNodeContent: {
            props: {
                node: { required: true }
            },
            render(createElement) {
                const tree = this.$parent.tree;
                if (tree.$scopedSlots.default) {
                    return tree.$scopedSlots.default({ node: this.node, data: this.node.data });
                } else {
                    return createElement("span", { class: ['sh-tree-node--label'] }, this.node.data[tree.textKey]);
                }
            }
        }
    },
    data() {
        return {
            tree: null,
            showCheckbox: false,
            expanded: false
        }
    },
    props: {
        treeNode: {}
    },
    computed: {
        paddingLeft() {
            return (this.treeNode.level) * this.tree.indent + 'px'
        },
        isLeaf() {
            return this.treeNode.childNodes.length < 1;
        },
        isSelected() {
            return !this.tree.disabledSelect && this.tree.selectNodeKey === this.treeNode.data[this.tree.nodeKey];

        }
    },
    methods: {
        handleCheckChange(value) {
            this.treeNode.setChecked(value, this.treeNode);
        },
        handleExpandIconClick() {
            this.expanded = !this.expanded;
        },
        handleClickNode() {
            this.tree.selectNodeKey = this.treeNode.data[this.tree.nodeKey];
            this.tree.$emit("node-click", this.treeNode, this.treeNode.data, this);
        }
    },
    created() {
        const parent = this.$parent;
        if (parent.$options.componentName == "ShTree") {
            this.tree = parent;
        } else {
            this.tree = parent.$parent.tree;
        }
        this.showCheckbox = this.tree.showCheckbox;
        this.previousChecked = this.treeNode.checked;
        if (this.treeNode.expanded) {
            this.expanded = true;
        }
    },
    watch: {
        'node.indeterminate'() {
            this.tree.$emit('check-change', this.treeNode, this.treeNode.data, this);
        },
        'node.checked'(checked) {
            this.tree.$emit('check-change', this.treeNode, this.treeNode.data, this);
        },
        'treeNode.expanded'() {
            this.expanded = this.treeNode.expanded
            if (this.expanded) {
                this.tree.$emit("node-expand", this.treeNode, this.treeNode.data, this)
            } else {
                this.tree.$emit("node-collapse", this.treeNode, this.treeNode.data, this)
            }
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.sh-tree-node {
    white-space: nowrap;
    outline: none;

    .sh-tree-node--content {
        display: flex;
        align-items: center;
        height: 26px;
        cursor: pointer;

        &:hover {
            background-color: $--tree-node-hover-background-color;
        }

        &.sh-tree-node--content-selected {
            background-color: $--tree-node-select-background-color;
            color: $--tree-node-select-color;

            &:hover {
                background-color: $--tree-node-select-background-color;
            }

            .sh-tree-node--icon {
                color: $--tree-node-select-color;
            }
        }

        .sh-tree-node--icon {
            padding: 4px;
            cursor: pointer;
            color: $--tree-node-icon-color;
            font-size: 14px;
            transition: transform 0.3s ease-in-out;

            &.sh-tree-node--leaf {
                visibility: hidden;
                color: transparent;
                cursor: default;
            }
        }

        .sh-tree-node--visible-icon {
            visibility: hidden;
        }

        .sh-tree-node--checkbox {
            margin: 4px 8px 2px 0;
        }

        .sh-tree-node--label {
            display: flex;
            align-items: center;
            height: 26px;
            cursor: pointer;
            font-size: 14px;
        }
    }

    .sh-tree-node--children {
        display: block;
        overflow: hidden;
        background-color: transparent;
    }

    .sh-tree-node--expanded-icon {
        transform: rotate(90deg);
    }
}
</style>
