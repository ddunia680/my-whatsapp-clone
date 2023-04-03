import { Peer } from 'peerjs';

let peer;

export default class openPeer {
    static init = (userId) => {
        peer = new Peer(userId);
        console.log('connected to peer as : '+userId);
        return peer;
    }

    static usePeer = () => {
        if(!peer) {
            console.log('no peer set yet');
        }
        return peer;
    }
}