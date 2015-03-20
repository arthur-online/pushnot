alert('a');
var pushNotification;

function successHandler (result) {
alert('success')
    
}
function errorHandler (error) {
alert('fail')
    
}

window.onNotificationGCM = function(e) {
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                console.log('REGISTERED -> REGID:' + e.regid );
            }
            break;
        case 'message':
            console.log('gcm: on message ');
            break;

        case 'error':
            console.log( "gcm error: "+e.msg );
            break;
        default:
            break;
    }
};

function initialize() {
    document.addEventListener("deviceready", function(){
        console.log("device ready");

        pushNotification = window.plugins.pushNotification;
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            try {
                pushNotification.register(
                    successHandler, errorHandler, { "senderID":"562539000000", "ecb":"window.onNotificationGCM" });
            } catch(err)
            {
                txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                alert(txt);
            }
        }

    });
}
