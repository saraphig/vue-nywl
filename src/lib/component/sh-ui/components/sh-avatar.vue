<template>
    <span :class="['sh-avatar','sh-avatar-circle',{
        'sh-avatar-img':src,
        'sh-avatar-icon':icon
    }]">
        <img :src="src"
            v-if="src">
        <i :class="['iconfont', icon]"
            v-else-if="icon"></i>
        <span class="sh-avatar-string"
            ref="children"
            :style="textStyle"
            v-else>
            <slot></slot>
        </span>
    </span>
</template>
<script>

export default {
    name: 'ShAvatar',
    componentName: 'ShAvatar',
    props: {
        src: {
            type: String
        },
        icon: {
            type: String
        }
    },
    data() {
        return {
            scale: 1,
            childrenWidth: 0,
            isSlotShow: false

        };
    },
    computed: {
        textStyle() {
            let style = {};
            if (this.isSlotShow) {
                style = {
                    msTransform: `scale(${this.scale})`,
                    WebkitTransform: `scale(${this.scale})`,
                    transform: `scale(${this.scale})`,
                    position: 'absolute',
                    display: 'inline-block',
                    left: `calc(50% - ${Math.round(this.childrenWidth / 2)}px)`
                };
            }
            return style;
        }
    },
    methods: {
        setScale() {
            this.isSlotShow = !this.src && !this.icon;
            if (this.$refs.children) {
                this.childrenWidth = this.$refs.children.offsetWidth;
                const avatarWidth = this.$el.getBoundingClientRect().width;
                if (avatarWidth - 8 < this.childrenWidth) {
                    this.scale = (avatarWidth - 8) / this.childrenWidth;
                } else {
                    this.scale = 1;
                }
            }
        }
    },
    mounted() {
        this.setScale();
    },
    updated() {
        this.setScale();
    }
};
</script>
<style lang="stylus">
@import '../styles/variable';

.sh-avatar {
    display: inline-block;
    text-align: center;
    background-color: #41a259;
    color: $--avatar-color;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 18px;

    &.sh-avatar-image {
        background: 0 0;
    }

    &.sh-avatar-icon {
        font-size: 18px;
    }

    >img {
        width: 100%;
        height: 100%;
    }
}
</style>

