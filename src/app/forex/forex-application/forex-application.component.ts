import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exchange, Symbol } from '../models/forex.model';
import { ForexService } from '../services/forex.service';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { AlertService } from '../services/alert.service';
import getSymbolFromCurrency from 'currency-symbol-map'

@Component({
  selector: 'app-forex-application',
  templateUrl: './forex-application.component.html',
  styleUrls: ['./forex-application.component.scss'],

})

export class ForexApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  public subscription: Subscription = new Subscription();
  public selectedExchange: Exchange = {};
  public selectedSymbol: Symbol = {};
  public shortcuts: ShortcutInput[] = [];
  public exchanges: Exchange[] = [];
  public symbols: Symbol[] = [];
  public closedPrices: number[] = [];
  public closedPricesTimestamps: number[] = [];
  public data = {};
  public currencyFrom = '';
  public currencyFromSymbol = '';
  public currencyTo = ''
  public currentPrice = '';
  public priceDifference = '';
  public showPrice = false;
  public callChecker = false;
  public showSpinner = true;
  public isDifferencePositive = true;
  public tabIndex = -1;

  constructor(
    private forexService: ForexService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.updateChart('empty', []);
    this.subscription.add(this.forexService.getAllExchanges().subscribe((exchanges) => {
      this.exchanges = exchanges.map(exchange => ({ name: exchange })).sort((a, b) => a.name!.localeCompare(b.name!));;
    }));
  }

  ngAfterViewInit(): void {
    this.shortcuts.push({
      key: "tab",
      label: "tabbing",
      description: "taB",
      command: () => {
        this.tabIndex++;
        switch (this.tabIndex) {
          case 5:
          case 0: {
            this.tabIndex = 0;
            this.getCandle('1', 15 * 60, '15M');
            break;
          }
          case 1: {
            this.getCandle('1', 60 * 60, '1H');
            break;
          }
          case 2: {
            this.getCandle('30', 24 * 60 * 60, '1D');
            break;
          }
          case 3: {
            this.getCandle('D', 7 * 24 * 60 * 60, '1W');
            break;
          }
          case 4: {
            this.getCandle('D', 30 * 24 * 60 * 60, '1M');
            break;
          }
        }
      },
      preventDefault: true
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getSymbols(exchange: string): void {
    if (exchange) {
      this.forexService.getSymbolsForExchange(exchange).subscribe((symbols: Symbol[]) => {
        this.symbols = symbols.filter(symbol => symbol.displaySymbol?.includes('/')).sort((a, b) => a.displaySymbol!.localeCompare(b.displaySymbol!));
      })
    }
  }

  public displayFlags(display: boolean): void {
    this.currencyFrom = display ? this.selectedSymbol?.displaySymbol?.split('/')[0].toLowerCase()! : '';
    this.currencyFromSymbol = display ? getSymbolFromCurrency(this.selectedSymbol?.displaySymbol?.split('/')[0].toLowerCase()!)! : '';
    this.currencyTo = display ? this.selectedSymbol?.displaySymbol?.split('/')[1].toLowerCase()! : '';
  }

  public getCandle(resolution: string, timeframe: number, axisFlag: string): void {
    if (Object.keys(this.selectedExchange).length > 0 && Object.keys(this.selectedSymbol).length > 0) {
      this.showSpinner = true;
      this.callChecker = true;
      this.forexService.getForexCandle(this.selectedSymbol, resolution, timeframe).subscribe(candle => {
        if (candle && candle.s === 'ok') {
          this.closedPrices = candle.c!;
          this.currentPrice = this.closedPrices[this.closedPrices.length - 1].toFixed(2);
          this.priceDifference = ((Number(this.currentPrice) - this.closedPrices[0]) * 100).toFixed(2);
          this.isDifferencePositive = !(this.priceDifference[0] === '-');
          this.showPrice = true;
          this.closedPricesTimestamps = candle.t!;
          this.updateChart(axisFlag, this.closedPricesTimestamps);
          this.alertService.showToaster('Request successful !')
        } else {
          this.alertService.showErrorToaster('Request failed, check console !')
        }
        this.showSpinner = false;
      })
    } else {
      this.alertService.showWarningToaster('Please select Exchange and Symbol !')
    }
  }

  public updateChart(axisFlag: string = '', xAxisTimestamps: number[] = []): void {
    const axisX = this.selectAxisX(axisFlag, xAxisTimestamps);
    this.data = {
      labels: axisX ?? [],
      datasets: [
        {
          label: this.selectedSymbol?.displaySymbol ?? '',
          data: this.closedPrices ?? [],
          fill: true,
          borderColor: 'rgb(75, 192, 0)',
          tension: 0.1
        }
      ]
    };
  }

  private selectAxisX(flag: string, candleTimestamps: number[]): string[] {
    let axisX: string[] = [];
    switch (flag) {
      case 'empty': {
        axisX.push('0');
        for (let index = 0; index < 14; index++) {
          axisX.push('');
        }
        axisX.push('T');
        break;
      }
      case '15M':
      case '1H':
      case '1D': {
        candleTimestamps.forEach(timestamp => {
          const isoDate = new Date(timestamp * 1000).toISOString().split('T')[1].substr(0, 8);
          axisX.push(isoDate);
        });
        break;
      }
      case '1W':
      case '1M': {
        candleTimestamps.forEach(timestamp => {
          const isoDate = new Date(timestamp * 1000).toISOString().split('T')[0];
          axisX.push(isoDate);
        });
        break;
      }
    }
    return axisX;
  }

}
