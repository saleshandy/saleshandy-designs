import React from 'react';
import {
  createUltimatePagination,
  UltimatePaginationProps,
} from 'react-ultimate-pagination';
import {
  Ellipsis,
  FirstPageLink,
  LastPageLink,
  NextPageLink,
  Page,
  PreviousPageLink,
  Wrapper,
} from './pages';

const itemTypeToComponent = {
  PAGE: Page,
  ELLIPSIS: Ellipsis,
  FIRST_PAGE_LINK: FirstPageLink,
  PREVIOUS_PAGE_LINK: PreviousPageLink,
  NEXT_PAGE_LINK: NextPageLink,
  LAST_PAGE_LINK: LastPageLink,
};

const UltimatePagination = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent: Wrapper,
});

export type PaginationProps = Omit<UltimatePaginationProps, 'disabled'>;

// check default configurations here:
// https://github.com/ultimate-pagination/react-ultimate-pagination#usage

const Pagination: React.FC<PaginationProps> = (props) => (
  <UltimatePagination {...props} disabled={props.totalPages === 0} />
);

Pagination.defaultProps = {
  hideFirstAndLastPageLinks: true,
};

export default Pagination;
