import { SortDirection } from '../../../../../ez-functions/src/lib/multiple-sort';

export interface EzTableState {
  pageNum: number;
  pageSize: string | number;
  columnSort: { [property: string]: SortDirection };
}
