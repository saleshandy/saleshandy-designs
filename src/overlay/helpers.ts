import { generateId } from '../../../utils/string';

export const generateTooltipId = (variableLength?: number) =>
  generateId({ prefix: 'tooltip', variableLength });

export const generatePopoverId = (variableLength?: number) =>
  generateId({ prefix: 'popover', variableLength });

export const generatePopoverConfirmId = (variableLength?: number) =>
  generateId({ prefix: 'popover-confirm', variableLength });
