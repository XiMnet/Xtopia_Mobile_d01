var settingMS = kendo.observable({
    
    fn_init: function (e) {
         
        $("#switch_01").kendoMobileSwitch({
            checked: true,
            onLabel: "YES",
            offLabel: "NO"
        });

        }
});