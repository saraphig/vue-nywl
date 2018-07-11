<template>
    <div :class="['sh-button',{
        'sh-button--plain':plain,
        'sh-button--circle':circle,
        'sh-button--no-slot':!$slots.default
    }]"
        @click="handleClick">
        <i v-if="leftIcon"
            :class="['iconfont',{
            [leftIcon]:leftIcon
        }]"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
        <i v-if="rightIcon"
            :class="['iconfont',{
            [rightIcon]:rightIcon
        }]"></i>
    </div>
</template>
<script>
export default {
    name: 'ShButton',
    componentName: 'ShButton',
    props: {
        plain: Boolean,
        circle: Boolean,
        leftIcon: String,
        rightIcon: String
    },

    computed: {
    },

    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.sh-button {
    border: $--button-border;
    background-color: $--button-background-color;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: $--button-color;
    padding: 10px 19px;
    cursor: pointer;
    white-space: nowrap;

    i {
        font-size: 14px;
    }

    &.sh-button--plain {
        color: $--button-palin-color;
        background-color: $--button-palin-background-color;
    }

    &.sh-button--no-slot {
        padding: 10px;
    }

    &.sh-button--circle {
        border-radius: 18px;
    }
}
</style>


