export interface Bases {
    minWage: number;
    transportationAllowance: number;
    comprehensiveWage?: number;
    pensionBreakpoint?: number;
    health: number;
    pension: number;
    familiarCompensation: number;
    cesantias: number,
    interestCesantias: number;
    prima: number;
    vacations: number;
    arl_1: number;
    arl_2: number;
    arl_3: number;
    arl_4: number;
    arl_5: number;
}

export interface Options {
    income: number;
    monthlyIncomeCOP?: number;
    typeOfIncome: string;
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}
