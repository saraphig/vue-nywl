<template>
    <li :class="['sh-select--option',{
        'sh-select--option-selected':isSelected
    }]"
        v-show="visible"
        @click="handleClick">
        <slot>{{ optionLabel }}</slot>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
export default {
    name: 'ShOption',
    componentName: 'ShOption',
    mixins: [Emitter],
    inject: ['shSelect'],
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
            type: [String, Number]
        }
    },
    data() {
        return {
            visible: true,
        };
    },
    computed: {
        optionLabel() {
            return this.label || this.value;
        },
        isSelected() {
            return this.shSelect.value === this.value;
        }
    },
    methods: {
        handleClick() {
            this.dispatch('ShSelect', 'handleOptionClick', [this]);
        },
        query(queryText) {
            // query 里如果有正则中的特殊字符，需要先将这些字符转义
            let parsedQueryText = String(queryText).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
            this.visible = new RegExp(parsedQueryText, 'i').test(this.optionLabel);
        }
    },
    created() {
        if (this.visible) {
            this.shSelect.showOptionNumber++;
        }
        // this.shSelect.options.push(this);
        this.$on('query', this.query);
    },
    mounted() {
        if (this.isSelected) {
            this.handleClick();
        }
    },
    watch: {
        visible() {
            if (this.visible) {
                this.shSelect.showOptionNumber++;
            } else {
                this.shSelect.showOptionNumber--;
            }
        },
        isSelected(value) {
            if (value) {
                this.handleClick();
            }
        }
    }
};
</script>
<style lang="stylus">
@import '../../styles/variable';

ul {
    li {
        &.sh-select--option {
            list-style-type: none;
            padding: 0 15px;
            margin: 0;
            position: relative;
            white-space: nowrap;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                background-color: $--select--option-hover-background-color;
                color: $--select--option-hover-color;
            }

            &.sh-select--option-selected {
                color: $--select--option-selected-color !important;
            }
        }
    }
}
</style>
