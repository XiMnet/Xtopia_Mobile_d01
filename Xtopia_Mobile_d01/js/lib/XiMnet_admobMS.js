var XiMnet_admobMS = kendo.observable({

    fn_init: function (e) {

    },
    fn_show_ads_banner_top: function () {
        if (!this.fn_check_simulator()) {
            this.fn_show_banner('top', window.plugins.AdMob.AD_SIZE.BANNER);
        }
    },
    fn_show_ads_banner_bottom: function () {
        if (!this.fn_check_simulator()) {
            this.fn_show_banner('bottom', window.plugins.AdMob.AD_SIZE.BANNER);
        }
    },

    fn_show_ads_rectangle_top: function () {
        if (!this.fn_check_simulator()) {
            this.fn_show_banner('top', window.plugins.AdMob.AD_SIZE.IAB_MRECT);
        }
    },

    fn_show_banner: function (bannerPosition, bannerType) {
      
        var admob_ios_key = app_config.admob_banner_ios_key;
        var admob_android_key = app_config.admob_banner_android_key;
        // var admob_wp8_key = 'ca-app-pub-9517346003011652/2695027726'; // future work

        var adMobKey = (navigator.userAgent.indexOf('Android') >= 0) ? admob_android_key : admob_ios_key;

        window.plugins.AdMob.createBannerView(
            // createBannerView params
            {
                'publisherId': adMobKey,
                'adSize': bannerType,
                'bannerAtTop': bannerPosition == 'top'
            },
            // createBannerView success callback
            function () {
                window.plugins.AdMob.requestAd(
                    // requestAd params
                    { 'isTesting': false },
                    // requestAd success callback
                    function () {
                        window.plugins.AdMob.showAd(
                            // showAd params
                            true,
                            // showAd success callback
                            function () { console.log('show ok') },
                            // showAd error callback
                            function () { alert('failed to show ad') });
                    },
                    // requestAd error callback
                    function () { alert('failed to request ad'); }
                );
            },
            // createBannerView error callback
            function () { alert('failed to create banner view'); }
        );
    },

    fn_show_interstitial_view: function () {
        
          alert("interstitial");
        
        if (this.fn_check_simulator()) {
            return;
        }

        var admob_ios_key = app_config.admob_interstitial_ios_key;
        var admob_android_key = app_config.admob_interstitial_android_key;
        // var admob_wp8_key = 'ca-app-pub-9517346003011652/2695027726'; // future work

        var adMobKey = (navigator.userAgent.indexOf('Android') >= 0) ? admob_android_key : admob_ios_key;

          alert(adMobKey);
        
        window.plugins.AdMob.createInterstitialView(
            // createInterstitialView params
            {
                'publisherId': adMobKey
            },
            // createInterstitialView success callback
            function () {
                window.plugins.AdMob.requestInterstitialAd(
                    // requestInterstitialAd  params
                    { 'isTesting': false },
                    // requestInterstitialAd  success callback
                    function () {
                        
                      window.plugins.AdMob.showAd(
                          // showAd params
                          true,
                          // showAd success callback
                          function() {alert('show ok')},
                          // showAd error callback
                          function() { alert('failed to show ad')});
                          
                    },
                    // requestInterstitialAd  error callback
                    function () { alert('failed to request ad'); }
                );
            },
            // createInterstitialView error callback
            function () { alert('failed to create banner view'); }
        );
    },

    fn_hide_banner: function () {
        if (!this.fn_check_simulator()) {
            window.plugins.AdMob.destroyBannerView();
        }
    },

    fn_check_simulator: function () {
        if (window.navigator.simulator === true) {
            alert('This plugin is not available in the simulator.');
            return true;
        } else if (window.plugins === undefined || window.plugins.AdMob === undefined) {
            alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
            return true;
        } else {
            return false;
        }
    }

});