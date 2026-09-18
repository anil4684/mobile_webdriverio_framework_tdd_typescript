import path from 'node:path';
import { loginBeforeTest } from './test/hooks/login.hooks.ts';

export const config = {

    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    tsConfigPath: './tsconfig.json',

    specs: [
        './test/specs/**/*.ts'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:platformVersion': '8.0',
            'appium:deviceName': 'emulator-5554',
            'appium:udid': 'emulator-5554',
            'appium:appPackage': 'com.swaglabsmobileapp',
            'appium:appActivity': '.SplashActivity',
            'appium:app': path.join(
                process.cwd(),
                'app/android/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
            ),
            'appium:adbExecTimeout': 60000
        }
    ],

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 1,

    services: [],

    framework: 'mocha',

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    beforeTest: async function () {
        await loginBeforeTest();
    },

    mochaOpts: {
        timeout: 60000
    }
};