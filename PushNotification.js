// Push notification
            var androidConfig = {
                "senderID":"984949831491",
                "ecb" : "window.onNotificationGCM"
            };

            var iosConfig = {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb" : "window.onNotificationAPN"
            };

            var pushNotification = window.plugins.pushNotification;
            if(device.platform == 'Android'){
                pushNotification.register(successHandler, errorHandler,androidConfig);
            }
            if(device.platform == 'iOS'){
                pushNotification.register(tokenHandler, errorHandler,iosConfig);
            }

            window.onNotificationAPN = function(e) {
                if (e.alert) {
                    navigator.notification.alert(e.alert);
                }
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            // handle GCM notifications for Android

            window.onNotificationGCM = function(e) {
                switch (e.event) {
                    case 'registered':
                        if (e.regid.length > 0) {
                            navigator.notification.alert(e.regid);
                            // Your GCM push server needs to know the regID before it can push to this    device
                            // here is where you might want to send it the regID for later use.
                            //$("#app-status-ul").append("<li>regID = " + e.regid +"</li>");
                            //alert(e.regid);
                            sessionStorage.setItem("deviceId",e.regid);
                        }
                        break;
                    case 'message':
                        // if this flag is set, this notification happened while we were in the foreground.
                        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                        if (e.foreground) {
                            navigator.notification.alert('--INLINE NOTIFICATION--');
                            // if the notification contains a soundname, play it.
                            var my_media = new Media("/android_asset/www/" + e.soundname);
                            my_media.play();
                        } else { // otherwise we were launched because the user touched a notification in the notification tray.
                            if (e.coldstart) navigator.notification.alert('--COLDSTART NOTIFICATION--');
                            else navigator.notification.alert('--BACKGROUND NOTIFICATION--');
                        }
                        navigator.notification.alert(e.payload.message);
                        navigator.notification.alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
                        break;
                    case 'error':
                        navigator.notification.alert('ERROR -> MSG:' + e.msg);
                        break;
                    default:
                        navigator.notification.alert('EVENT -> Unknown, an event was received and we do not know what it is');
                        break;
                }
            }
            function tokenHandler(result) {
                navigator.notification.alert(result, null, 'Alert', 'OK');
                sessionStorage.setItem("deviceId", result);
                sessionStorage.setItem("notificationServer", "APNS");
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }

            function successHandler(result) {
                navigator.notification.alert(result, null, 'Alert', 'OK');
                sessionStorage.setItem("deviceId", result);
                sessionStorage.setItem("notificationServer", "GCM");
            }

            function errorHandler(error) {
                navigator.notification.alert(error, null, 'Alert', 'OK');
                //alert(error);
            }
