const prismaErrorCode = {
  P2002: "Bu değer daha önce eklenmiş",
  P2000: "Sütun için sağlanan değer sütunun türüne göre çok uzun"
}

export default function getErrorMessage(error: any): string {
  //--- for prisma error code
  if (error && typeof error === "object" && "code" in error) return prismaErrorCode[error.code as keyof typeof prismaErrorCode]

  //--- for default error return the error message
  if (error instanceof Error) return error.message

  //--- any error
  return JSON.stringify(error)
}