<template>
    <div class="list-div"
        :class="[model.childrens?'':'no-childrens',{
          'list-div-selected':isSelected
        }]">
        <i @click='openNode(model)'
            v-if='model.childrens'
            class="iconfont "
            :class="[model.displayFold == 1?'icon-icon_jiantou_xiazhankai open':'icon-icon_jiantou_xiazhankai close']"></i>
        <span @click="toggle(model)"
            v-html="model.idName"
            :title="model.idName"></span>
    </div>
</template>
<script>
export default {
    name: 'ShTreeLeaf',
    inject: ['shTreeSelect'],
    props: {
        model: {}
    },
    methods: {
        openNode(model) {
            this.$emit('openNode', model);
        },
        toggle(model) {
            this.$emit('toggle', model);
        }
    },
    computed: {
        isSelected(e) {
            return this.shTreeSelect.value === this.model.areaCode;
        }
    }
}
</script>
<style>
.list-div-selected {
  color: #41a259 !important;
}
</style>

