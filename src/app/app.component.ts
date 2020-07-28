import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../resources/websocket/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'websocket-client';

    public dateFormatOptions = [
        { label: 'Dia', value: 'dd'},
        { label: 'Mês', value: 'MM'},
        { label: 'Ano', value: 'YYYY'},
    ];

    public data = {
        date: null,
        format: null,
        share_with_all: true
    };

    public suggestions = [];
    public formattedDate = null;

    constructor(private websocketService: WebsocketService) { }

    ngOnInit() {
        this.websocketService.listen('erro').subscribe((response: any) => {
           alert(response.error_message);
        });

        this.websocketService.listen('returning_formatted_date').subscribe((response: any) => {
           this.formattedDate = response.formatted_date;
        });

        this.websocketService.listen('suggestions_update').subscribe((response: any) => {
            this.suggestions = response.suggestions;
        });
    }

    public click() {
        if (this.data.format && this.data.date) {
            this.websocketService.emit('submit', this.data);
        } else {
            alert('É necessário informar uma data e formatação para Formatar');
        }
    }
}
