let Mock  = require('mockjs');
let Random = Mock.Random;

module.exports = function() {
  let data = [];
  let datas = [];
  for (var i = 0; i < 10; i++) {
    data.push({
    		displayOrder: i,
        id: i,
        name: Random.cword(8),
        regionDeviceTypeName: Random.cword(4),
        userCreate1: Random.cword(4),
        userCreate2: Random.cword(4),
        userCreate3: Random.cword(4),
        userCreate4: Random.cword(4),
    })
  }
  datas[0]=27
 	datas[1]=data

  return datas;
}


