let Mock  = require('mockjs');
let Home  = require('./router/home')();
let Search=require('./router/search')();
let Monitor=require('./router/monitor')();
let Subset=require('./router/subsets')();
let Table=require('./router/table')();
module.exports = function() {
  //
  var data = {
    home: Home,
    test: Home,
    search:Search,
    monitor:Monitor,
    table:Table,
    subset:Subset
  };

  return data;
}
