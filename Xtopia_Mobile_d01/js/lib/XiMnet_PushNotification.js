//For handing Push Notification to devices
// URL: http://docs.telerik.com/platform/appbuilder/sample-apps/sample-backend-services-pushnotifications

// 1. Get Google API Key & Android Project Number
//  1.1 Refer to XiMnet's Account 
// 2. Enable "Google Cloud Messaging for Android"
// 3. Create a Telerik Platform Project and 'Backend Services'
// 4. Set Google API Key in the 'Backend Services'
// 4. Get Telerik Backend Services API key and update as below.
//END - config

//END push notification setting

var XiMnet_PushNotification = kendo.observable({
    fn_init: function (e) {

        // START PUSH NOTIFICATION 
        //This is your Telerik BackEnd Services API key.
        var baasApiKey = app_config.str_telerik_backend_services_API;

        //This is the scheme (http or https) to use for accessing Telerik BackEnd Services.
        var baasScheme = 'http';

        //This is your Android project number. It is required by Google in order to enable push notifications for your app. You do not need it for iPhone.
        var str_android_project_number = app_config.str_android_project_number;

        var bool_emulator_mode = app_config.bool_emulator_mode;

        //Initialize the Telerik BackEnd Services SDK
        var el = new Everlive({
            apiKey: baasApiKey,
            scheme: baasScheme
        });
        
        var _onDeviceIsRegistered = function () {
            XiMnetJS_Tool.fn_log("Device is registered in Telerik BackEnd Services and can receive push notifications.");
            updateRegistration();
        };

        var _onDeviceIsNotRegistered = function () {
            registerInEverlive();
            XiMnetJS_Tool.fn_log("Device is not registered in Telerik BackEnd Services. Tap the button below to register it.");
        };

        var _onDeviceIsNotInitialized = function () {
            XiMnetJS_Tool.fn_log("Device unregistered.<br /><br />Push token was invalidated and device was unregistered from Telerik BackEnd Services. No push notifications will be received.");
        };

        var _onDeviceRegistrationUpdated = function () {
            XiMnetJS_Tool.fn_log("Device registration updated.");
        };

        var onAndroidPushReceived = function (args) {
            XiMnetJS_Tool.fn_log("Android notification received: " + JSON.stringify(args));
        };

        var onIosPushReceived = function (args) {
            XiMnet_JS_Tool.fn_log('iOS notification received: ' + JSON.stringify(args));
        };

        //Initializes the device for push notifications.
        var enablePushNotifications = function () {
            //Initialization settings
            var pushSettings = {
                android: {
                    senderID: str_android_project_number
                },
                iOS: {
                    badge: "true",
                    sound: "true",
                    alert: "true"
                },
                notificationCallbackAndroid: onAndroidPushReceived,
                notificationCallbackIOS: onIosPushReceived
            }

            //    //$("#initializeButton").hide();
            XiMnet_JS_Tool.fn_log("Initializing push notifications...");

            var currentDevice = el.push.currentDevice(bool_emulator_mode);

            currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        XiMnet_JS_Tool.fn_log("initResult");

                        XiMnet_JS_Tool.fn_log("Token" + initResult.token);

                        XiMnet_JS_Tool.fn_log("Checking registration status...");

                        return currentDevice.getRegistration();

                    },
                    function (err) {
                        XiMnet_JS_Tool.fn_log("ERROR!<br /><br />An error occured while initializing the device for push notifications.<br/><br/>" + err.message);
                    }
                ).then(
                    function (registration) {
                        _onDeviceIsRegistered();

                    },
                    function (err) {
                        if (err.code === 801) {
                            _onDeviceIsNotRegistered();
                        }
                        else {
                            XiMnet_JS_Tool.fn_log("ERROR!<br /><br />An error occured while checking device registration status: <br/><br/>" + err.message);
                        }
                    }
                );
        };

        var registerInEverlive = function () {
            var currentDevice = el.push.currentDevice();

            if (!currentDevice.pushToken) currentDevice.pushToken = "some token";
            el.push.currentDevice()
                .register({ Age: 15, bool_emulator_mode: bool_emulator_mode, device_uuid: device.uuid })
                .then(
                    _onDeviceIsRegistered,
                    function (err) {
                        XiMnet_JS_Tool.fn_log('REGISTER ERROR: ' + JSON.stringify(err));
                    }
                );
        };

        var disablePushNotifications = function () {
            el.push.currentDevice()
                .disableNotifications()
                .then(
                    _onDeviceIsNotInitialized,
                    function (err) {
                        XiMnet_JS_Tool.fn_log('UNREGISTER ERROR: ' + JSON.stringify(err));
                    }
                );
        };

        var updateRegistration = function () {
            el.push.currentDevice()
                .updateRegistration({ Age: 16, device_uuid: device.uuid, Gender: 'Male' })
                .then(
                    _onDeviceRegistrationUpdated,
                    function (err) {
                        alert('UPDATE ERROR: ' + JSON.stringify(err));
                    }
                );
        };

        // END push notification

        enablePushNotifications();

    }
});