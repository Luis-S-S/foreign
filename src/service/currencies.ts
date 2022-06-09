import { CurrencyApiResponse } from '../index.d';

const myHeaders: Headers = new Headers();

if (process.env.REACT_APP_CURRENCY_API_KEY) {
  myHeaders.append('apikey', process.env.REACT_APP_CURRENCY_API_KEY);
}

// eslint-disable-next-line no-undef
const requestOptions: RequestInit = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

const fetchConversionRate = async (currency: string): Promise<CurrencyApiResponse> => {
  try {
    const response: CurrencyApiResponse = await fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=COP&base=${currency}`,
      requestOptions,
    );
    const data: CurrencyApiResponse = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export default fetchConversionRate;
