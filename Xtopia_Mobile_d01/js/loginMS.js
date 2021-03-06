var loginMS = kendo.observable({
    form_validator: '',
    fn_login: function (e) {

        //validate the form
        if (loginMS.form_validator.validate()) {
        } else {
            return "";
        }
               
        var str_hashed_user_password = hex_md5($('#user_password').val() + $('#user_email').val());

        //login the user
        var str_result = XiMnet_JS_Tool.fn_XiMnet_ajax_JSONP('mobileMS.ashx', {

            user_email: $('#user_email').val(),
            user_password: str_hashed_user_password,
            process_type: 'USER_LOGIN'

        }, "loginMS", "fn_login")
        
        console.log("loginMS" + str_result);

        if (str_result.indexOf("Error:") !== -1)
        {
            XiMnet_JS_Tool.fn_show_msg(str_result.replace("Error:", ""));
        }
        else {
           
            //store to local storage
            localStorage.setItem("user_id", str_result[0].user_id);
            localStorage.setItem("user_email", str_result[0].user_email);
            localStorage.setItem("user_first_name", str_result[0].user_first_name);
            localStorage.setItem("user_middle_name", str_result[0].user_middle_name);
            localStorage.setItem("user_last_name", str_result[0].user_last_name);
            localStorage.setItem("login_datetime", $.formatDateTime('yy/mm/dd g:ii a', new Date()));

            //update the device information
            mobileMS.fn_mobileMS_update();

            XiMnet_JS_Tool.fn_show_msg("Login successful.");

        }
    },
    fn_init: function (e) {
        
        console.log("loginMS");
        
        
        loginMS.form_validator = $("#form_login").kendoValidator({
            messages: {
                required: function (input) {
                    var element = input[0],
            label = $(element.form).find("[for=" + element.id + "]");
                    return label.text().replace(":", "") + " is required.";
                },
                email: "Please provide a valid email address"
            }
        }).getKendoValidator();

    }
});
