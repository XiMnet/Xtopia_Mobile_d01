var indexMS = kendo.observable({
    fn_test: function (e) {

        var dte_now = new Date().getTime();
        
        var dte_login = new Date( localStorage.getItem("login_datetime")).getTime();
        
        alert("logged in minutes: " + (dte_now - dte_login) / 60000);

        alert("user id " + localStorage.getItem("user_id"));
        alert("user email " + localStorage.getItem("user_email"));
        alert("user full name " + localStorage.getItem("user_first_name") + " " + localStorage.getItem("user_middle_name") + localStorage.getItem("user_last_name"));

    }
});