import { EVENT_TYPES } from "~/config/constants";

export type OneOfValues<T> = T[keyof T];
export type EventId = string;
export type StatusCode = number; // TODO: update type
export type Email = string; // TODO: update type

type SMTPUser = {
  name: string;
  email: Email;
}

export interface MonologPayload {
  message: string,
  context: Object,
  level: StatusCode,
  level_name: string,
  channel: string,
  datetime: string,
  extra: Object,
}

export interface SMTPPayload {
  "id": string,
  "from": SMTPUser[],
  "reply_to": SMTPUser[],
  "subject": string,
  "to": SMTPUser[],
  "cc": SMTPUser[],
  "bcc": SMTPUser[],
  "text": string,
  "html": string,
  "raw": string,
  "attachments": unknown[]
}

export interface ServerEvent {
  uuid: EventId,
  type: string,
  payload: unknown,
  project_id: string|null,
  timestamp: number
}

export interface MonologEvent extends ServerEvent {
  payload: MonologPayload,
}

export interface SMTPEvent extends ServerEvent {
  payload: SMTPPayload,
}

export interface NormalizedEvent {
  id: EventId,
  type: OneOfValues<typeof EVENT_TYPES>,
  labels: string[],
  origin: Object | null,
  serverName: string,
  date: Date,
  payload: MonologPayload | SMTPEvent | unknown
}

