var app = {
init: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    },

    onDeviceReady: function(){
       // DO STUFF
       // ....
alert('1');
       // ENABLE PUSH
       this.push_init();
    },

    push_init: function(){
        app.SENDER_ID = "984949831491"; // replaced by my actual GCM project no

        var pushNotification = window.plugins.pushNotification;

        pushNotification.register( 
            function(){alert('Push: win');}, // never called
            function(){alert('Push: Error');},  // never called
            { senderID: app.SENDER_ID, ecb: "app.push_android" }
        );
    },
   // never called
   push_android: function(e){
       alert('connection established...');
   console.log( 'successfully started android' );
   console.log( e );
   }

};

// start the app
app.init();
