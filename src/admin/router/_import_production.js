module.exports = file => {
  /*异步路由*/
  return routerAsyn[file];
};

const routerAsyn = {
  'enter/index': r => require.ensure([], () => r(require(`../views/enter/index`)), `nongye/nongye-enter`),
  'home/index': r => require.ensure([], () => r(require(`../views/home/index`)), `nongye/nongye-home`),
  'page/index': r => require.ensure([], () => r(require(`../views/page/index`)), `nongye/nongye-page`),
  'area/index': r => require.ensure([], () => r(require(`../views/area/index`)), `nongye/nongye-area`),
  'login/index': r => require.ensure([], () => r(require(`../views/login/index`)), `nongye/nongye-login`),
  'login/loginmain/index': r => require.ensure([], () => r(require(`../views/login/loginmain/index`)), `nongye/nongye-login-loginmain`),
  'login/changepassword/index': r => require.ensure([], () => r(require(`../views/login/changepassword/index`)), `nongye/nongye-login-changepassword`),
  'login/fillaccount/index': r => require.ensure([], () => r(require(`../views/login/fillaccount/index`)), `nongye/nongye-login-fillaccount`),
  'login/messageauthentication/index': r => require.ensure([], () => r(require(`../views/login/messageauthentication/index`)), `nongye/nongye-login-messageauthentication`),
  'login/setnewpassword/index': r => require.ensure([], () => r(require(`../views/login/setnewpassword/index`)), `nongye/nongye-login-setnewpassword`),
  'equipment/index': r => require.ensure([], () => r(require(`../views/equipment/index`)), `nongye/nongye-equipment`),
  'user/index': r => require.ensure([], () => r(require(`../views/user/index`)), `nongye/nongye-user`),
  'system/index': r => require.ensure([], () => r(require(`../views/system/index`)), `nongye/nongye-system`),
};
