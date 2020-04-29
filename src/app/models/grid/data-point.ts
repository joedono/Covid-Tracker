import { Series } from '../../models/grid/series';

export interface DataPoint {
  name: string;
  series: Series[];
}
