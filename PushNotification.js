var platform = null;
        document.addEventListener("deviceready", onDeviceReady(), false);
        function onDeviceReady() {
          platform = device.platform;
          alert(platform);
          //$("#app-status-ul").append('<li>'+ platform +'</li>');
          try 
            { 
                pushNotification = window.plugins.pushNotification;
          //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                if (device.platform == 'android' || device.platform == 'Android' ) {
        pushNotification.register(successHandler, errorHandler, {"senderID":"860557673192","ecb":"onNotification"});        // required!
                } else {
                    pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
                }
            }
            catch(err) 
            { 
                txt="There was an error on this page.\n\n"; 
                txt+="Error description: " + err.message + "\n\n"; 
                alert(txt); 
            } 
        }
