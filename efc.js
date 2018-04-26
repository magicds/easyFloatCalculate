(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
global.efc = require('./index.js');
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./index.js":2}],2:[function(require,module,exports){
// 数值范围
var MAX_NUM = Math.pow(2, 31) - 1;
var MIN_NUM = -Math.pow(2, 31);
/**
 * 将浮点数转化为整数
 *
 * @param {Number} num 要处理的数值
 * @returns {Array<Number>} 处理后的值，第一个成员为结果，第二个为放大的倍数
 * example:
 * input: toInt(0.3);
 * output: [3, 10]
 */
function toInt(num) {
  if (num >= MAX_NUM || num <= MIN_NUM) {
    console &&
      console.error &&
      console.error(num + '范围越界，该方案计算可能有误，请尝试其他方案！');
    return [num, 1];
  }
  // 正负标记
  var positiveFlag = num < 0 ? -1 : 1;
  var arr = (num || 0).toString().split('.');
  var int = parseInt(arr[0], 10);
  var decimalStr = arr[1] ? arr[1] : '';
  var decimal = parseInt(decimalStr || 0, 10);
  var times = Math.pow(10, decimalStr.length);
  // 结果
  var result = int * times + positiveFlag * decimal;
  // 放大缩小倍数
  var multiple = times === 1 ? 1 : positiveFlag * times;
  if (result >= MAX_NUM || result <= MIN_NUM) {
    console &&
      console.error &&
      console.error('转化后范围越界，该方案计算可能有误，请尝试其他方案！');
    return [num, 1];
  }

  return [result, multiple];
}

function add(num1, num2) {
  var op1 = toInt(num1);
  var op2 = toInt(num2);
  var maxMultiple = Math.max(Math.abs(op1[1]), Math.abs(op2[1]));

  return (
    (op1[0] * Math.abs(maxMultiple / op1[1]) + op2[0] * Math.abs(maxMultiple / op2[1])) /
    Math.abs(maxMultiple)
  );
}

function sub(num1, num2) {
  var op1 = toInt(num1);
  var op2 = toInt(num2);
  var maxMultiple = Math.max(Math.abs(op1[1]), Math.abs(op2[1]));

  return (
    (op1[0] * Math.abs(maxMultiple / op1[1]) - op2[0] * Math.abs(maxMultiple / op2[1])) /
    Math.abs(maxMultiple)
  );
}

function mul(num1, num2) {
  var op1 = toInt(num1);
  var op2 = toInt(num2);
  return op1[0] * op2[0] / Math.abs(op1[1] * op2[1]);
}

function div(num1, num2) {
  var op1 = toInt(num1);
  var op2 = toInt(num2);
  return op1[0] / op2[0] * Math.abs(op2[1] / op1[1]);
}
var efc = {
  toInt: toInt,
  add: add,
  sub: sub,
  mul: mul,
  div: div
};
// exports = efc;
module.exports = efc;

},{}]},{},[1]);
