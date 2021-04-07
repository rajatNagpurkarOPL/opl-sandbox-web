import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Websocket } from '../interface/websocket.interface';
import { CommonService } from '../common-utils/common-services/common.service';


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:7900/b4l/ruleengine/ws';
    stompClient: any = null;
    webSocketComponent:Websocket;
    constructor(webSocketComponent: Websocket){
        this.webSocketComponent = webSocketComponent;
    }

    _connect() {
        if(this.stompClient == null){
            console.log("Initialize WebSocket Connection");
            let ws = new SockJS(this.webSocketEndPoint);
            this.stompClient = Stomp.over(ws); 
        }
         const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(_this.webSocketComponent.topic, function (sdkEvent:any) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, _this.errorCallBack);
    };
    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            console.log("Disconnected");
        }else{
            console.log("Connection is not established.");
        }
        
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(endpoint : string,message : String) {
        console.log("calling Greeting via web socket : ",endpoint);
        this.stompClient.send(endpoint, {}, message);
    }

    onMessageReceived(sdkEvent : any) {        
        console.log("Body :: " , sdkEvent);
        this.webSocketComponent.handleResponse(sdkEvent.body);
    }
  
}
