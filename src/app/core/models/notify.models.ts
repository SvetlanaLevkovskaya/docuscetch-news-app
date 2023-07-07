export type SeverityType = 'success' | 'error' | 'info'

export interface Notify {
  message: string
  severity: SeverityType
}
