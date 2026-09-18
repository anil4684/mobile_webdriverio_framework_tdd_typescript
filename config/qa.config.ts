import path from 'node:path';
import { envConfig } from './env.config.ts';

export const qaConfig = {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    platformVersion: '8.0',
    deviceName: 'emulator-5554',
    udid: 'emulator-5554',

    appPackage: 'com.swaglabsmobileapp',
    appActivity: '.SplashActivity',

    app: path.join(
        process.cwd(),
        'app/android/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
    ),

    username: envConfig.username,
    password: envConfig.password,

    adbExecTimeout: 60000
};