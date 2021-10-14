export interface ColumnRequest {
  image: string;
  name: string;
}

export interface ColumnIdentifier extends ColumnRequest {
  id: number;
}
