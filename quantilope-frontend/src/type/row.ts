export interface RowIdentifier extends RowRequest {
  _id: string;
}

export interface RowRequest {
  name: string;
  image?: string;
}
