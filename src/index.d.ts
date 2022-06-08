export interface Arl {
    [1]: number;
    [2]: number;
    [3]: number;
    [4]: number;
    [5]: number;
}

export interface Bases {
    arl: Arl;
    biannualCompensation: number;
    cesantias: number,
    comprehensiveWage: number;
    familiarCompensation: number;
    health: number;
    interestCesantias: number;
    minWage: number;
    pension: number;
    pensionBreakpoint: number;
    salary: number;
    transportationAllowance: number;
    vacations: number;
}

export interface Options {
    arl: boolean;
    biannualCompensation: boolean;
    cesantias: boolean;
    familiarCompensation: boolean;
    income: number;
    monthlyIncomeCOP: number;
    percentage: string;
    typeOfIncome: string;
    vacations: boolean;
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}
