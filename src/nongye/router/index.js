/**
 * 定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */
const _import =
    process.env.NODE_ENV == "production" ?
    require("./_import_production").routerAsynFunc :
    require("./_import_development");

export default [{
        path: "/",
        component: _import("enter/index"),
        meta: {
            pageTitle: "智慧农业管理平台",
            requireAuth: true
        },
        children: [{
                path: "",
                redirect: "/index"
            },
            {
                path: "/index",
                name: "home",
                //component: _import("home/index"),
                component: _import("page_monitor/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/page",
                name: "page",
                component: _import("page/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //设备数据监控页面
                name: "page_monitor",
                path: "/page_monitor",
                component: _import("page_monitor/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //实时告警列表
                name: "page_realwarning",
                path: "/page_realwarning",
                component: _import("page_realwarning/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //告警记录列表
                name: "page_warnlog",
                path: "/page_warnlog",
                component: _import("page_warnlog/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //告警通知列表
                name: "page_warnnotice",
                path: "/page_warnnotice",
                component: _import("page_warnnotice/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //告警通知编辑
                name: "page_warnnotice/edit",
                path: "/page_warnnotice/edit",
                component: _import("page_warnnotice/edit"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //告警通知新增
                name: "page_warnnotice/add",
                path: "/page_warnnotice/add",
                component: _import("page_warnnotice/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //实时监控
                name: "monitor",
                path: "/page_monitor",
                component: _import("page_monitor/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //视频监控
                name: "monitors",
                path: "/monitor",
                component: _import("monitor/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            },
            {
                //地图监控
                name: "map_monitors",
                path: "/map_monitor",
                component: _import("map_monitor/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            },
            {
                //地图项目详情
                name: "map_project",
                path: "/map_project",
                component: _import("map_project/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            },
            {
                path: "/area",
                name: "area",
                component: _import("area/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/area/add",
                name: "areaAdd",
                component: _import("area/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/area/edit",
                name: "areaEdit",
                component: _import("area/edit"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/area/detail",
                name: "areaDetail",
                component: _import("area/detail"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/area/list",
                name: "areaDetail",
                component: _import("area/list"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/alarmmanage",
                name: "alarmmanage",
                component: _import("alarmmanage/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/alarm_setup",
                name: "alarm_setup",
                component: _import("alarm_setup/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/repairorder",
                name: "repairorder",
                component: _import("basis/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/equipment",
                name: "equipment",
                component: _import("equipment/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            }, {
                path: '/equipment/detail',
                component: _import("equipment/detail"),
                name: 'equipmentDetail',
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            }, {
                path: '/equipment/add',
                component: _import("equipment/add"),
                name: 'addEquipment',
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            }, {
                path: '/equipment/edit',
                component: _import("equipment/edit"),
                name: 'editEquipment',
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true,
                }
            }, {
                path: "/strategy",
                name: "strategy",
                component: _import("basis/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/statistical",
                name: "statistical",
                component: _import("basis/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/roots",
                name: "roots",
                component: _import("basis/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/systems",
                name: "systems",
                component: _import("basis/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/rolemanage",
                name: "rolemanage",
                component: _import("rolemanage/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/organization",
                name: "organization",
                component: _import("organization/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/organization/edit",
                name: "organizationedit",
                component: _import("organization/edit"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/user",
                name: "user",
                component: _import("user/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/user/add",
                name: "useradd",
                component: _import("user/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/smallprogram",
                name: "smallprogram",
                component: _import("smallprogram/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            // 小程序新增
            {
                path: "/smallprogram/smalladd",

                name: "smalladd",
                component: _import("smallprogram/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/equipmentview",
                name: "equipmentview",
                component: _import("equipment/view"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/rolemanage/roleedit",
                name: "roleedit",
                component: _import("rolemanage/edit"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                path: "/rolemanage/roleadd",
                name: "roleadd",
                component: _import("rolemanage/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            // 地图监控设备视图详细
            {
                path: "/map_monitor/view",
                name: "roleadd",
                component: _import("map_monitor/view"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事管理-日报列表页
                name: "dailypaper",
                path: "/dailypaper",
                component: _import("dailypaper/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事管理-日报详情页
                name: "dailypaper",
                path: "/dailypaper/detail",
                component: _import("dailypaper/detail"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事管理-日报编辑页
                name: "dailypaper",
                path: "/dailypaper/edit",
                component: _import("dailypaper/edit"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事管理-日报新增页
                name: "dailypaper",
                path: "/dailypaper/add",
                component: _import("dailypaper/add"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事-流程管理
                name: "farming_flowmanage",
                path: "/farming_flowmanage",
                component: _import("farming_flowmanage/index"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            },
            {
                //农事-流程管理--统计页面
                name: "farming_flowmanage_detail",
                path: "/farming_flowmanage/detail",
                component: _import("farming_flowmanage/detail"),
                meta: {
                    pageTitle: "智慧农业管理平台",
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: "/login",
        component: _import("login/index"),
        meta: {
            pageTitle: "智慧农业管理平台"
        },
        children: [{
                path: "",
                name: "login",
                component: _import("login/loginmain/index"),
                meta: {
                    pageTitle: "智慧农业管理平台"
                }
            },
            {
                path: "/changepassword",
                name: "changepassword",
                component: _import("login/changepassword/index"),
                meta: {
                    pageTitle: "智慧农业管理平台"
                }
            },
            {
                path: "/fillaccount",
                name: "fillaccount",
                component: _import("login/fillaccount/index"),
                meta: {
                    pageTitle: "智慧农业管理平台"
                }
            },
            {
                path: "/messageauthentication",
                name: "messageauthentication",
                component: _import("login/messageauthentication/index"),
                meta: {
                    pageTitle: "智慧农业管理平台"
                }
            },
            {
                path: "/setnewpassword",
                name: "setnewpassword",
                component: _import("login/setnewpassword/index"),
                meta: {
                    pageTitle: "智慧农业管理平台"
                }
            }
        ]
    }
];
