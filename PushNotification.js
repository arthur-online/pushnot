
            function onDeviceReady() {
                alert('Device is ready');
                try 
                { 
                           
if (!window.plugins.pushNotification) {
  pushNotification = window.plugins.pushNotification;
}
                  
              //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
              alert('Registering ' + device.platform);
                    if(device.platform == 'android' || device.platform == 'Android' ||device.platform == 'amazon-fireos' ) {
                        pushNotification.register(
                        successHandler, 
                        errorHandler, 
                        {
                            "senderID":"984949831491",
                            "ecb":"onNotification"
                        });     // required!

                        alert('Registered the Android device');
                        alert('regID = ' + e.regid);
                    } else {
                        pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
                        alert('Registered the iOS device');
                    }
                }
                catch(err) 
                { 
                    txt="There was an error on this page.\n\n"; 
                    txt+="Error description: " + err.message + "\n\n"; 
                    //alert(txt); 
                    alert('Error: ' + err.message);
                } 
            }

            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if(e.alert) {
                     //$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     //alert('push-notification: ' + e.alert);
                     // showing an alert also requires the org.apache.cordova.dialogs plugin
                     navigator.notification.alert(e.alert);
                }

                if(e.sound) {
                    // playing a sound also requires the org.apache.cordova.media plugin
                    var snd = new Media(e.sound);
                    snd.play();
                }

                if(e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }

            // handle GCM notifications for Android
            function onNotification(e) {
                //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                alert('EVENT -> RECEIVED:' + e.event);

                switch( e.event )
                {
                    case 'registered':
                    if( e.regid.length > 0 )
                    {
                        //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                        // Your GCM push server needs to know the regID before it can push to this device
                        // here is where you might want to send it the regID for later use.
                        console.log("regID = " + e.regid);
                        alert(' REGID = ' + e.regid);
                    }
                    break;

                    case 'message':
                        // if this flag is set, this notification happened while we were in the foreground.
                        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                        if(e.foreground)
                        {
                            //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                            alert('--INLINE NOTIFICATION--');

                                // on Android soundname is outside the payload. 
                                    // On Amazon FireOS all custom attributes are contained within payload
                                    var soundfile = e.soundname || e.payload.sound;
                                    // if the notification contains a soundname, play it.
                                    // playing a sound also requires the org.apache.cordova.media plugin
                                    var my_media = new Media("/android_asset/www/"+ soundfile);
                            my_media.play();
                        }
                        else
                        {   // otherwise we were launched because the user touched a notification in the notification tray.
                            if(e.coldstart)
                                //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                                alert('--COLDSTART NOTIFICATION--')
                            else
                            //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                                alert('--BACKGROUND NOTIFICATION--')
                        }

                        //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                        alert('MESSAGE -> MSG: ' + e.payload.message);
                        //android only
                        //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
                        //amazon-fireos only
                        //$("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                        alert('MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp);
                    break;

                    case 'error':
                        //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                        alert('ERROR -> MSG' + e.msg);
                    break;

                    default:
                        //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                        alert('EVENT -> Unknown, an event was received and we do not know what it is');
                    break;
                }
            }

            function tokenHandler (result) {
                //$("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
                alert('iOS Result = ' + result);
            }

            function successHandler (result) {
                //$("#app-status-ul").append('<li>success:'+ result +'</li>');
                alert('Android Result = ' + result);
                alert('RegID = ' + e.regid);
            }

            function errorHandler (error) {
                //$("#app-status-ul").append('<li>error:'+ error +'</li>');
                alert('Error = ' + error);
            }

            document.addEventListener('deviceready', onDeviceReady(), true);

alert('regID = ' + e.regid);            
alert('Reg code completed');
