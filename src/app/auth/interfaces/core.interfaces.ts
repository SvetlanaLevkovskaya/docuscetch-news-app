export interface CommonResponseType<T = object> {
  data: T
  resultCode: number
  messages: string[]
}
