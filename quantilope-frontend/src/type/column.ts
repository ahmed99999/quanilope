import { RowIdentifier, RowRequest } from './row';

export type ColumnRequest = RowRequest;
export interface ColumnIdentifier extends ColumnRequest {
  _id: string;
}
