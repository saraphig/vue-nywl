<script>
export default {
    name: 'ShRow',
    componentName: 'ShRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: Number,
        type: String,
        justify: {
            type: String,
            default: 'start'
        },
        align: {
            type: String,
            default: 'top'
        }
    },
    computed: {
        style() {
            const style = {};
            if (this.gutter) {
                style.marginLeft = `-${this.gutter / 2}px`;
                style.marginRight = style.marginLeft;
            }
            return style;
        }
    },
    render(createElement) {
        return createElement(this.tag, {
            class: [
                'sh-row',
                this.justify !== 'start' ? `is-justify-${this.justify}` : '',
                this.align !== 'top' ? `is-align-${this.align}` : '',
                { 'sh-row--flex': this.type === 'flex' }
            ],
            style: this.style
        }, this.$slots.default);
    }
};
</script>
<style lang="stylus">
.sh-row {
    position: relative;
    box-sizing: border-box;

    &::before, &::after {
        display: table;
        content: '';
    }

    &::after {
        clear: both;
    }

    &.sh-row--flex {
        display: flex;

        &:before, &:after {
            display: none;
        }

        &.is-justify-center {
            justify-content: center;
        }
    }

    &.is-justify-end {
        justify-content: flex-end;
    }

    &.is-justify-space-between {
        justify-content: space-between;
    }

    &.is-justify-space-around {
        justify-content: space-around;
    }

    &.is-align-middle {
        align-items: center;
    }

    &.is-align-bottom {
        align-items: flex-end;
    }
}
</style>


