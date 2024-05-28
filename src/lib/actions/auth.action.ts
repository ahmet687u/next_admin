import errorConvertToString from "@/utils/error"

export const signUpAction = async (formdata: FormData) => {
  try {
    const { email, password } = Object.fromEntries(formdata)
    if(!email || ! password) throw new Error("Tüm alanları doldurduğunuzdan emin olun")

    console.log(email, password)
  } catch (error) {
    throw new Error(errorConvertToString(error))
  }
}