export interface ICrudEntity {
  code: string;
  description?: string;
  createdby: number;
  updatedby: number;
  deletedby?: number;
  partition: number;
  dataarea: number;
  createdat?: Date;
  updatedat?: Date;
  deletedat?: Date;
  rowversion?: number;
  rowid?: string;
}
