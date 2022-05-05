import React from "react";
import { Dropdown } from "react-bootstrap";
import { Icon } from "../icon";

const ElementPerPageSelector: React.FC<any> = (props) => {
  const { sizePerPage, sizePerPageList, onSizePerPageChange } = props;
  return (
    <div className='page-record-count'>
      <label className='regular-2'>Display records</label>
      <Dropdown bsPrefix='dropdown-custom' drop='down' className='bs-ml-5'>
        <Dropdown.Toggle
          bsPrefix='dropdown-toggle-custom'
          variant='dropdown-custom'
          id='dropdown-basic'
        >
          {sizePerPage} <Icon identifier='chevron-down' className='bs-ml-5' />
        </Dropdown.Toggle>
        <Dropdown.Menu bsPrefix='dropdown-menu-custom'>
          {sizePerPageList.map((option: any, index: number) => (
            <Dropdown.Item
              key={index}
              bsPrefix='dropdown-item-custom'
              onClick={() => onSizePerPageChange(option, 1)}
            >
              <span>{option.toString()}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ElementPerPageSelector;
