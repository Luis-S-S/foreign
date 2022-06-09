/* eslint-disable max-len */
import {
  Bases, Options, Arl,
} from '../index.d';

// #region Formatting functions
export const formatTwoDecimals = (value: string | number): number => {
  const number = Number(value);
  return Number(number.toFixed(2));
};

export const formatNumsToString = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const displayNumber = (num: number) => `$${formatNumsToString(Math.round(num))}`;
// #endregion

// #region Salary Calculations functions
export const selectArl = (arl: Arl, num: keyof Arl): number => arl[num];

export const confirmValue = (initialValue: number, isIncluded: boolean): number => (isIncluded ? initialValue : 0);

export const calculateMaxReport = (bases: Bases, opt: Options): number => {
  if (opt.monthlyIncomeCOP === 0) { return 0; }

  const descriptorX = bases.salary + bases.health + bases.pension
    + confirmValue(selectArl(bases.arl, opt.typeOfArl), opt.arl)
    + confirmValue(bases.familiarCompensation, opt.familiarCompensation)
    + confirmValue(bases.vacations, opt.vacations)
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  const descriptorY = bases.transportationAllowance
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  let salary: number = 0;

  if (opt.monthlyIncomeCOP > bases.pensionChangeAmount) {
    salary = Math.round(opt.monthlyIncomeCOP / ((descriptorX + 1) / 100));
  }

  if (opt.monthlyIncomeCOP > bases.transportationAllowanceChangeAmount && opt.monthlyIncomeCOP <= bases.pensionChangeAmount) {
    salary = Math.round(opt.monthlyIncomeCOP / (descriptorX / 100));
  }

  if (opt.monthlyIncomeCOP <= bases.transportationAllowanceChangeAmount) {
    salary = Math.round((opt.monthlyIncomeCOP - ((descriptorY * bases.transportationAllowance) / 100)) / (descriptorX / 100));
  }

  return salary;
};

export const calculateParafiscales = (salary: number, opt: Options, bases: Bases): number => confirmValue(((salary * bases.familiarCompensation) / 100), opt.familiarCompensation);

export const calculateSeguridadSocial = (salary: number, opt: Options, bases: Bases): number => (
  confirmValue(((salary * bases.arl[opt.typeOfArl]) / 100), opt.arl)
      + ((salary * bases.health) / 100)
      + (opt.monthlyIncomeCOP > bases.pensionChangeAmount ? ((salary * (bases.pension + 1)) / 100) : ((salary * bases.pension) / 100))
);

export const calculatePrestaciones = (salary: number, opt: Options, bases: Bases): number => (
  confirmValue(((salary * bases.biannualCompensation) / 100), opt.biannualCompensation)
      + confirmValue(((salary * bases.vacations) / 100), opt.vacations)
      + confirmValue(((salary * bases.cesantias) / 100), opt.cesantias)
      + confirmValue(((salary * bases.interestCesantias) / 100), opt.cesantias)
);

export const calculateTotal = (salary: number, opt: Options, bases: Bases): number => {
  const totalCalc = salary
      + confirmValue(bases.transportationAllowance, opt.monthlyIncomeCOP <= bases.transportationAllowanceChangeAmount)
      + calculateParafiscales(salary, opt, bases)
      + calculateSeguridadSocial(salary, opt, bases)
      + calculatePrestaciones(salary, opt, bases);

  return (Math.round(totalCalc));
};
// #endregion

// #region Logical functions
export const nextMultipleFrom = (fromNum: number, base: number): number => {
  const nextToCalc = Math.floor((fromNum / base)) + 1;
  return nextToCalc * base;
};

export const prevMultipleFrom = (fromNum: number, base: number): number => {
  const prevToCalc = Math.floor((fromNum / base));
  return prevToCalc * base;
};
// #endregion
