"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLightSensor = hasLightSensor;
exports.startLightSensor = startLightSensor;
exports.stopLightSensor = stopLightSensor;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-ambient-light-sensor' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const AmbientLightSensor = _reactNative.NativeModules.AmbientLightSensor ? _reactNative.NativeModules.AmbientLightSensor : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});

async function hasLightSensor() {
  return AmbientLightSensor.hasLightSensor();
}

function startLightSensor() {
  return AmbientLightSensor.startLightSensor();
}

function stopLightSensor() {
  return AmbientLightSensor.stopLightSensor();
}
//# sourceMappingURL=index.js.map