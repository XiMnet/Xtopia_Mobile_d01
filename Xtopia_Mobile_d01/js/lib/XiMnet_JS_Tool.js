var XiMnet_JS_Tool = {

    // for ajax call
    fn_XiMnet_ajax: function (str_API, obj_data, str_page, str_function) {

        var str_result;

        $.ajax({
            type: "POST",
            url: _str_url + str_API,
            data: obj_data,
            beforeSend: function () {

            },
            success: function (val) {

                str_result = val;

                //if have error
                if (val.indexOf("Error") > -1) {

                    var json = jQuery.parseJSON(val);
                    str_result = json.Messages[0].Msg, str_page, str_function;

                }

            },
            error: function (xhr, status, error) {

                XiMnet_JS_Tool.fn_error(error, str_page, str_function);

            },
            async: false,
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
        if (XiMnet_JS_Tool.debug === true) {
            console.log(str_error + " # " + str_page + " # " + str_function);
        }
    },

    //log message to console
    fn_log: function (str_msg) {
        if (XiMnet_JS_Tool.debug === true) {
            console.log(str_msg);
        }
    }
};