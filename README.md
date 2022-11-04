# react-native-ambient-light-sensor
Helps to find your surrounding's light value (in lux unit) (for android only) using device light sensor
## Installation

```sh
npm install react-native-ambient-light-sensor
```

## Usage

```js
import { startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import { View, Text, DeviceEventEmitter } from 'react-native';

// ...

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  useEffect(() => {
      startLightSensor();
      
      const subscription = DeviceEventEmitter.addListener(
        'LIGHT_SENSOR',
        (data: { lightValue: number }) => {
            setResult(data.lightValue);
        },
    );

    return () => {
        stopLightSensor();
        subscription?.remove();
    };
  }, []);

  return (
    <View>
      <Text>Light Result Value: {result}</Text>
    </View>
  );
}
```

## Use case

You can apply any logic of your own based on the surrounding's light condition. For example, to auto turn on your device's flash/torch light if the surrounding environment is dark/dim.

## Important Note
The primary sensor data type for ambient light sensors is illuminance in lux (lumens per square meter). Use the data from below table to find and apply logic to your application accordingly.

The following example data set represents rough thresholds for common lighting conditions, and the corresponding lighting step. Here, each lighting step represents a change in lighting environment.

| Lighting condition | From (lux) | To (lux) |
| --------------- | --------------- | --------------- |
| Pitch Black | 0 | 10 |
| Very Dark | 11 | 50 |
| Dark Indoors | 51 | 200 |
| Dim Indoors | 201 | 400 |
| Normal Indoors | 401 | 1000 |
| Bright Indoors | 1001 | 5000 |
| Dim Outdoors | 5001 | 10,000 |
| Cloudy Outdoors | 10,001 | 30,000 |
| Direct Sunlight | 30,001 | 100,000 |

##### Note: This data set is for illustration and may not be completely accurate for all users or situations.

## Want to know more about its implementation

Check out the article - https://medium.com/@shayanchatterjee7/creating-a-surrounding-light-sensor-module-for-android-device-in-react-native-6a0f9fa7d13e

## NPM Package

Checkout the npm package of it - https://www.npmjs.com/package/react-native-ambient-light-sensor

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
