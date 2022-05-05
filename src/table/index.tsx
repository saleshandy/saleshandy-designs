import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Dropdown, Row } from "react-bootstrap";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Icon } from "../icon";
import {
  IProps,
  Column,
  IState,
  Action,
  PaginationShowHide,
  Sorting,
} from "./types";
import { Switch } from "../switch";
import { Checkbox } from "../checkbox";
import IconText from "../icon-text";
import TextStacksDirectional from "../../molecules/text-stacks-directional";
import PaginationWrapper from "./pagination-wrapper";
import ContactNameField from "../../molecules/contact-name-field";
import { difference } from "../../../../utils/set";
import { SequenceNameField } from "../../molecules/sequence-name-field";
import { TeamMemberNameField } from "../../molecules/team-member-name-field";
import { OverlayTooltip } from "../../overlay";
import { constants } from "../types/enum";
import { ImageIcon } from "../image-icon";
import { Images } from "../utils/images";

class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedRows: [],
    };
    this.onSelectedRowsUpdate = this.onSelectedRowsUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRowSelectAllHandler = this.onRowSelectAllHandler.bind(this);
    this.getCoreComponent = this.getCoreComponent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetSelected) {
      this.onSelectedRowsUpdate([]);
    }
  }

  onSelectedRowsUpdate(value) {
    this.setState({ selectedRows: value });
  }

  onChangeHandler(
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
    cell: any,
    row: any,
    index: number
  ) {
    const { onChange } = this.props;
    onChange(checked, event, cell, row, index);
  }

  onRowSelect(row: any, isSelect: boolean) {
    const { selectedRows } = this.state;
    const { onRowSelect } = this.props;

    if (isSelect) {
      this.setState(
        () => ({
          selectedRows: [...selectedRows, row.id],
        }),
        () => {
          !!onRowSelect && onRowSelect(row, isSelect);
        }
      );
    } else {
      this.setState(
        () => ({
          selectedRows: selectedRows.filter((x) => x !== row.id),
        }),
        () => {
          !!onRowSelect && onRowSelect(row, isSelect);
        }
      );
    }
  }

  onRowSelectAllHandler(isSelect: boolean, rows: any) {
    const ids = rows.map((r) => r.id);
    const { selectedRows } = this.state;
    const { onRowSelectAll } = this.props;

    if (isSelect) {
      this.setState(
        () => ({
          selectedRows: [...selectedRows, ...ids],
        }),
        () => {
          !!onRowSelectAll && onRowSelectAll(rows, isSelect);
        }
      );
    } else {
      this.setState(
        () => {
          const setOfCurrentState = new Set(selectedRows);
          const setOfUnselectedContacts = new Set(ids);
          return {
            selectedRows: Array.from(
              difference(setOfCurrentState, setOfUnselectedContacts)
            ),
          };
        },
        () => {
          !!onRowSelectAll && onRowSelectAll(rows, isSelect);
        }
      );
    }
  }

  getCoreComponent(
    component: string,
    cell: any,
    row: any,
    index: number,
    componentClasses: string,
    onClick: any,
    hideUnverifiedStatusIcon: boolean
  ) {
    if (cell !== null && cell !== undefined) {
      switch (component) {
        case "switch":
          return (
            <Switch
              tooltip={cell ? "Pause" : "Resume"}
              className={`table-switch ${componentClasses}`}
              checked={cell}
              size={Switch.Size.Small}
              onChange={(checked, event) =>
                this.onChangeHandler(checked, event, cell, row, index)
              }
            />
          );
        case "checkbox":
          return (
            <Checkbox
              className={componentClasses}
              checked={cell}
              onChange={(checked, event) =>
                this.onChangeHandler(checked, event, cell, row, index)
              }
            />
          );
        case "text-stack":
          return <TextStacksDirectional stacks={cell} />;
        case "icon-text":
          return <IconText text={cell.text} icon={cell.icon} />;
        case "contact-name-field":
          return (
            <ContactNameField
              cell={cell}
              onClick={onClick}
              hideUnverifiedStatusIcon={hideUnverifiedStatusIcon}
            />
          );
        case "gray-text":
          return <span style={{ color: "#595959" }}>{cell}</span>;
        case "sequence-name-field":
          return <SequenceNameField name={cell} onClick={() => onClick(row)} />;
        case "team-member-name-field":
          return <TeamMemberNameField name={cell} />;
        default:
          break;
      }
    }
    return null;
  }

  generateFormatter = (columns: Column[]) =>
    columns.map((col: Column, index: number) => {
      const {
        cellClasses,
        componentClasses,
        dataField,
        text,
        component,
        align,
        headerAlign,
        isDummyField,
        onClick,
        style,
        headerStyle,
        sort,
        onSort,
        hideUnverifiedStatusIcon = false,
        headerTooltipPlacement,
      } = col;
      const { sort: sortOptions } = this.props;
      return {
        dataField,
        text,
        classes: cellClasses,
        align,
        headerAlign,
        isDummyField,
        style,
        headerStyle,
        headerClasses: sort,
        sort,
        onSort,
        sortCaret: (order: Sorting) => {
          if (!sortOptions) {
            return null;
          }
          if (order === Sorting.Ascending) {
            return <Icon identifier='arrow-up' />;
          }
          if (order === Sorting.Descending) {
            return <Icon identifier='arrow-down' />;
          }
          return null;
        },
        headerFormatter: (column, _colIndex, { sortElement }) => {
          return (
            <div className='d-flex'>
              <span className='semibold-1 gray-txt-12'>{column.text}</span>
              {column.text.length > 0 && column.sort && (
                <div
                  role='button'
                  // onClick={() => onSort(col, sortElement)}
                  className='ml-1'
                >
                  <ImageIcon src={Images.ArrowsSort} className='mb-1' />
                </div>
              )}
            </div>
          );
        },
        formatter: (cell, row) => {
          if (typeof component === "string") {
            return this.getCoreComponent(
              component,
              cell,
              row,
              index,
              componentClasses,
              onClick,
              hideUnverifiedStatusIcon
            );
          }
          if (component instanceof React.Component) {
            return component;
          }
          if (typeof component === "function") {
            return component(cell, row);
          }
          return cell;
        },
      };
    });

  generateDropdownItemsListFromActions = (actions: Action[], row) => {
    const { onAction } = this.props;

    const dropdownItems = [];
    const gridItems = [];
    let index = 0;
    actions.forEach((action) => {
      if (action.position === "out") {
        gridItems.push(
          <OverlayTooltip text={action.displayName} key={action.key}>
            <Icon
              key={index}
              onClick={() => onAction(action.key, row)}
              identifier={action.icon}
              className='lfloat gray-txt-6 mx-1'
            />
          </OverlayTooltip>
        );
      } else {
        dropdownItems.push(
          <Dropdown.Item
            onClick={() => onAction(action.key, row)}
            key={index}
            bsPrefix='dropdown-item-custom'
          >
            {action.icon && (
              <Icon identifier={action.icon} className='lfloat gray-txt-6' />
            )}
            {action.displayName && (
              <span className='gray-txt-10'>{action.displayName}</span>
            )}
          </Dropdown.Item>
        );
      }
      index += 1;
    });

    return { gridItems, dropdownItems };
  };

  generateActionsColumn = (
    actions,
    headerVisibleForGenerateColumn,
    borderOverActions
  ) => ({
    dataField: "actions",
    text: "Actions",
    headerClasses: "bs-table-thead",
    formatter: (cell, row) => {
      const generatedDropdownItemsListFromActions =
        typeof actions === "function"
          ? this.generateDropdownItemsListFromActions(actions(cell, row), row)
          : this.generateDropdownItemsListFromActions(actions, row);
      return generatedDropdownItemsListFromActions !== null ? (
        <div className='grid-flex'>
          {/* Showing grid action items */}
          {generatedDropdownItemsListFromActions.gridItems.length !== 0 &&
            generatedDropdownItemsListFromActions.gridItems}

          {/* showing dropdown action items */}
          {generatedDropdownItemsListFromActions.dropdownItems.length !== 0 && (
            <div className='grid-action'>
              <Dropdown bsPrefix='dropdown-custom' drop='down'>
                <Dropdown.Toggle
                  bsPrefix='dropdown-toggle-custom'
                  variant='dropdown-custom'
                  id='dropdown-basic'
                >
                  <Icon identifier='more-vertical-alt' />
                </Dropdown.Toggle>
                <Dropdown.Menu bsPrefix='dropdown-menu-custom'>
                  {generatedDropdownItemsListFromActions.dropdownItems}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      ) : null;
    },
    isDummyField: true,
    align: "right",
    headerAlign: "center",
    headerStyle: {
      display: headerVisibleForGenerateColumn ? "table-cell" : "none",
    },
    style: borderOverActions
      ? { borderTop: "1px solid #dee2e6" }
      : { borderTop: "none" },
  });

  handleTableChange = (type, { page, sizePerPage }) => {
    if (type === "pagination") {
      const { onPaginationOptionsChange } = this.props;
      onPaginationOptionsChange({ page, limit: sizePerPage });
    }
  };

  render() {
    const {
      data,
      columns,
      actions,
      headerWrapperClasses,
      bodyWrapperClasses,
      sort,
      tableWrapperClasses,
      headerVisibleForGenerateColumn,
      borderOverActions,
      paginationOptions,
      pagination,
      id,
      onRowSelect,
      onRowSelectAll,
    } = this.props;
    const { selectedRows } = this.state;
    const dataColumns = this.generateFormatter(columns);
    const finalColumns = actions
      ? [
          ...dataColumns,
          this.generateActionsColumn(
            actions,
            headerVisibleForGenerateColumn,
            borderOverActions
          ),
        ]
      : dataColumns;
    let totalSize;
    if (paginationOptions.pagesCount) {
      totalSize = paginationOptions.count;
    } else {
      totalSize = paginationOptions.options.totalElements;
    }
    if (!totalSize) {
      totalSize = constants.DEFAULT_PAGE_SIZE;
    }
    let paginationShow = null;
    switch (pagination) {
      case PaginationShowHide.HIDE:
        paginationShow = false;
        break;
      case PaginationShowHide.SHOW:
        paginationShow = true;
        break;
      default:
        break;
    }

    const start =
      (paginationOptions.options.page - 1) * constants.DEFAULT_PAGE_SIZE + 1;
    const end =
      (paginationOptions.options.page - 1) * constants.DEFAULT_PAGE_SIZE +
      data.length;

    // we will not show pagination in case  totalSize is less then 25 because we don't require pagination there(only 1 page is sufficient)
    if (totalSize <= constants.DEFAULT_PAGE_SIZE) {
      paginationShow = false;
    }

    return (
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page: paginationOptions.options.page,
          sizePerPage: paginationOptions.options.limit,
          totalSize,
          withFirstAndLast: false,
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <>
            <div className={`table-list ${tableWrapperClasses || ""}`}>
              <div className='bs-table bs-table-small'>
                <div className='bs-table-container'>
                  <div className='bs-table-content'>
                    <BootstrapTable
                      key={id && id}
                      id={id && id}
                      pagination={!paginationShow && paginationFactory({})}
                      remote
                      selectRow={
                        onRowSelect && onRowSelectAll
                          ? {
                              mode: "checkbox",
                              selected: selectedRows,
                              onSelect: this.onRowSelect,
                              onSelectAll: this.onRowSelectAllHandler,
                              selectionHeaderRenderer: (options) => (
                                <Checkbox checked={options.checked} />
                              ),
                              selectionRenderer: (options) => (
                                <Checkbox checked={options.checked} />
                              ),
                              headerColumnStyle: { width: "20px" },
                            }
                          : undefined
                      }
                      sort={
                        sort && {
                          dataField: sort.dataField,
                          order: sort.order,
                        }
                      }
                      bordered={false}
                      classes='table-organism'
                      keyField='id'
                      data={data}
                      columns={finalColumns}
                      bodyClasses={`table-organism-body ${
                        bodyWrapperClasses || ""
                      }`}
                      headerWrapperClasses={`table-organism-header ${
                        headerWrapperClasses || ""
                      }`}
                      onTableChange={this.handleTableChange}
                      {...paginationTableProps}
                    />
                  </div>
                  {paginationShow && (
                    <div className='pagination-container'>
                      <Row className='pagination-row'>
                        <span className='regular-2'>{`${start}-${end} of ${totalSize}`}</span>
                        <PaginationWrapper {...paginationProps} />
                      </Row>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </PaginationProvider>
    );
  }
}

export default Table;
