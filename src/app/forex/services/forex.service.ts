import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Candle, Symbol } from '../models/forex.model';
import { environment } from 'src/environments/environment';

const route = environment.finnhub.baseUrl;
const apiKey = environment.finnhub.apiKey;

@Injectable({
    providedIn: 'root'
})

export class ForexService {

    constructor(private http: HttpClient) { }

    public getAllExchanges(): Observable<string[]> {
        return this.http
            .get<Array<string>>(`${route}/forex/exchange?token=${apiKey}`).pipe(
                catchError(error => {
                    console.error(error);
                    return of([]);
                })
            );
    }

    public getSymbolsForExchange(exchange: string): Observable<Symbol[]> {
        return this.http
            .get<Array<Symbol>>(`${route}/forex/symbol?exchange=${exchange}&token=${apiKey}`).pipe(
                catchError(error => {
                    console.error(error);
                    return of(new Array<Symbol>());
                })
            );
    }

    public getForexCandle(symbol: Symbol, resolution: string, timeframe: number): Observable<Candle> {
        const dateTo = Math.floor(Date.now() / 1000);
        const dateFrom = dateTo - timeframe;
        return this.http
            .get<Candle>(`${route}/forex/candle?symbol=${symbol.symbol}&resolution=${resolution}&from=${dateFrom}&to=${dateTo}&token=${apiKey}`).pipe(
                catchError(error => {
                    console.error(error);
                    return of(new Candle());
                })
            );
    }


}
