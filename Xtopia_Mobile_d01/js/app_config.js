var app_config = kendo.observable({
    //debug true will allow XiMnet_JS_Tool to output fn_error and fn_log in other tools
    //turn to false for deployment.
    debug: true,

    //project id set in table mobileMS_project
    project_id: "2F23A4CE-14F9-4BD1-8674-F73109708CB9",

    // START OF PUSH NOTIFICATION SETTINGS
    //telerik backend services get from Telerik Platform > Backend Services > API
    telerik_backend_services_API: "q9R5GXyO7C05fdny",

    //Google Project Number - https://console.developers.google.com/project
    androidProjectNumber: "650583620288",

    //Set this to true in order to test push notifications in the emulator. Note, that you will not be able to actually receive push notifications because we will generate fake push tokens. But you will be able to test your other push-related functionality without getting errors.
    emulatorMode: true,
    // END OF PUSH NOTIFICATION SETTING

    fn_init: function (e) {

        //TODO: get setting from database
        
    }
});