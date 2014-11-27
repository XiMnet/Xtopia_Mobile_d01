var mobileMS = kendo.observable({
                                    latest_lat: 0,
                                    latest_lng: 0,
                                    device_uuid: 'device.uuid',
                                    device_name: 'device.name',
                                    device_phonegap: 'device.phonegap',
                                    device_platform: 'device.platform',
                                    device_version: 'device.version',
                                    fn_mobileMS_update: function(e) {
                                        
                                        var user_id = 0;
                                        if (localStorage.getItem("user_id") !== null) {
                                            user_id = localStorage.getItem("user_id")
                                        }

                                        XiMnet_JS_Tool.fn_XiMnet_ajax('mobileMS.ashx', {

                                            device_uuid: mobileMS.device_uuid,
                                            device_name: mobileMS.device_name,
                                            device_phonegap: mobileMS.device_phonegap,
                                            device_platform: mobileMS.device_platform,
                                            device_version: mobileMS.device_version,
                                            latest_lat: mobileMS.latest_lat,
                                            latest_lng: mobileMS.latest_lng,
                                            user_id: user_id,
                                            process_type: 'ADD_DEVICE'

                                        }, "mobileMS", "fn_mobileMS_update")

                                    }
                                      
                                });