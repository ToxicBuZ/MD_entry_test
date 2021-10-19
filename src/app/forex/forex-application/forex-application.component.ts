import { Component, OnInit } from '@angular/core';
import { Exchange, Symbol } from '../models/forex.model';

@Component({
  selector: 'app-forex-application',
  templateUrl: './forex-application.component.html',
  styleUrls: ['./forex-application.component.scss']
})

export class ForexApplicationComponent implements OnInit {

  public exchanges: Exchange[] = [];
  public symbols: Symbol[] = [];
  public selectedExchange = Exchange;
  public selectedSymbol = Symbol;


  constructor() {

    this.exchanges = [
      { name: 'exchange1', code: 'ex1' },
      { name: 'exchange2', code: 'ex2' },
      { name: 'exchange3', code: 'ex3' },
      { name: 'exchange4', code: 'ex4' },
      { name: 'exchange5', code: 'ex5' }
    ];

    this.symbols = [
      { char: '$', code: 'sy1' },
      { char: '#', code: 'sy2' },
      { char: '%', code: 'sy3' },
      { char: '^', code: 'sy4' },
      { char: '&', code: 'sy5' }
    ];

  }

  ngOnInit(): void {
    
  }

}
