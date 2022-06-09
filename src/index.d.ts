export interface Arl {
    [1]: number;
    [2]: number;
    [3]: number;
    [4]: number;
    [5]: number;
}

export interface Bases {
    arl: Arl;
    biannualCompensation: number,
    cesantias: number,
    familiarCompensation: number,
    health: number,
    interestCesantias: number,
    minWageAmount: number,
    pension: number,
    pensionChangeAmount: number,
    salary: number,
    transportationAllowanceAmount: number,
    transportationAllowance: number,
    transportationAllowanceChangeAmount: number,
    vacations: number
}

export interface Options {
    arl: boolean;
    biannualCompensation: boolean;
    cesantias: boolean;
    familiarCompensation: boolean;
    income: number;
    monthlyIncomeCOP: number;
    reportingSalary: number;
    typeOfIncome: string;
    typeOfArl: keyof Arl;
    vacations: boolean;
}

export interface Currency {
    code: string;
    name: string;
}

export interface Table {
    salary?: number;
}

export type RadioList = Array<{ value: string, label: string, defaultChecked?: boolean }>;

export interface CurrencyApiResponse extends Response {
    success?: boolean,
    timestamp?: number,
    base?: string,
    date?: string,
    rates?: {
        [key: string]: number;
    }
}
