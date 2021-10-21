import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Candle } from '../models/forex.model';
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
            .get<Array<any>>(`${route}/forex/exchange?token=${apiKey}`).pipe(
                catchError(error => {
                    console.error(error);
                    return of([]);
                })
            );
    }

    public getSymbolsForExchange(exchange: string): Observable<any[]> {
        return this.http
            .get<Array<any>>(`${route}/forex/symbol?exchange=${exchange}&token=${apiKey}`).pipe(
                catchError(error => {
                    console.error(error);
                    return of([]);
                })
            );
    }

    // "https://finnhub.io/api/v1/forex/candle?symbol=OANDA:EUR_USD&resolution=D&from=1572651390&to=1575243390&token=c5nhndaad3ib3rav8srg"


    public getTheCandle(symbol: any, resolution: string, timeframe: number): Observable<Candle> {
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
