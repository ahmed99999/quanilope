export interface RowRequest {
  image?: string;
  name: string;
}

export interface RowIdentifier extends RowRequest {
  id: string;
}
