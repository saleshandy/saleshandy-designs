import { Pagination as ReactBootstrapPagination } from "react-bootstrap";
import { Icon } from "../icon";
import React from "react";
import { PaginationComponentProps } from "react-ultimate-pagination";

export const Page = ({
  value,
  isActive,
  isDisabled,
  onClick,
}: PaginationComponentProps) => (
  <ReactBootstrapPagination.Item
    active={isActive}
    disabled={isDisabled}
    onClick={onClick}
  >
    {value}
  </ReactBootstrapPagination.Item>
);

export const Ellipsis = () => (
  <ReactBootstrapPagination.Ellipsis className='custom-ellipsis' />
);

export const FirstPageLink = ({
  isActive,
  isDisabled,
  onClick,
}: PaginationComponentProps) => (
  <ReactBootstrapPagination.First
    active={isActive}
    disabled={isActive || isDisabled}
    onClick={onClick}
  >
    <Icon identifier='chevron-double-left' />
  </ReactBootstrapPagination.First>
);

export const PreviousPageLink = ({
  isActive,
  isDisabled,
  onClick,
}: PaginationComponentProps) => (
  <ReactBootstrapPagination.Prev
    active={isActive}
    disabled={isActive || isDisabled}
    onClick={onClick}
  >
    <Icon identifier='chevron-left' />
  </ReactBootstrapPagination.Prev>
);

export const NextPageLink = ({
  isActive,
  isDisabled,
  onClick,
}: PaginationComponentProps) => (
  <ReactBootstrapPagination.Next
    active={isActive}
    disabled={isActive || isDisabled}
    onClick={onClick}
  >
    <Icon identifier='chevron-right' />
  </ReactBootstrapPagination.Next>
);

export const LastPageLink = ({
  isActive,
  isDisabled,
  onClick,
}: PaginationComponentProps) => (
  <ReactBootstrapPagination.Last
    active={isActive}
    disabled={isActive || isDisabled}
    onClick={onClick}
  >
    <Icon identifier='chevron-double-right' />
  </ReactBootstrapPagination.Last>
);

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ReactBootstrapPagination>{children}</ReactBootstrapPagination>;
