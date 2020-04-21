interface UnitedStatesDaily {
  date: number;
  states: number;
  positive: number;
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
  death: number;
  hospitalized?: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  deathIncrease?: number;
  hospitalizedIncrease?: number;
  negativeIncrease?: number;
  positiveIncrease?: number;
  totalTestResultsIncrease?: number;
}
