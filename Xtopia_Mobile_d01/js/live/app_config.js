var app_config = kendo.observable({
    //debug true will allow XiMnet_JS_Tool to output fn_error and fn_log in other tools
    //turn to false for deployment.
    bool_debug: true,

    //URL used to point to the URL of the online API/services
    //str_project_url: "http://develop.alchemedia-01.ximnet.my/XTOPIA/dev/xtopia_platform_d02/API/",
    str_project_url: "http://xtopia_platform_d02.ximnet.com.my/API/",

    //project id set in table mobileMS_project
    str_project_id: "2F23A4CE-14F9-4BD1-8674-F73109708CB9",

    // START OF PUSH NOTIFICATION SETTINGS
    //telerik backend services get from Telerik Platform > Backend Services > API
    str_telerik_backend_services_API: "q9R5GXyO7C05fdny",

    //Google Project Number - https://console.developers.google.com/project
    str_android_project_number: "650583620288",

    //Set this to true in order to test push notifications in the emulator. Note, that you will not be able to actually receive push notifications because we will generate fake push tokens. But you will be able to test your other push-related functionality without getting errors.
    bool_emulator_mode: true,
    // END OF PUSH NOTIFICATION SETTING

    //START OF SETTING FOR ADVERTISEMENT
    // go to www.admob.com, sign up, create your app (one for each platform) and change the keys below

    //advertisement - Banner Type
    str_admob_banner_ios_key: "ca-app-pub-9394298980021684/8820428654",
    str_admob_banner_android_key: "ca-app-pub-9394298980021684/6837494654",
    //admob_banner_wp8_key: "", // future support

    //advertisement - Interstitial View Type // an advertisement that appears while a chosen website or page is downloading.
    str_admob_interstitial_ios_key: "ca-app-pub-9394298980021684/7005618254",
    str_admob_interstitial_android_key: "ca-app-pub-9394298980021684/5528885057",
    //admob_interstitial_wp8_key: "", // future support

    //END OF SETTING FOR ADVERTISEMENT
    
    fn_init: function (e) {

        //TODO: get setting from database
        
    }
});