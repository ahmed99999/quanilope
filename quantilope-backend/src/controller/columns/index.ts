import { ColumnIdentifier, ColumnRequest } from '../../type';
import { Column } from '../../model';

const getAllColumns = async (): Promise<ColumnIdentifier[]> =>
  await Column.find({});

const getColumn = async (columnId: string): Promise<ColumnIdentifier> =>
  await Column.findById(columnId);

const createColumn = async (params: ColumnRequest): Promise<ColumnIdentifier> =>
  (await Column.create(params)) as ColumnIdentifier;

const updateColumn = async (
  columnId: string,
  params: ColumnRequest
): Promise<ColumnIdentifier> =>
  (await Column.findByIdAndUpdate(columnId, params, {
    new: true,
  })) as ColumnIdentifier;

const deleteColumn = async (columnId: string): Promise<ColumnIdentifier> =>
  await Column.findByIdAndRemove(columnId);

export default {
  getAllColumns,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
};

export { getAllColumns, getColumn, createColumn, updateColumn, deleteColumn };
