var registerMS = kendo.observable({
    form_validator:'',
    fn_register_user: function (e) {

        //validate the form
        if (registerMS.form_validator.validate()) {
        } else {
            return "";
        }

        var str_hashed_user_password = hex_md5($('#user_password').val() + $('#user_email').val());

        //register the user
        var str_result = XiMnet_JS_Tool.fn_XiMnet_ajax_JSONP('mobileMS.ashx', {

            user_first_name: $('#user_first_name').val(),
            user_last_name: $('#user_last_name').val(),
            user_email: $('#user_email').val(),
            user_password: str_hashed_user_password,
            user_added_by: 'own_register',
            process_type: 'ADD_USER'
            
        }, "mobileMS", "fn_register_user")
        
         console.log("registerMS" + str_result);

        if (str_result.indexOf("Email exist in the system") !== -1)
        { XiMnet_JS_Tool.fn_show_msg("Email address is already registered. Please try with a different email or login."); }
        else {
            XiMnet_JS_Tool.fn_show_msg("Register successful.");
        }

    },
    fn_init: function (e) {
         
        registerMS.form_validator = $("#form_reg").kendoValidator({
                rules: {
                    verifyPasswords: function (input) {

                        var ret = true;
                        if (input.is("[id=user_confirm_password]")) {
                            ret = input.val() === $("#user_password").val();
                        }
                        return ret;
                    }
                },
                messages: {
                    required: function (input) {
                        var element = input[0],
                label = $(element.form).find("[for=" + element.id + "]");
                        return label.text().replace(":", "") + " is required.";
                    },
                    email: "Please provide a valid email address",
                    verifyPasswords: "Passwords do not match!"
                }
        }).getKendoValidator();

            $("#user_gender").kendoMobileButtonGroup();

            var body = $(".km-pane");

            if (kendo.ui.DropDownList) {

                $("#dropdown").kendoDropDownList({
                    // The options are needed only for the desktop demo, remove them for mobile.
                    popup: { appendTo: body },
                    animation: { open: { effects: body.hasClass("km-android") ? "fadeIn" : body.hasClass("km-ios") || body.hasClass("km-wp") ? "slideIn:up" : "slideIn:down" } }
                });
            }

            if (kendo.ui.Slider) {
                $("#slider").kendoSlider({ tooltip: { enabled: false } });
            }
        }
});