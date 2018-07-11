<template>
    <div class="sh-checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'ShCheckboxGroup',
    componentName: 'ShCheckboxGroup',
    props: {
        value: {
            type: Array,
            default: []
        },
        disabled: Boolean
    }
}
</script>
<style lang="stylus">
.sh-checkbox-group {
    font-size: 0;
}
</style>

