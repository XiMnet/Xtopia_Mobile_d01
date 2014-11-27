var sample_listviewMS = kendo.observable({
    fn_init: function (e) {


        'http://develop.alchemedia-01.ximnet.my/XTOPIA/dev/xtopia_platform_d02/api/mobilems.ashx?callback=jQuery19106814467927906662_1416811474437&user_email=a&user_password=b&process_type=sample_JSONP&skip=0&page=1&pageSize=2&_=1416811474438'

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://develop.alchemedia-01.ximnet.my/XTOPIA/dev/xtopia_platform_d02/api/mobilems.ashx",
                    dataType: "jsonp",
                    data: {

                        process_type: 'LIST_INBOX_BY_USER_ID'

                    }
                }
            },
            schema: {
                total: function () { return 2; }
            },
            serverPaging: true,
            pageSize: 2
        });

        $("#pull-to-refresh-listview").kendoMobileListView({
            dataSource: dataSource,
            pullToRefresh: true,
            pullToRefresh: true,
            template: $("#pull-to-refresh-template").text()
        });


       // var groupedData = [
       //{ name: "Sashimi salad", letter: "S" },
       //{ name: "Chirashi sushi", letter: "C" },
       //{ name: "Seaweed salad", letter: "S" },
       //{ name: "Edamame", letter: "E" },
       //{ name: "Miso soup", letter: "M" },
       //{ name: "Maguro", letter: "M" },
       //{ name: "Shake", letter: "S" },
       //{ name: "Shiromi", letter: "S" },
       //{ name: "Tekka maki", letter: "T" },
       //{ name: "Hosomaki Mix", letter: "H" },
       //{ name: "California rolls", letter: "C" },
       //{ name: "Seattle rolls", letter: "S" },
       //{ name: "Spicy Tuna rolls", letter: "S" },
       //{ name: "Ebi rolls", letter: "E" },
       //{ name: "Chicken Teriyaki", letter: "C" },
       //{ name: "Salmon Teriyaki", letter: "S" },
       //{ name: "Gohan", letter: "G" },
       //{ name: "Tori Katsu", letter: "T" },
       //{ name: "Yaki Udon", letter: "Y" }
       // ];


       // var flatData = ["Sashimi salad", "Chirashi sushi", "Seaweed salad", "Edamame", "Miso soup", "Maguro", "Shake", "Shiromi", "Tekka maki", "Hosomaki Mix", "California rolls", "Seattle rolls", "Spicy Tuna rolls", "Ebi rolls", "Chicken Teriyaki", "Salmon Teriyaki", "Gohan", "Tori Katsu", "Yaki Udon"];
        
        //$("#flat-listview").kendoMobileListView({ dataSource: flatData });

        //$("#grouped-listview").kendoMobileListView({
        //    dataSource: kendo.data.DataSource.create({ data: groupedData, group: "letter" }),
        //    template: "${name}",
        //    fixedHeaders: true
        //});



    }
});
