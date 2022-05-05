import React from 'react';
import Pagination from '../../pagination';

const PaginationWrapper: React.FC<any> = (props) => {
  const { dataSize, page, onPageChange } = props;
  const totalPage = Math.ceil(dataSize / 25);

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPage}
      onChange={onPageChange}
    />
  );
};

export default PaginationWrapper;
