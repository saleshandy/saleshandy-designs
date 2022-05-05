export enum Placement {
  Auto = "auto",
  Top = "top",
  Bottom = "bottom",
  Right = "right",
  Left = "left",
  AutoStart = "auto-start",
  AutoEnd = "auto-end",
  TopStart = "top-start",
  TopEnd = "top-end",
  BottomStart = "bottom-start",
  BottomEnd = "bottom-end",
  RightStart = "right-start",
  RightEnd = "right-end",
  LeftStart = "left-start",
  LeftEnd = "left-end",
}

export const constants = {
  DEFAULT_PAGE_SIZE: 25,
  DEFAULT_PAGE_NUM: 0,
  DOWNLOAD_SAMPLE_FILE_URL:
    "https://v3artifacts.s3-us-west-2.amazonaws.com/downloads/sh-sample-csv.csv",
  MODAL_HANDLER: "modal-handler",
  EMAIL_ACCOUNT_HEALTH_SCORE_LIMIT: 10,
  SEQUENCE_STEP_MESSAGE_LIMIT: 3,
};
