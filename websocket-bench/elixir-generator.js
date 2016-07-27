module.exports = {
   /**
    * On client connection (required)
    * @param {client} client connection
    * @param {done} callback function(err) {}
    */
   onConnect : function(client, done) {
     //client.emit('world_refresh' );
     console.log(client)
     //client.channel('rooms:game', {});
     done();
   },

   onMessage : function(client, done) {
     /*socket.on('world_update', function(worldPartial) {
       console.log(worldPartial);
       setTimeout(function(){
         socket.emit('world_refresh');
       }, 100);
     });*/
     console.log(client);
   },
   /**
    * Send a message (required)
    * @param {client} client connection
    * @param {done} callback function(err) {}
    */
   sendMessage : function(client, done) {
     console.log('send');
     client.emit('world_refresh');
     done();
   }

};
