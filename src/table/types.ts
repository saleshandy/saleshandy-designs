import { ReactElement, ReactNode } from "react";
import { SortOrder } from "react-bootstrap-table-next";
import { Placement } from "../types/enum";

export type Column = {
  dataField: string;
  text: string;
  component?: string | ReactElement | ((cell: any, row: any) => void);
  headerAlign?: string;
  isDummyField?: boolean;
  cellClasses?: string;
  componentClasses?: string;
  align?: string;
  onClick?: any;
  style?: any;
  headerStyle?: any;
  sort?: boolean;
  hideUnverifiedStatusIcon?: boolean;
  headerTooltipPlacement?: Placement;
  onSort?: (field: any, order: any) => void;
  sortCaret?: (order: any, column: any) => ReactNode;
  headerFormatter?: (
    column: any,
    colIndex: any,
    { sortElement, filterElement }: any
  ) => ReactNode;
};

export enum PaginationShowHide {
  HIDE = "HIDE",
  SHOW = "SHOW",
}

export type IState = {
  selectedRows: any;
};

export type Action = {
  key: string;
  displayName: string;
  icon: string;
  position?: string;
};

export type SortOptions = {
  dataField: string;
  order: SortOrder;
};

export type IProps = {
  columns: Column[];
  data?: any;
  actions?: Action[] | ((cell: any, row: any) => Action[]);
  tableWrapperClasses?: string;
  bodyWrapperClasses?: string;
  headerWrapperClasses?: string;
  onClick?: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    row: any
  ) => void;
  onChange?: (
    value: any,
    event: React.ChangeEvent<HTMLInputElement>,
    cell: any,
    row: any,
    index: number
  ) => void;
  paginationOptions: any;
  onPaginationOptionsChange: any;
  onAction?: (key: string, row: any) => void;
  onRowSelect?: (row: any, checked: boolean) => void;
  onRowSelectAll?: (rows: any, checked: boolean) => void;
  resetSelected?: boolean;
  headerVisibleForGenerateColumn?: boolean;
  borderOverActions?: boolean;
  pagination: PaginationShowHide;
  sort?: SortOptions;
  id?: any;
  hidePageOptions?: boolean;
};

export enum Sorting {
  Ascending = "asc",
  Descending = "desc",
}
