<template>
    <label :class="['sh-checkbox',{ 
        'sh-checkbox-disabled':isDisabled,
        'sh-checkbox-checked':isChecked,
        'sh-checkbox-indeterminate':indeterminate&&!isChecked,
        }]">
        <span :class="['sh-checkbox--input']">
            <span class="sh-checkbox--inner"></span>
            <input type="checkbox"
                class="sh-checkbox--original"
                v-model="model"
                :value="label"
                :disabled="isDisabled"
                @change="handleChange" />
        </span>
        <span class="sh-checkbox--label"
            v-if="$slots.default">
            <slot></slot>
        </span>
    </label>
</template>
<script>
import Emitter from '../mixins/emitter.js';
export default {
    name: "ShCheckbox",
    componentName: "ShCheckbox",
    mixins: [Emitter],
    props: {
        value: {},
        label: {},
        disabled: Boolean,
        indeterminate: Boolean
    },
    data() {
        return {
            _checkboxGroup: null,
            selfModel: false
        }
    },
    computed: {
        model: {
            get() {
                if (this.isGroup) {
                    return this._checkboxGroup.value || this.value;
                }
                if ({}.toString.call(this.value) === '[object Boolean]') {
                    return this.value;
                }
                if (this.value === undefined) {
                    return this.selfModel;
                } else {
                    return this.value
                }
            },
            set(val) {
                if (this.isGroup) {
                    this.dispatch('ShCheckboxGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                    this.selfModel = val;
                }

            }
        },
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'ShCheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    this._checkboxGroup = parent;
                    return true;
                }
            }
            return false;
        },
        isChecked() {
            if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model;
            }
            if (Array.isArray(this.model)) {
                return this.model.indexOf(this.label) > -1;
            }
        },
        isDisabled() {
            if (this.isGroup) {
                return this._checkboxGroup.disabled || this.disabled;
            }
            return this.disabled;
        }
    },
    methods: {
        handleChange(event) {
            let value = event.target.checked;
            this.$emit('change', value, event);
        }
    }
}
</script>
<style lang="stylus">
@import '../styles/variable';

.sh-checkbox {
    color: $--checkbox-color;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;

    &+.sh-checkbox {
        margin-left: 25px;
    }

    .sh-checkbox--input {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;

        .sh-checkbox--inner {
            border: $--checkbox-boder;
            background-color: $--checkbox-backgroud-color;
            display: inline-block;
            position: relative;
            border-radius: $--checkbox-border-radius;
            box-sizing: border-box;
            width: 18px;
            height: 18px;
            z-index: 1;
            transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

            &:hover {
                border-color: $--checkbox-hover-border-color;
            }
        }

        .sh-checkbox--original {
            display: none;
        }
    }

    .sh-checkbox--label {
        display: inline-block;
        padding-left: 10px;
        line-height: 20px;
        font-size: 14px;
    }

    &.sh-checkbox-indeterminate {
        .sh-checkbox--inner {
            border-color: $--checkbox-checked-border-color;

            &::before {
                content: '';
                position: absolute;
                display: inline-block;
                background-color: $--checkbox-indeterminate;
                height: 2px;
                width: 10px;
                left: 3px;
                right: 0;
                top: 7px;
            }
        }
    }

    &.sh-checkbox-checked {
        .sh-checkbox--inner {
            background-color: $--checkbox-checked-background-color;
            border-color: $--checkbox-checked-border-color;

            &::after {
                border: $--checkbox-border-tick;
                box-sizing: content-box;
                content: '';
                border-left: 0;
                border-top: 0;
                height: 8px;
                left: 5px;
                position: absolute;
                top: 1px;
                width: 5px;
                transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
                transform-origin: center;
                transform: rotate(45deg) scaleY(1);
            }
        }
    }

    &.sh-checkbox-disabled {
        .sh-checkbox--inner {
            border-color: $--checkbox-disabled-border-color;
            background-color: $--checkbox-disabled-background-color;
            cursor: not-allowed;

            &:hover {
                border-color: $--checkbox-disabled-hover-border-color;
            }
        }

        .sh-checkbox--label {
            color: $--checkbox-disabled-label-color;
            cursor: not-allowed;
        }

        &.sh-checkbox-checked .sh-checkbox--inner {
            border-color: $--checkbox-checked-disabled-border-color;
            background-color: $--checkbox-checked-disabled-background-color;

            &::after {
                border-color: $--checkbox-checked-disabled-tick;
            }
        }
    }
}
</style>

