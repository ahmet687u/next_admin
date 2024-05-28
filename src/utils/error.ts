export default function errorConvertToString(error: any): string {
  if(error instanceof Error) return error.message

  return JSON.stringify(error)
}