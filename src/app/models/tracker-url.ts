export interface TrackerUrl {
  kind: string;
  name: string;
  url: string;
  filter?: string;
  stateId?: string;
  ssl_no_verify?: boolean;
}
