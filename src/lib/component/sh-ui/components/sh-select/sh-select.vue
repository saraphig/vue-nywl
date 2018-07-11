<template>
    <sh-base-dropdown :class="['sh-select']"
        v-model="visible"
        :disabled="disabled">
        <sh-input v-model="selectText"
            :readonly="!filter"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="handleQuery">
            <template slot="suffix">
                <i class="iconfont icon-icon_jiantou_xiazhankai"></i>
            </template>
        </sh-input>
        <div slot="dropdown">
            <ul class="sh-select--dropdown">
                <slot></slot>
                <li v-if="showEmptyText"
                    class="sh-select--dropdown-empty">暂无查询结果</li>
            </ul>
        </div>
    </sh-base-dropdown>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import ShBaseDropdown from '../sh-base/sh-base-dropdown'
import ShInput from '../sh-input';
export default {
    name: "ShSelect",
    componentName: "ShSelect",
    mixins: [Emitter],
    components: { ShBaseDropdown, ShInput },
    provide() {
        return { shSelect: this };
    },
    data() {
        return {
            visible: false,
            selectText: '',
            showOptionNumber: 0,
            selectOption: null
        }
    },
    props: {
        placeholder: String,
        disabled: Boolean,
        value: {
            required: true
        },
        filter: {
            type: [Boolean, Function],
            default: false
        }
    },
    methods: {
        handleOptionClick(option) {
            this.selectOption = option;
            this.selectText = this.selectOption.optionLabel;
            this.visible = false;
        },
        handleQuery(value) {
            if (!this.filter) {
                return;
            }
            if (this.visible === false) {
                this.visible = true;
            }
            this.broadcast('ShOption', 'query', value);
        }
    },
    created() {
        this.$on('handleOptionClick', this.handleOptionClick);
    },
    computed: {
        showEmptyText() {
            if (this.showOptionNumber < 1) {
                return true;
            }
            if (!this.$slots.default) {
                return true;
            }
        }
    },
    watch: {
        visible() {
            if (this.visible === false) {
                if (this.selectOption) {
                    this.selectText = this.selectOption.optionLabel;
                    this.$emit('input', this.selectOption.value);
                }

            } else {
                this.broadcast('ShOption', 'query', '');
            }
        }
    }
}
</script>
<style lang="stylus">
@import '../../styles/variable';

.sh-select {
    .sh-select--dropdown {
        list-style: none;
        padding: 6px 0;
        margin: 0;
        max-height: 230px;
        box-sizing: border-box;
        overflow: auto;

        .sh-select--dropdown-empty {
            list-style: none;
            padding: 0 15px;
            margin: 0;
            position: relative;
            white-space: nowrap;
            color: $--select-empty-color;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>

