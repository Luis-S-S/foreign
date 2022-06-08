/* eslint-disable max-len */
import {
  Bases, Options, Arl,
} from '../index.d';

export const formatTwoDecimals = (value: string | number): number => {
  const number = Number(value);
  return Number(number.toFixed(2));
};

export const formatNumsToString = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const confirmValue = (initialValue: number, isIncluded: boolean): number => (isIncluded ? initialValue : 0);

export const selectArl = (arl: Arl, num: keyof Arl): number => arl[num];

export const calculateSalary = (bases: Bases, opt: Options): number => {
  if (opt.monthlyIncomeCOP === 0) { return 0; }

  let salary: number = 0;
  let calcSalary: number = 0;

  const descriptorX = bases.salary + bases.healthEmployer + bases.pensionEmployer
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
