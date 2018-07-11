let Mock  = require('mockjs');
let Random = Mock.Random;

module.exports = function() {
  let data = [];
  var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6)));

  for (var i = 0; i < 8; i++) {

    var content = Random.cparagraph(0,10);

    data.push({
         id: i,
         title: Random.cword(8,20),
         desc: content.substr(0,40),
         tag: Random.cword(2,6),
         views: Random.integer(100,5000),
         images: images.slice(0,Random.integer(1,3))
    })
  }

  return data;
}

/*
let faker = require('faker');
faker.locale = "zh_CN";
console.log(faker.address.city());
console.log(faker.address.zipCode());
console.log(faker.address.streetName());
console.log(faker.address.latitude());
console.log(faker.company.companyName());
console.log(faker.date.month());
console.log(faker.date.past());
console.log(faker.internet.avatar());
console.log(faker.internet.email());
console.log(faker.phone.phoneNumber());
console.log(faker.random.locale());
*/
