import { RowIdentifier, RowRequest } from '../../type';
import { Row } from '../../model';

const getAllRows = async (): Promise<RowIdentifier[]> => await Row.find({});

const getRow = async (rowId: string): Promise<RowIdentifier> =>
  await Row.findById(rowId);

const createRow = async (params: RowRequest): Promise<RowIdentifier> =>
  (await Row.create(params)) as RowIdentifier;

const updateRow = async (
  rowId: string,
  params: RowRequest
): Promise<RowIdentifier> =>
  (await Row.findByIdAndUpdate(rowId, params)) as RowIdentifier;

const deleteRow = async (rowId: string): Promise<RowIdentifier> =>
  await Row.findByIdAndRemove(rowId);

export default {
  getAllRows,
  getRow,
  createRow,
  updateRow,
  deleteRow,
};

export { getAllRows, getRow, createRow, updateRow, deleteRow };
