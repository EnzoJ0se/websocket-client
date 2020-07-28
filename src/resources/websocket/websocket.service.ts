import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private socket: any;
    private uri = 'ws://localhost:3000';

    constructor() {
        this.socket = io(this.uri);
    }

    public listen(eventName: string) {
        return new Observable((response) => {
            this.socket.on(eventName, (data) => {
                response.next(data);
            });
        });
    }

    public emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
