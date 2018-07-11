<script>
export default {
    name: 'ShCol',
    componentName: 'ShCol',
    props: {
        span: {
            type: Number,
            default: 24
        },
        tag: {
            type: String,
            default: 'div'
        },
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        xl: [Number, Object]
    },
    computed: {
        gutter() {
            let parent = this.$parent;
            while (parent && parent.$options.componentName !== 'ShRow') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        }
    },
    render(createElement) {
        let classList = [];
        let style = {};
        if (this.gutter) {
            style.paddingLeft = this.gutter / 2 + 'px';
            style.paddingRight = style.paddingLeft;
        }
        ['span', 'offset', 'pull', 'push'].forEach(prop => {
            if (this[prop] || this[prop] === 0) {
                let clazz = prop !== 'span' ? `sh-col-${prop}-${this[prop]}` : `sh-col-${this[prop]}`
                classList.push(clazz);
            }
        });

        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
            if (typeof this[size] === 'number') {
                classList.push(`sh-col-${size}-${this[size]}`);
                return;
            }
            if (typeof this[size] === 'object') {
                let props = this[size];
                Object.keys(props).forEach(prop => {
                    let clazz = prop !== 'span' ? `sh-col-${size}-${prop}-${props[prop]}` : `sh-col-${size}-${props[prop]}`;
                    classList.push(clazz);
                });
            }
        });

        return createElement(this.tag, {
            class: ['sh-col', classList],
            style
        }, this.$slots.default);
    }
};
</script>
<style lang="stylus">
$--col-columns = 24;

[class*='sh-col-'] {
    float: left;
    box-sizing: border-box;
}

.sh-col-0 {
    display: none;
}

for column in 1 .. $--col-columns {
    .sh-col-{column} {
        width: (1 / 24 * column * 100) * 1%;
    }

    .sh-col-offset-{column} {
        margin-left: (1 / 24 * column * 100) * 1%;
    }

    .sh-col-pull-{column} {
        position: relative;
        right: (1 / 24 * column * 100) * 1%;
    }

    .sh-col-push-{column} {
        position: relative;
        left: (1 / 24 * column * 100) * 1%;
    }
}

@media only screen and (max-width: 768px) {
    for column in 1 .. $--col-columns {
        .el-col-xs-0 {
            display: none;
        }

        .sh-col-xs-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-offset-xs-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-pull-xs-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-push-xs-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 768px) {
    for column in 1 .. $--col-columns {
        .el-col-sm-0 {
            display: none;
        }

        .sh-col-sm-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-offset-sm-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-pull-sm-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-push-sm-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 992px) {
    for column in 1 .. $--col-columns {
        .el-col-md-0 {
            display: none;
        }

        .sh-col-md-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-offset-md-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-pull-md-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-push-md-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 1200px) {
    for column in 1 .. $--col-columns {
        .el-col-lg-0 {
            display: none;
        }

        .sh-col-lg-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-offset-lg-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-pull-lg-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-push-lg-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 1920px) {
    for column in 1 .. $--col-columns {
        .el-col-xl-0 {
            display: none;
        }

        .sh-col-xl-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-offset-xl-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-pull-xl-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .sh-col-push-xl-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}
</style>
