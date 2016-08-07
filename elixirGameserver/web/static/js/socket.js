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
