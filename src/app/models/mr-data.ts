export type MRData<T> = {
  [key: string]: T
} & MRDataExtraProps;

export interface MRDataExtraProps {
  limit: string,
  offset: string,
  series: string,
  total: string,
  url: string,
  xmlns: string
}
