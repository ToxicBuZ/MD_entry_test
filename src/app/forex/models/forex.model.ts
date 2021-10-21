export class Exchange {
    name?: string;
}

export class Symbol {
    description?: string;
    displaySymbol?: string;
    symbol?: string;
}

export class Candle {
    c?: Number[];
    h?: Number[];
    l?: Number[];
    o?: Number[];
    s?: string;
    t?: Number[];
    v?: Number[];
}