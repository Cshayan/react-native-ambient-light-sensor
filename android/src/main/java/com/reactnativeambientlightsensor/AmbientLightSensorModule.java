package com.reactnativeambientlightsensor;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@ReactModule(name = AmbientLightSensorModule.NAME)
public class AmbientLightSensorModule extends ReactContextBaseJavaModule implements SensorEventListener {

    public static final String NAME = "AmbientLightSensor";
    private final SensorManager mSensorManager;
    private final Sensor mSensorLight;
    private final ReactApplicationContext mReactContext;

    public AmbientLightSensorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        mSensorManager = (SensorManager) mReactContext.getSystemService(mReactContext.SENSOR_SERVICE);
        mSensorLight = mSensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    private void sendEvent(@NonNull WritableMap params) {
        try {
            if (mReactContext != null) {
                mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("LightSensor", params);
            }
        } catch (RuntimeException e) {
            Log.d("ERROR", "error in sending event");
        }
    }

    @Override
    public final void onSensorChanged(SensorEvent sensorEvent) {
        WritableMap sensorMap = Arguments.createMap();
        float lightSensorValue = sensorEvent.values[0];
        sensorMap.putDouble("lightValue", lightSensorValue);
        sendEvent(sensorMap);
    }

    @Override
    public final void onAccuracyChanged(Sensor sensor, int accuracy) {
    }

    @ReactMethod
    public void startLightSensor() {
        if (mSensorLight == null) {
            return;
        }
        mSensorManager.registerListener(this, mSensorLight, SensorManager.SENSOR_DELAY_NORMAL);
    }

    @ReactMethod
    public void stopLightSensor() {
        if (mSensorLight == null) {
            return;
        }
        mSensorManager.unregisterListener(this);
    }

}
