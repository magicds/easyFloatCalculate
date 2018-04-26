var efc = require('./index.js');
var add = efc.add;
var sub = efc.sub;
var mul = efc.mul;
var div = efc.div;
function random() {
  return (
    // 随机正负
    (Math.random() > 0.5 ? 1 : -1) *
    // 整数部分 0-10000
    (((Math.random() * 10000) >> 0) +
      // 随机 0-4位小数
      parseFloat('0.' + ((Math.random() * 10000) >> 0).toString(), 10))
  );
}
var OPERATION = ['+', '-', '*', '/'];

var errors = [];

function test() {
  var a = random();
  var b = random();
  var nArr = [];
  var rArr = [];
  nArr.push(a + b);
  nArr.push(a - b);
  nArr.push(a * b);
  nArr.push(a / b);
  rArr.push(add(a, b));
  rArr.push(sub(a, b));
  rArr.push(mul(a, b));
  rArr.push(div(a, b));

  for (var i = 0; i < 4; i++) {
    if (nArr[i] - rArr[i] >= 0.1) {
      var str = a + OPERATION[i] + b + '计算错误，预期：' + nArr[i] + '实际：' + rArr[i];
      errors.push(str);
      console.error(str);
    } else {
      console.log(a, OPERATION[i], b, '计算OK，预期：', nArr[i], '实际：', rArr[i]);
    }
  }
}

var i = 0;

while (i++ < 100000) {
  test();
}
console.log('运行了 %d 次', i - 1);
if (errors && errors.length) {
  console.error('发生错误 %s 次', errors.length);
  errors.forEach(function(item) {
    console.error(item);
  });
} else {
  console.log('没有发生错误');
}
