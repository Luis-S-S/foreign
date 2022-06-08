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
    cesantias: number;
    comprehensiveWage: number;
    familiarCompensation: number;
    healthEmployer: number;
    healthWorker: number;
    interestCesantias: number;
    minWage: number;
    pensionEmployer: number;
    pensionWorker: number;
    pensionBreakpoint: number;
    salary: number;
    transportationAllowance: number;
    transportationAllowanceBreakpoint: number;
    transportationAllowancePercentage: number;
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
    typeOfArl: keyof Arl;
    vacations: boolean;
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Table {
    salary?: number;
}

export type RadioList = Array<{ value: string, label: string, defaultChecked?: boolean }>;
