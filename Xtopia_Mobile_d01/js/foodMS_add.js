////START - config

var _int_update_location_internal = 5000; //miliseconds to update location to database
var _int_check_update_internal = 5000; //miliseconds to check if need to update (used in report_crime.js)
var _int_distance_KM_update_device = 5; // how many KM to update device on a new reported crime
var _int_to_update_device = 0; // to update device crime display or not

var _user_email = "huisheng@ximnet.com.my"; //store user email, temporary use my email, later change to FB email
var _user_ID = "123456"; //store user ID, temporary use 123456, later change to FB ID
var _food_photo_width = 1024; //resize food photo to this width
var _food_photo_height = 1024; //resize food photo to this height
var _food_photo_quality = 80; //compress food photo to this quality

var _curr_lat;
var _curr_lng;

var foodMS_add = kendo.observable({
                                     
                                      Food_Photo_Data: "",
                                      fn_take_picture: function (e) {
                                          function onFail(message) {
                                              XiMnet_JS_Tool.fn_error('Error.Photo Upload Failed: ' + message);
                                          }

                                          function onPhotoDataSuccess(imageData) {
                                              var img_camera = document.getElementById('img_camera');
                                              img_camera.style.display = 'block';
                                              img_camera.src = "data:image/jpeg;base64," + imageData;
                                              foodMS_add.Food_Photo_Data = imageData;
                                          }
                                          
                                          navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                                                                          quality : _food_photo_quality,
                                                                          targetWidth: _food_photo_width,
                                                                          targetHeight: _food_photo_height,
                                                                          destinationType :  Camera.DestinationType.DATA_URL,
                                                                          sourceType : Camera.PictureSourceType.CAMERA
                                                                      });
                                      },
                                      fn_submit_food_add: function (e) {

                                          foodMS_add.fn_get_geo_location();
                                          
                                          var imageData = foodMS_add.Food_Photo_Data;
                                          $.ajax({
                                                     type : "POST",
                                                     url : _str_url + 'foodMS_API.ashx',
                                                     data : {
                                                  image : imageData,
                                                  device_name: device.name,
                                                  device_phonegap: device.phonegap,
                                                  device_platform: device.platform,
                                                  device_uuid: device.uuid,
                                                  device_version: device.version,
                                                  process_type : 'ADD'
                                              },
                                                     beforeSend : function() {
                                                         XiMnet_JS_Tool.fn_log("start uploading");
                                                         
                                                     },
                                                     success: function(val) {       
                                                     
                                                         json = jQuery.parseJSON(val)
                                                         alert(json.Messages[0].Message);
                                                         
                                                     },
                                                     error: function (xhr, status, error) {
                                                         alert(error + 'fn_add_device');
                                                     },         
                                                     async: false,         
                                                     cache: false     
                                              
                                                 });
                                      },
                                      fn_get_geo_location: function(e) {
                                          //START to get user location by geolocation
                                          if (navigator.geolocation) {
                                              var options = {
                                                  enableHighAccuracy: true,
                                                  timeout: 15000,
                                                  maximumAge: 0
                                              };

                                              function success(pos) {
                                                  var crd = pos.coords;
           
                                                  var pos = new google.maps.LatLng(crd.latitude, crd.longitude);
           
                                                  _curr_lat = crd.latitude;
                                                  _curr_lng = crd.longitude;

                                                  $('#report-lat').html(_curr_lat);
                                                  $('#report-lng').html(_curr_lng);

                                                  // resolve location name by coordinates
                                                  var geocoder;
                                                  geocoder = new google.maps.Geocoder();
                                                  geocoder.geocode({ 'latLng': pos }, function (results, status) {
                                                      if (status === google.maps.GeocoderStatus.OK) {
                                                          if (results[1]) {
                                                              $("#report-location").html(results[1].formatted_address);
                                                          } else {
                                                              // alert('No results found');
                                                              $("#report-location").html("Address not found.");
                                                          }
                                                      } else {
                                                          alert('Geocoder failed due to: ' + status);
                                                      }
                                                  });
                                              };

                                              function error(err) {
                                                  alert('Please enable Location Service.');
                                              };

                                              navigator.geolocation.getCurrentPosition(success, error, options);
                                          } else {
                                              alert('Please enable Location Service.');
                                          }
                                          //END to get user location by geolocation
                                      }
                                  });

//kendo.bind($("#foodMS_add"), viewModel);

var fn_foodMS_add_after_show = function (e) {
    //if (kendo.ui.DropDownList) {
    //    $("#dropdown").kendoDropDownList({
    //        popup: { appendTo: body },
    //        animation: { open: { effects: body.hasClass("km-android") ? "fadeIn" : body.hasClass("km-ios") || body.hasClass("km-wp") ? "slideIn:up" : "slideIn:down" } }
    //    });
    //}
    //if (kendo.ui.Slider) {
    //    $("#slider").kendoSlider({ tooltip: { enabled: false } });
    //}
}