/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */
const _import =
    process.env.NODE_ENV == "production"
        ? require("./_import_production")
        : require("./_import_development");

export default [
    {
        path: "/",
        component: _import("enter/index"),
        meta: {
            pageTitle: "智慧农业管理后台",
            requireAuth: true,
        },
        children: [
            {
                path: "/index",
                redirect:  { name: 'user' }
            },
            {
                path: "/equipment",
                name: "equipment",
                component: _import("equipment/index"),
                meta: {
                    pageTitle: "智慧农业管理后台",
                    requireAuth: true,
                }
            },
             {
                path:"/area",
                name:'area',
                component: _import("area/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
  			},
            {
                path: "/index",
                name: "home",
                component: _import("home/index"),
                meta: {
                    pageTitle: "智慧农业管理后台",
                    requireAuth: true,
                }
            },
            {
                path: "/page",
                name: "page",
                component: _import("page/index"),
                meta: {
                    pageTitle: "智慧农业管理后台",
                    requireAuth: true,
                }
            },
            {
                path: "/user",
                name: "user",
                component: _import("user/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            },{
                path: "/system",
                name: "system",
                component: _import("system/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            }
        ]
    },
    {
        path: "/login",
        component: _import("login/index"),
        meta: {
            pageTitle: "智慧农业管理后台"
        },
        children: [
            {
                path: "",
                name: "login",
                component: _import("login/loginmain/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            },
            {
                path: "/changepassword",
                name: "changepassword",
                component: _import("login/changepassword/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            },
            {
                path: "/fillaccount",
                name: "fillaccount",
                component: _import("login/fillaccount/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            },
            {
                path: "/messageauthentication",
                name: "messageauthentication",
                component: _import("login/messageauthentication/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            },
            {
                path: "/setnewpassword",
                name: "setnewpassword",
                component: _import("login/setnewpassword/index"),
                meta: {
                    pageTitle: "智慧农业管理后台"
                }
            }
        ]
    },
];
