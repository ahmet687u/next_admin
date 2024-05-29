export default function getErrorMessage(error: any): string {
  if(error instanceof Error) return error.message

  return JSON.stringify(error)
}