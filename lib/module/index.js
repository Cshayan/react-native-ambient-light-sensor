import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-ambient-light-sensor' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const AmbientLightSensor = NativeModules.AmbientLightSensor ? NativeModules.AmbientLightSensor : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
export async function hasLightSensor() {
  return AmbientLightSensor.hasLightSensor();
}
export function startLightSensor() {
  return AmbientLightSensor.startLightSensor();
}
export function stopLightSensor() {
  return AmbientLightSensor.stopLightSensor();
}
//# sourceMappingURL=index.js.map