"use server";

import type { TReturnPost } from "@/types";
import errorConvertToString from "@/utils/error"
import { TSignUpSchema, schema } from "@/components/signup/schema";

export const signUpAction = async (formdata: TSignUpSchema): Promise<TReturnPost> => {
  try {
    console.log(formdata);
    const parsed = schema.safeParse(formdata)

    if (!parsed.success) return { success: false, error: parsed.error.issues.map(issue => issue.message) }

    //--- validation unfailed 
    console.log("halo")

    return { success: true, message: "Validation Başarılı" }
  } catch (error) {
    return { message: errorConvertToString(error), success: false }
  }
}