<template>
    <div :class="['sh-input',{
        'sh-input-disabled': disabled,
        'sh-input-suffix': $slots.suffix||clearable,
        'sh-input-prefix': $slots.prefix ,
        'sh-input-group': $slots.prepend || $slots.append,
        'sh-input-group-prepend': $slots.prepend,
        'sh-input-group-append': $slots.append
        }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false">
        <!-- 前置元素 -->
        <div class="sh-input-group--prepend"
            v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <!-- 前置内容 -->
        <span class="sh-input--prefix"
            v-if="$slots.prefix">
            <span class="sh-input--prefix-inner">
                <slot name="prefix"></slot>
            </span>
        </span>
        <input type="text"
            class="sh-input--inner"
            v-bind="$attrs"
            :disabled="disabled"
            :value="currentValue"
            :autocomplete="autoComplete"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange">
        <!-- 后置内容 -->
        <span class="sh-input--suffix"
            v-if="$slots.suffix||clearable">
            <span class="sh-input--suffix-inner">
                <template v-if="!showClear">
                    <slot name="suffix"></slot>
                </template>
                <i v-else
                    class="iconfont icon-icon_xiaofucengguanbishanchu sh-input--clear-icon"
                    @click="handleClear"></i>
            </span>
        </span>
        <!-- 后置元素 -->
        <div class="sh-input-group--append"
            v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>

</template>
<script>
export default {
    name: "ShInput",
    componentName: "ShInput",
    props: {
        value: [String, Number],
        disabled: Boolean,
        autoComplete: {
            type: String,
            default: "off"
        },
        clearable: Boolean
    },
    data() {
        return {
            currentValue: this.value === undefined || this.value === null ? "" : this.value,
            hovering: false,
            focused: false,
        };
    },
    computed: {
        showClear() {
            return this.clearable && !this.disabled && !this.readonly &&
                this.currentValue !== '' && (this.hovering || this.focused);
        }
    },
    methods: {
        //compositionstart,compositionupdate,compositionend解决中文输入法的问题
        handleComposition(event) {
            if (event.type ===
                "compositionend") {
                this.isOnComposition = false;
                this.handleInput(event);
            } else {
                const text = event.target.value;
                this.isOnComposition = true;
            }
        },
        // 文本框输入oninput事件，进行双向绑定的赋值
        handleInput(event) {
            if (this.isOnComposition) return;
            const value = event.target.value
            this.$emit("input", value);
            this.currentValue = value;
        },
        // 获取光标事件
        handleFocus(event) {
            this.focused = true;
            this.$emit("focus", event);
        },
        // 光标离开事件
        handleBlur(event) {
            this.focused = false;
            this.$emit("blur", event);
        },
        // 文本内容改变事件
        handleChange(event) {
            this.$emit("change", event.target.value);
        },
        handleClear(e) {
            this.currentValue = "";
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear', e);
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.sh-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    .sh-input--inner {
        background-color: $--input-background-color;
        border: $--input-boder;
        border-radius: $--input-radius;
        color: $--input-color;
        -webkit-appearance: none;
        background-image: none;
        box-sizing: border-box;
        display: inline-block;
        font-size: inherit;
        height: 36px;
        line-height: 36px;
        outline: none;
        padding: 0 10px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;

        &::placeholder {
            color: $--input-placeholder-color;
        }

        &:hover {
            border-color: $--input-hover-border-color;
        }

        &:focus {
            outline: none;
            border-color: $--input-focus-borer-color;
        }
    }

    &.sh-input-disabled {
        .sh-input--inner {
            background-color: $--input-disabled-background-color;
            border-color: $--input-disabled-border-color;
            color: $--input-disabled-color;
            cursor: not-allowed;

            &::placeholder {
                color: $--input-disabled-color;
            }
        }
    }

    &.sh-input-suffix {
        .sh-input--inner {
            padding-right: 30px;
        }

        .sh-input--suffix {
            position: absolute;
            height: 100%;
            right: 8px;
            top: 0;
            text-align: center;
            color: $--input-fix-color;
            transition: all 0.3s;
            pointer-events: none;
        }

        .sh-input--suffix-inner {
            pointer-events: all;

            i {
                height: 100%;
                width: 25px;
                text-align: center;
                transition: all 0.3s;
                line-height: 36px;
                cursor: pointer;

                &:after {
                    content: '';
                    height: 100%;
                    width: 0;
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .sh-input--clear-icon {
                transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                background-color: white;

                &:hover {
                    color: $--input-hover-clear-icon;
                }
            }
        }
    }

    &.sh-input-prefix {
        .sh-input--inner {
            padding-left: 30px;
        }

        .sh-input--prefix {
            position: absolute;
            height: 100%;
            left: 8px;
            top: 0;
            text-align: center;
            color: $--input-fix-color;
            transition: all 0.3s;
            pointer-events: none;
        }

        .sh-input--prefix-inner {
            pointer-events: all;

            i {
                height: 100%;
                width: 25px;
                text-align: center;
                transition: all 0.3s;
                line-height: 36px;
                cursor: pointer;

                &:after {
                    content: '';
                    height: 100%;
                    width: 0;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }

    &.sh-input-group {
        line-height: normal;
        display: inline-table;
        width: 100%;
        border-collapse: separate;

        &>.sh-input--inner {
            vertical-align: middle;
            display: table-cell;
        }

        .sh-input-group--prepend, .sh-input-group--append {
            background-color: $--input-group-background-color;
            color: $--input-group-color;
            border: $--input-group-border;
            vertical-align: middle;
            display: table-cell;
            position: relative;
            border-radius: 2px;
            padding: 0 20px;
            width: 1px;
            white-space: nowrap;

            &:focus {
                outline: none;
            }
        }

        .sh-input-group--prepend {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &.sh-input-group-prepend .sh-input--inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .sh-input-group--append {
            border-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        &.sh-input-group-append .sh-input--inner {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
}
</style>


