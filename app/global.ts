import * as dotenv from 'dotenv';
dotenv.config();
export const PORT: number | string = process.env.PORT || 1224;

export type MessageFromMain = { action: Action };
export type Action = (typeof ACTION)[keyof typeof ACTION];

export const ACTION = {
  start: 'start',
  close: 'close',
} as const;
