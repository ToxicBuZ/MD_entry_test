export interface Exchange {
    name?: string;
}

export interface Symbol {
    description?: string;
    displaySymbol?: string;
    symbol?: string;
}

export class Candle {
    c?: number[];
    h?: number[];
    l?: number[];
    o?: number[];
    s?: string;
    t?: number[];
    v?: number[];
}