export interface VehiclesProps {
  id: string;
  manufacturer: string;
  model: string;
  body: string;
  price: number;
  img: string;
}

export interface AmountDataProps {
  amount: number;
  id: string;
}

export interface manufacturerSelectProps {
  manufacturer: string;
}

export interface bodyStyleSelectProps {
  body: string;
}

export const amountData = [
  {amount: 0, id: '0'},
  {amount: 50000, id: '50 000'},
  {amount: 100000, id: '100 000'},
  {amount: 200000, id: '200 000'},
  {amount: 300000, id: '300 000'},
  {amount: 400000, id: '400 000'},
  {amount: 500000, id: '500 000'},
  {amount: 600000, id: '600 000'},
  {amount: 700000, id: '700 000'},
  {amount: 800000, id: '800 000'},
  {amount: 900000, id: '900 000'},
  {amount: 1000000, id: '1 000 000'},
  {amount: 2000000, id: '2 000 000'},
  {amount: 3000000, id: '3 000 000'},
  {amount: 4000000, id: '4 000 000'},
  {amount: 5000000, id: '5 000 000'},
  {amount: 6000000, id: '6 000 000'},
  {amount: 7000000, id: '7 000 000'},
  {amount: 8000000, id: '8 000 000'},
  {amount: 9000000, id: '9 000 000'},
  {amount: 10000000, id: '10 000 000'},
];
