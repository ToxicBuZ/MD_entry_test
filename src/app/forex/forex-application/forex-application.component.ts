import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exchange, Symbol } from '../models/forex.model';
import { ForexService } from '../services/forex.service';
import { ShortcutInput, ShortcutEventOutput, KeyboardShortcutsComponent } from "ng-keyboard-shortcuts";  

@Component({
  selector: 'app-forex-application',
  template: `<ng-keyboard-shortcuts [shortcuts]="shortcuts"></ng-keyboard-shortcuts>`,
  templateUrl: './forex-application.component.html',
  styleUrls: ['./forex-application.component.scss']
})

export class ForexApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  public subscription: Subscription = new Subscription();
  public shortcuts: ShortcutInput[] = [];
  public data = {};
  public options = {};
  public exchanges: Exchange[] = [];
  public symbols: Symbol[] = [];
  public selectedExchange: Exchange = {};
  public selectedSymbol: Symbol = {};
  public closedPrices: number[] = [];
  public closedPricesTimestamps: number[] = [];
  public currentPrice: number = 0;
  public priceDifference: any;

  constructor(
    private forexService: ForexService
  ) {
  }

  ngOnInit(): void {
    this.updateChart('empty', []);
    this.subscription.add(this.forexService.getAllExchanges().subscribe((exchanges) => {
      this.exchanges = exchanges.map(exchange => ({ name: exchange }));
    }))
  }

  ngAfterViewInit(): void {

    // this.shortcuts.push(
    //   {
    //     key: "?",
    //     label: "Help",
    //     description: "Question mark",
    //     command: () => console.log("question mark clicked"),
    //     preventDefault: true
    //   },
    //   {
    //     key: ["cmd + b"],
    //     label: "Help",
    //     description: "Cmd + b",
    //     command: () => console.log('test'),
    //     preventDefault: true
    //   }
    // );

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

  public getCandle(resolution: string, timeframe: number, axisFlag: string): void {
    this.forexService.getTheCandle(this.selectedSymbol, resolution, timeframe).subscribe(candle => {
      console.log(candle)
      this.closedPrices = candle.c!;
      this.currentPrice = this.closedPrices[this.closedPrices.length - 1];
      this.priceDifference = ((this.currentPrice - this.closedPrices[0]) * 100).toFixed(4);
      this.closedPricesTimestamps = candle.t!;
      this.updateChart(axisFlag, this.closedPricesTimestamps);
    })
  }

  public updateChart(axisFlag: string, xAxisTimestamps: number[]): void {

    const axisX = this.selectAxisX(axisFlag, xAxisTimestamps);
    
    this.data = {
      labels: axisX,
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

  private selectAxisX (flag: string, candleTimestamps: number[]): string[] {

    let axisX: string[] = [];

    if (flag === 'empty') {
      axisX.push('0');
      for (let index = 0; index < 14; index++) {
        axisX.push('');
      }
      axisX.push('T');
    }

    if (flag === '15M') {
      candleTimestamps.forEach(timestamp => {
        const isoDate = new Date(timestamp * 1000).toISOString().split('T')[1].substr(0, 8);
        axisX.push(isoDate);
      });
    }

    if (flag === '1H') {
      candleTimestamps.forEach(timestamp => {
        const isoDate = new Date(timestamp * 1000).toISOString().split('T')[1].substr(0, 8);
        axisX.push(isoDate);
      });
    }

    if (flag === '1D') {
      candleTimestamps.forEach(timestamp => {
        const isoDate = new Date(timestamp * 1000).toISOString().split('T')[1].substr(0, 8);
        axisX.push(isoDate);
      });
    }

    if (flag === '1W') {
      candleTimestamps.forEach(timestamp => {
        const isoDate = new Date(timestamp * 1000).toISOString().split('T')[0];
        axisX.push(isoDate);
      });
    }

    if (flag === '1M') {
      candleTimestamps.forEach(timestamp => {
        const isoDate = new Date(timestamp * 1000).toISOString().split('T')[0];
        axisX.push(isoDate);
      }); 
    }

    return axisX;

  }

}
