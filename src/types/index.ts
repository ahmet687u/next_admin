export type TReturnPost<T = void> = {
  data?: T
  success: boolean
  message?: string
  error?: string | Array<string>
}

export interface TTimeStamp {
  createdAt: Date;
  updatedAt: Date;
}