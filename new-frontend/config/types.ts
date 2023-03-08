import { EVENT_TYPES } from "~/config/constants";

export type OneOfValues<T> = T[keyof T];
export type EventId = string;
export type StatusCode = number; // TODO: update type
export type Email = string; // TODO: update type

type SMTPUser = {
  name: string;
  email: Email;
}

export interface Monolog {
  message: string,
  context: object,
  level: StatusCode,
  level_name: string,
  channel: string,
  datetime: string,
  extra: object,
}

export interface SMTP {
  id: string,
  from: SMTPUser[],
  reply_to: SMTPUser[],
  subject: string,
  to: SMTPUser[],
  cc: SMTPUser[],
  bcc: SMTPUser[],
  text: string,
  html: string,
  raw: string,
  attachments: unknown[]
}

// TODO: Cover all possible cases
// https://github.com/getsentry/sentry/tree/master/static/app/components/events/contexts

export type SentryFrame = {
  filename: string,
  lineno: number,
  in_app: boolean,
  abs_path: string,
  pre_context: string[],
  context_line: string,
  post_context: string[]
}

export type SentryException = {
  type: string,
  value: string,
  stacktrace: {
    frames: SentryFrame[]
  },
  [key: string]: unknown
}

export interface Sentry {
  event_id: string,
  timestamp: number,
  platform: string,
  contexts: {
    runtime: {
      name: string,
      version: string,
    } | unknown,
    os: {
      name: string,
      version: string,
    } | unknown,
    app: {
      device_app_hash: string,
      build_type: string,
      app_identifier: string,
      app_name: string,
      app_version: string,
      app_build: string,
      app_id: string,
      type: string,
    } | unknown,
    device: {
      screen_resolution: string,
      orientation: string,
      family: string,
      battery_level: number,
      screen_dpi: number,
      memory_size: number,
      timezone: string,
      external_storage_size: number,
      external_free_storage: number,
      screen_width_pixels: number,
      low_memory: boolean,
      simulator: boolean,
      screen_height_pixels: number,
      free_memory: number,
      online: boolean,
      screen_density: number,
      type: string,
      charging: boolean,
      model_id: string,
      brand: string,
      storage_size: number,
      boot_time: string,
      arch: string,
      manufacturer: string,
      name: string, // redacted
      free_storage: number,
      model: string,
    } | unknown,
  },
  breadcrumbs: {
    values: [{
      type: string,
        category: string,
        level: string,
        timestamp: number,
        message: string,
    }]
  } | unknown,
  sdk: {
    name: string,
    version: string,
  } | unknown,
  logger: string,
  server_name: string,
  environment: string,
  modules: object,
  extra: unknown,
  tags: object,
  request: {
    url: string,
    method: string,
    headers: object,
    data: object,
  },
  exception: {
    values: SentryException[]
  }
}

export interface VarDump {
  payload: {
    type: string,
    value: string
  },
  context: {
    timestamp: number,
    cli: {
      command_line: string,
      identifier: string
    },
    source: {
      name: string,
      file: string,
      line: number,
      file_excerpt: boolean
    }
  }
}

export interface ProfilerCost {
  [key: string]: number,
  "ct": number,
  "wt": number,
  "cpu": number,
  "mu": number,
  "pmu": number
}

export interface ProfilerEdge {
  caller: string,
  callee: string,
  cost: ProfilerCost
}

export type ProfilerEdges = {
  [key: string]: ProfilerEdge
}

export interface Profiler {
  tags: {
    [key: string]: string | null | number
  },
  app_name: string,
  hostname: string,
  date: number,
  peaks: ProfilerCost,
  edges: {
    [key: string]: ProfilerEdge
  }
}


export interface ServerEvent<T> {
  uuid: EventId,
  type: OneOfValues<typeof EVENT_TYPES> | string,
  payload: T,
  project_id: string|null,
  timestamp: number
}

export interface NormalizedEvent {
  id: EventId,
  type: OneOfValues<typeof EVENT_TYPES> | string,
  labels: string[],
  origin: object | null,
  serverName: string,
  date: Date,
  payload: Monolog | SMTP | Sentry | VarDump | Profiler | unknown
}
