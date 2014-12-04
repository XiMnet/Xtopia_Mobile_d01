function fn_init() {

    var Kendo_DataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: app_config.str_project_url + "mobilems.ashx",
                dataType: "jsonp",
                data: {
                    project_id: app_config.str_project_id,
                    //user_id: localStorage.getItem("user_id"),
                    process_type: 'LIST_INBOX_BY_USER_ID'
                },
                async: false
            }
        },
        schema: {
            total: function () {

                alert("total");

                var int_inbox_cnt;
                int_inbox_cnt = XiMnet_JS_Tool.fn_XiMnet_ajax_JSONP('mobileMS.ashx', {

                    project_id: app_config.str_project_id,
                    //user_id: localStorage.getItem("user_id"),
                    process_type: 'COUNT_INBOX_BY_USER_ID'

                }, "sample_listviewMS", "fn_init");

                $("#total-message").html(int_inbox_cnt[0].cnt_inbox);
                return int_inbox_cnt[0].cnt_inbox;

            }
        },
        serverPaging: true,
        pageSize: 20
    });

    $("#sample-listview").kendoMobileListView({
        dataSource: sample_listviewMS.Kendo_DataSource,
        template: $("#sample-listview-template").text(),
        pullToRefresh: true,
        endlessScroll: true
    })
      .kendoTouch({
          filter: ">li",
          enableSwipe: true,
          touchstart: touchstart,
          tap: fn_navigate,
          swipe: swipe
      });

    function fn_navigate(e) {
        var itemUID = $(e.touch.currentTarget).data("uid");
        kendo.mobile.application.navigate("#edit-detailview?uid=" + itemUID);
    }

    function swipe(e) {
        var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
        button.expand().duration(200).play();
    }

    function touchstart(e) {
        var target = $(e.touch.initialTouch),
            listview = $("#sample-listview").data("kendoMobileListView"),
            model,
            button = $(e.touch.target).find("[data-role=button]:visible");

        if (target.closest("[data-role=button]")[0]) {
            model = sample_listviewMS.Kendo_DataSource.getByUid($(e.touch.target).attr("data-uid"));
            sample_listviewMS.Kendo_DataSource.remove(model);

            //prevent `swipe`
            this.events.cancel();
            e.event.stopPropagation();
        } else if (button[0]) {
            button.hide();
            //prevent `swipe`
            this.events.cancel();
        } else {
            listview.items().find("[data-role=button]:visible").hide();
        }
    }

}