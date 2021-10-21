import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exchange, Symbol } from '../models/forex.model';
import { ForexService } from '../services/forex.service';

@Component({
  selector: 'app-forex-application',
  templateUrl: './forex-application.component.html',
  styleUrls: ['./forex-application.component.scss']
})

export class ForexApplicationComponent implements OnInit {

  public subscription: Subscription;
  public data: any;
  public options: any;
  public exchanges: Exchange[];
  public symbols: Symbol[];
  public selectedExchange = '';
  public selectedSymbol: Symbol = {};
  public closedPrices: any;

  constructor(
    private forexService: ForexService
  ) {
    this.subscription = new Subscription();
    this.exchanges = [];
    this.symbols = [];
    this.closedPrices = [];
  }

  ngOnInit(): void {
    this.updateChart();
    this.subscription.add(this.forexService.getAllExchanges().subscribe((exchanges) => {
      this.exchanges = exchanges.map(exchange => ({ name: exchange }));
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getSymbols(exchange: string): void {
    if (exchange) {
      this.forexService.getSymbolsForExchange(exchange).subscribe(symbols => {
        this.symbols = [...symbols];
      })
    }
  }

  public getCandle(resolution: string, timeframe: number): void {
    this.forexService.getTheCandle(this.selectedSymbol, resolution, timeframe).subscribe(candle => {
      this.closedPrices = candle.c;
      this.updateChart();
    })
  }

  public updateChart(): void {
    this.data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      datasets: [
        {
          label: this.selectedSymbol.displaySymbol ?? '',
          data: this.closedPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }


}
