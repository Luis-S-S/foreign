/* eslint-disable max-len */
import {
  Bases, Options, Arl,
} from '../index.d';

export const formatTwoDecimals = (value: string | number): number => {
  const number = Number(value);
  return Number(number.toFixed(2));
};

export const formatNumsToString = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const displayNumber = (num: number) => `$${formatNumsToString(Math.round(num))}`;

export const confirmValue = (initialValue: number, isIncluded: boolean): number => (isIncluded ? initialValue : 0);

export const selectArl = (arl: Arl, num: keyof Arl): number => arl[num];

export const calculateSalary = (bases: Bases, opt: Options): number => {
  if (opt.monthlyIncomeCOP === 0) { return 0; }

  let salary: number = 0;
  let calcSalary: number = 0;

  const descriptorX = bases.salary + bases.health + bases.pension
    + confirmValue(selectArl(bases.arl, opt.typeOfArl), opt.arl)
    + confirmValue(bases.familiarCompensation, opt.familiarCompensation)
    + confirmValue(bases.vacations, opt.vacations)
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  const descriptorY = bases.transportationAllowancePercentage
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  if (opt.percentage === 'max') {
    calcSalary = opt.monthlyIncomeCOP;
  } else {
    calcSalary = formatTwoDecimals((opt.monthlyIncomeCOP * Number(opt.percentage)) / 100);
  }

  if (calcSalary > bases.pensionBreakpoint) {
    salary = Math.round(calcSalary / ((descriptorX + 1) / 100));
  }

  if (calcSalary > bases.transportationAllowanceBreakpoint && calcSalary <= bases.pensionBreakpoint) {
    salary = Math.round(calcSalary / (descriptorX / 100));
  }

  if (calcSalary <= bases.transportationAllowanceBreakpoint) {
    salary = Math.round((calcSalary - ((descriptorY * bases.transportationAllowance) / 100)) / (descriptorX / 100));
  }

  return salary;
};

export const calculateParafiscales = (salary: number, opt: Options, bases: Bases): number => confirmValue(((salary * bases.familiarCompensation) / 100), opt.familiarCompensation);

export const calculateSeguridadSocial = (salary: number, opt: Options, bases: Bases): number => (
  confirmValue(((salary * bases.arl[opt.typeOfArl]) / 100), opt.arl)
      + ((salary * bases.health) / 100)
      + (opt.monthlyIncomeCOP > bases.pensionBreakpoint ? ((salary * (bases.pension + 1)) / 100) : ((salary * bases.pension) / 100))
);

export const calculatePrestaciones = (salary: number, opt: Options, bases: Bases): number => (
  confirmValue(((salary * bases.biannualCompensation) / 100), opt.biannualCompensation)
      + confirmValue(((salary * bases.vacations) / 100), opt.vacations)
      + confirmValue(((salary * bases.cesantias) / 100), opt.cesantias)
      + confirmValue(((salary * bases.interestCesantias) / 100), opt.cesantias)
);

export const calculateTotal = (salary: number, opt: Options, bases: Bases): number => {
  const totalCalc = salary
      + confirmValue(bases.transportationAllowance, opt.monthlyIncomeCOP <= bases.transportationAllowanceBreakpoint)
      + calculateParafiscales(salary, opt, bases)
      + calculateSeguridadSocial(salary, opt, bases)
      + calculatePrestaciones(salary, opt, bases);

  return (Math.round(totalCalc));
};
