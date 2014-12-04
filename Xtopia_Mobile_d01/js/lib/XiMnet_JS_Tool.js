var XiMnet_JS_Tool = {

    // for ajax call
    //fn_XiMnet_ajax: function (str_API, obj_data, str_page, str_function) {

    //    var str_result;

    //    $.ajax({
    //        //type: "POST",
    //        url: app_config.str_project_url + str_API,
    //        data: obj_data,
    //        beforeSend: function () {

    //        },
    //        success: function (val) {

    //            str_result = val;

    //            //if have error
    //            if (val.indexOf("Error") > -1) {

    //                var json = jQuery.parseJSON(val);
    //                str_result = json.Messages[0].Msg, str_page, str_function;

    //            }

    //        },
    //        error: function (xhr, status, error) {

    //            XiMnet_JS_Tool.fn_error(error, str_page, str_function);

    //        },
    //        async: false,
    //        cache: false

    //    });

    //    return str_result;

    //},
    // need to use JSONP to allow cross-domain
    fn_XiMnet_ajax_JSONP: function (str_API, obj_data, str_page, str_function) {

        var str_result;
        
        $.ajax({
            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            async: false,

            // tell jQuery we're expecting JSONP
            dataType: "jsonp",
          
            url: app_config.str_project_url + str_API,
            data: obj_data,
            beforeSend: function () {
                XiMnet_JS_Tool.fn_log("ajax before send");
            },
           success: function (val) {
                str_result = val;

                //if have error
                if (val[0].error_msg) {
                    if (val[0].error_msg.indexOf("Error:") > -1) {
                        str_result = val[0].error_msg;
                    }
                }
                XiMnet_JS_Tool.fn_log("ajax success");
            },
            error: function (xhr, status, error) {
                this.fn_error(error);
                return error;
            },
            cache: false

        });
        
        return str_result;

    },
    
    // generate GUID from server
    fn_GUID: function () {
        return XiMnet_JS_Tool.fn_XiMnet_ajax('XiMnet_Tool.ashx', {
            process_type: 'GET_GUID'
        }, "registerMS", "fn_register_user");
    },

    // hash password
    fn_md5: function (str_string) {
        return hex_md5(str_string);
    },

    //show message to user
    fn_show_msg: function (str_msg) {
        alert(str_msg);
    },

    //show error to console
    fn_error: function (str_error, str_page, str_function) {
        if (app_config.bool_debug === true) {
            console.log(str_error + " # " + str_page + " # " + str_function);
        }
    },

    //log message to console
    fn_log: function (str_msg) {
        if (app_config.bool_debug === true) {
            console.log(str_msg);
        }
    },

    fn_get_querystring_by_name: function () {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
};