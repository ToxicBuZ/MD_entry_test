import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exchange, SelectedSymbol, Symbol } from '../models/forex.model';
import { ForexService } from '../services/forex.service';

@Component({
  selector: 'app-forex-application',
  templateUrl: './forex-application.component.html',
  styleUrls: ['./forex-application.component.scss']
})

export class ForexApplicationComponent implements OnInit {

  public subscription: Subscription = new Subscription();
  public data: any;
  public options: any;
  public exchanges: Exchange[] = [];
  public symbols: Symbol[] = [];
  public selectedExchange = '';
  public selectedSymbol: SelectedSymbol = {};

  constructor(
    private forexService: ForexService
  ) { }

  ngOnInit(): void {
    this.updateChart();
    this.subscription.add(this.forexService.getAllExchanges().subscribe((exchanges) => {
      this.exchanges = exchanges.map(exchange => ({ name: exchange }));
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getSymbols(exchange: string) {
    if (exchange) {
      this.forexService.getSymbolsForExchange(exchange).subscribe(symbols => {
        this.symbols = symbols.map(symbol => ({ displaySymbol: symbol.displaySymbol }));
      })
    }
  }

  public updateChart(): void {
    this.data = {
      labels: ['15M', '1H', '1D', '1W', '1M'],
      datasets: [
        {
          label: this.selectedSymbol.displaySymbol ?? '',
          data: [65, 59, 80, 81, 56, 55, 40],
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
