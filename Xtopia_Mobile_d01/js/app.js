var appMS = kendo.observable({
    fn_init: function (e) {

        var kendo_app;

        //check if page is in device or web
        is_device_check = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;

        //in not device but in web browser
        if (typeof device === 'undefined') {

            kendo_app = new kendo.mobile.Application(document.body, {
                // comment out the following line to get a UI which matches the look
                // and feel of the operating system
                skin: 'flat',

                // the application needs to know which view to load first
                //initial: 'views/home.html'
            });

            //set up a test device object when in web browser
            var str_test_string = '324';
            mobileMS.device_uuid = 'test ' + str_test_string;
            mobileMS.device_name = 'Name test ' + str_test_string;
            mobileMS.device_phonegap = 'Phonegap test ' + str_test_string;
            mobileMS.device_platform = 'Platform test ' + str_test_string;
            mobileMS.device_version = 'Version test ' + str_test_string;

            //all functions to call when starting apps
            appMS.fn_start_all();

        }

        // in web browser deviceready will not fire.
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function () {

            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            navigator.splashscreen.hide();

            //localstorage for storing data in device
            //WARNING: Using localStorage for large data loads and complex objects might exhaust the memory of the device.
            //localStorage.setItem(name, value);
            //localStorage.removeItem(name)
            //localStorage.getItem(name);
            //localStorage.clear()
          
            kendo_app = new kendo.mobile.Application(document.body, {

                // comment out the following line to get a UI which matches the look
                // and feel of the operating system
                skin: 'flat'

                // the application needs to know which view to load first
                // initial: 'views/home.html'
            });

            //set up device object
            mobileMS.device_uuid = device.uuid;
            mobileMS.device_name = device.name;
            mobileMS.device_phonegap = device.phonegap;
            mobileMS.device_platform = device.platform;
            mobileMS.device_version = device.version;

            //all functions to call when starting apps
            appMS.fn_start_all();
            
            //activate push notification - only in deviceready as web browser do not have push notification
            XiMnet_PushNotification.fn_init();
            
        }, false);
    },
    fn_start_all: function (e) {

        //update the device information
        mobileMS.fn_mobileMS_update();
        
    }
});

(function () {

    //start the application
    appMS.fn_init();

}());