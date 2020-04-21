export interface StateDaily {
  date: number;
  state: string;
  positive?: number;
  negative?: number;
  pending?: number;
  hospitalizedCurrently?: number;
  hospitalizedCumulative?: number;
  inIcuCurrently?: number;
  inIcuCumulative?: number;
  onVentilatorCurrently?: number;
  onVentilatorCumulative?: number;
  recovered?: number;
  hash: string;
  dateChecked: string;
  death?: number;
  hospitalized?: number;
  total?: number;
  totalTestResults?: number;
  posNeg?: number;
  fips: string;
  deathIncrease?: number;
  hospitalizedIncrease?: number;
  negativeIncrease?: number;
  positiveIncrease?: number;
  totalTestResultsIncrease?: number;
}
