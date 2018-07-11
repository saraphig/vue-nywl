<template>
    <div :class="['sh-base-dropdown',{
        'sh-base-dropdown--disabled':disabled
    }]"
        v-clickoutside="handleClickOutSide">
        <div :class="['sh-base-dropdown--selection']"
            @click="handleSelectionClick">
            <slot></slot>
        </div>
        <transition name="sh-base-dropdown">
            <div class="sh-base-dropdown--content"
                v-show="value">
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import clickoutside from '../../directives/clickoutside.js'
export default {
    name: 'ShSelectDropdowm',
    componentName: 'ShSelectDropdowm',
    components: {},
    directives: {
        clickoutside
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: Boolean
    },
    methods: {
        handleClickOutSide() {
            this.$emit('input', false);
        },
        handleSelectionClick() {
            if (this.disabled) {
                return;
            }
            this.$emit('input', !this.value);
        }
    }
}    
</script>
<style lang="stylus">
.sh-base-dropdown {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    color: #444444;

    .sh-base-dropdown--selection {
        cursor: pointer;
        position: relative;
    }

    .sh-base-dropdown--content {
        background-color: #ffffff;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 2px #808080;
        border-radius: 2px;
        position: absolute;
        z-index: 900;
    }

    .sh-base-dropdown-enter-active, .sh-base-dropdown-leave-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        transform-origin: center top;
    }

    .sh-base-dropdown-enter, .sh-base-dropdown-leave-active {
        opacity: 0;
        transform: scaleY(0);
    }

    &.sh-base-dropdown--disabled {
        .sh-base-dropdown--selection {
            cursor: not-allowed;
        }
    }
}
</style>

