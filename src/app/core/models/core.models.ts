export interface CommonResponseType<T = {}> {
  data: T
  resultCode: number
  messages: string[]
}
