<template>
    <div class="sh-radio-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'ShRadioGroup',
    componentName: 'ShRadioGroup',
    props: {
        value: {},
        disabled: Boolean
    }
};
</script>
<style lang="stylus">
.sh-raido-group {
    font-size: 0;
}
</style>


