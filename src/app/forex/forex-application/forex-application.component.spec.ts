import { ForexApplicationComponent } from './forex-application.component';
import { Candle, Symbol } from '../models/forex.model';
import { of } from 'rxjs';

describe('ForexApplicationComponent', () => {
    let component: ForexApplicationComponent;
    const mockForexService = jasmine.createSpyObj('mockForexService', ['getAllExchanges', 'getSymbolsForExchange', 'getForexCandle']);
    const mockAlertService = jasmine.createSpyObj('mockAlertService', ['showToaster', 'showErrorToaster', 'showWarningToaster']);
    const mockSymbolsForFxpro: Symbol[] = [
        { description: 'FXPRO Euro vs Swiss Franc EURCHF', displaySymbol: 'EUR/CHF', symbol: 'FXPRO:10' },
        { description: 'FXPRO Euro vs Russian Ruble EURRUB', displaySymbol: 'EUR/RUB', symbol: 'FXPRO:1083' },
        { description: 'FXPRO FTSE 100 Spot Index #UK100', displaySymbol: 'UK100/GBP', symbol: 'FXPRO:1105' }
    ];
    const mockCandleForOandaEurCad: Candle = {
        c: [1.43856, 1.43944, 1.43852, 1.43901, 1.43976, 1.43996, 1.43981, 1.4393],
        h: [1.43936, 1.4395, 1.43953, 1.43924, 1.43991, 1.44032, 1.44007, 1.44055],
        l: [1.43838, 1.43854, 1.43847, 1.43849, 1.43898, 1.43937, 1.43938, 1.43907],
        o: [1.43893, 1.43856, 1.43944, 1.43854, 1.43899, 1.43973, 1.43993, 1.43981],
        s: "ok",
        t: [1634922000, 1634923800, 1634925600, 1634927400, 1634929200, 1634931000, 1634932800, 1634934600],
        v: [1835, 1714, 1586, 1595, 1265, 1100, 1086, 1143]
    };

    beforeEach(() => {
        component = new ForexApplicationComponent(mockForexService, mockAlertService);
        mockForexService.getSymbolsForExchange.and.returnValue(of(mockSymbolsForFxpro));
        mockForexService.getForexCandle.and.returnValue(of(mockCandleForOandaEurCad));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return an array of symbols when an Exchange is provided', () => {
        component.getSymbols('fxpro');
        expect(component.symbols).toEqual(mockSymbolsForFxpro);
    });

    it('should call showWarningToaster if no Exchange is selected', () => {
        component.getCandle('D', 86400, '1D');
        expect(mockAlertService.showWarningToaster).toHaveBeenCalled();
    });

    it('should call showWarningToaster if no Symbol is selected', () => {
        component.selectedExchange = { name: 'oanda' };
        component.getCandle('60', 86400 * 7, '1W');
        expect(mockAlertService.showWarningToaster).toHaveBeenCalled();
    });

    it('should call showToaster if the candle status is ok', () => {
        component.selectedExchange = { name: 'oanda' };
        component.selectedSymbol = {
            description: "Oanda EUR/CAD",
            displaySymbol: "EUR/CAD",
            symbol: "OANDA:EUR_CAD"
        };
        component.getCandle('D', 86400, '1D');
        expect(mockAlertService.showToaster).toHaveBeenCalled();
    });

    it('should call showErrorToaster if the candle status is not ok', () => {
        mockForexService.getForexCandle.and.returnValue(of(new Candle()));
        component.selectedExchange = { name: 'oanda' };
        component.selectedSymbol = {
            description: "Oanda EUR/CAD",
            displaySymbol: "EUR/CAD",
            symbol: "OANDA:EUR_CAD"
        };
        component.getCandle('D', 86400, '1D');
        expect(mockAlertService.showErrorToaster).toHaveBeenCalled();
    });

    it('currencyFrom, currencyFromSymbol, currencyTo should be empty strings if display is false', () => {
        component.selectedExchange = { name: 'oanda' };
        component.selectedSymbol = {
            description: "Oanda EUR/CAD",
            displaySymbol: "EUR/CAD",
            symbol: "OANDA:EUR_CAD"
        };
        component.displayFlags(false);
        expect(component.currencyFrom).toEqual('');
        expect(component.currencyFromSymbol).toEqual('');
        expect(component.currencyTo).toEqual('');
    });

    it('currencyFrom, currencyFromSymbol, currencyTo should not be empty strings if display is true', () => {
        component.selectedExchange = { name: 'oanda' };
        component.selectedSymbol = {
            description: "Oanda EUR/CAD",
            displaySymbol: "EUR/CAD",
            symbol: "OANDA:EUR_CAD"
        };
        component.displayFlags(true);
        expect(component.currencyFrom).toEqual('eur');
        expect(component.currencyFromSymbol).toEqual('€');
        expect(component.currencyTo).toEqual('cad');
    });

});
