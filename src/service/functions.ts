/* eslint-disable max-len */
import { Bases, Options, Arl } from '../index.d';

export const formatTwoDecimals = (value: string | number): number => {
  const number = Number(value);
  return Math.round(number * 100) / 100;
};

export const formatNumsToString = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const calculateSalary = (bases: Bases, opt: Options): number => {
  const confirmValue = (initialValue: number, isIncluded: boolean): number => (isIncluded ? initialValue : 0);
  const selectArl = (arl: Arl, num: keyof Arl): number => arl[num];

  const descriptorX = bases.salary + bases.health + bases.pension
    + confirmValue(selectArl(bases.arl, 1), opt.arl)
    + confirmValue(bases.familiarCompensation, opt.familiarCompensation)
    + confirmValue(bases.vacations, opt.vacations)
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  const descriptorY = bases.transportationAllowance
    + confirmValue(bases.biannualCompensation, opt.biannualCompensation)
    + confirmValue(bases.cesantias, opt.cesantias)
    + confirmValue(bases.interestCesantias, opt.cesantias);

  return descriptorX - descriptorY;
};
