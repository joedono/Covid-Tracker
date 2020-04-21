export interface UnitedStatesCurrent {
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  hash: string;
  lastModified: string;
  death: number;
  hospitalized: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  notes: string;
}
