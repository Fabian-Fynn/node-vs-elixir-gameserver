// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"
import {displayWorldPartial} from "./main"

class GameSocket {
  static init() {
    let socket = new Socket("/socket");
    socket.connect();
    socket.onClose( e => console.log("Closed connection"));

    var channel = socket.channel('rooms:game', {});
    channel.join()
      .receive( 'ok', () => { console.log('looks good'); this.getWorldPartial(channel);})
      .receive( 'error', () => console.log('connection error'));

    channel.on( "world_update", msg => {
      displayWorldPartial(msg);
      setTimeout(() => {
        this.getWorldPartial(channel);
      }, 100);
    } )
  }

  static getWorldPartial(channel){
    channel.push('world_refresh', Date.now());
  }
}

$( () => GameSocket.init() )

export default GameSocket
