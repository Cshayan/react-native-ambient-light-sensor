import React, { useEffect } from 'react';
import { StyleSheet, View, Text, DeviceEventEmitter } from 'react-native';
import { startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import { LIGHT_SENSOR } from 'example/constants/constants';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  useEffect(() => {
      startLightSensor();
      
      const subscription = DeviceEventEmitter.addListener(
        LIGHT_SENSOR,
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
    <View style={styles.container}>
      <Text>Light Result Value: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
