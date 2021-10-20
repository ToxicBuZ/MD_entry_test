import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const route = `https://finnhub.io/api/v1`;
const apiKey = `c5nhndaad3ib3rav8srg`;

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


}
