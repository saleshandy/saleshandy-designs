import React from "react";
import { Icon } from "../icon";
import { Overlay, Placement, Tooltip } from "../overlay";
import { ImageIcon } from "../image-icon";
import { Images } from "../utils/images";

const getContactName = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  return lastName;
};

const iconStyle = { marginLeft: ".25rem", marginTop: ".15rem" };
const warningTriangleIconStyle = { marginLeft: ".25rem" };

const iconConfigs: { [key: string]: any } = {
  skip: {
    identifier: "danger",
    toolTipText: "Not Verified",
    className: "gray-txt-7",
  },
  valid: {
    identifier: "check-o",
    toolTipText: "Verified",
    className: "green-txt-14",
  },
  risky: {
    identifier: "danger",
    toolTipText: "Risky",
    className: "orange-txt-6",
  },
  bad: {
    identifier: "danger",
    toolTipText: "Bad",
    className: "red-txt-6",
  },
  unknown: {
    identifier: "danger",
    toolTipText: "Risky",
    className: "red-txt-6",
  },
  inProgress: {
    identifier: "timelapse",
    toolTipText: "In Progress",
    className: "blue-txt-6",
  },
};
const ContactNameField: React.FC<{
  cell: any;
  onClick: any;
  hideUnverifiedStatusIcon: any;
}> = ({ cell, onClick, hideUnverifiedStatusIcon }) => {
  const field = {
    Email: "",
    "First Name": "",
    "Last Name": "",
  };
  cell.forEach((contactField: { label: string; value: any }) => {
    if (
      contactField.label === "Email" ||
      contactField.label === "First Name" ||
      contactField.label === "Last Name"
    ) {
      field[contactField.label] = contactField.value;
    }
  });

  const iconConfig = iconConfigs[cell.verificationStatus];

  const verificationToolTip = (
    <Overlay
      placement={Placement.Right}
      overlay={<Tooltip id={cell.id} text={iconConfig?.toolTipText} />}
    >
      {cell.verificationStatus !== "skip" ? (
        <Icon
          identifier={iconConfig?.identifier}
          className={iconConfig?.className}
          style={iconStyle}
        />
      ) : !hideUnverifiedStatusIcon ? (
        <div style={warningTriangleIconStyle}>
          <ImageIcon src={Images.ChecksGreen} />
        </div>
      ) : (
        <></>
      )}
    </Overlay>
  );

  if (field["First Name"] || field["Last Name"]) {
    const contactName = getContactName(field["First Name"], field["Last Name"]);
    return (
      <div
        className='contact-field-name-container'
        onClick={() => !!onClick && onClick(cell[0].id)}
      >
        <div className='name-field'>
          <div className='d-flex justify-content-between'>
            <span className='mr-2'>{contactName}</span>
          </div>
        </div>
        <div className='email-field'>
          {`${field.Email}`} {iconConfig && verificationToolTip}
        </div>
      </div>
    );
  }
  return (
    <div
      className='contact-field-name-container'
      onClick={() => !!onClick && onClick(cell[0].id)}
    >
      <div className='email-only-field'>
        {`${field.Email}`}
        {iconConfig && verificationToolTip}
      </div>
    </div>
  );
};

export default ContactNameField;
