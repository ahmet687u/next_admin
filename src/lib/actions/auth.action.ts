"use server";

import { prisma } from "../client";
import type { TReturnPost } from "@/types";
import getErrorMessage from "@/utils/error"
import { TSignUpSchema, schema } from "@/components/signup/schema";

export const signUpAction = async (formdata: TSignUpSchema): Promise<TReturnPost> => {
  try {
    const parsed = schema.safeParse(formdata)

    /**
     * validaton failed
     * We send error messages to the client page
     */
    if (!parsed.success) return { success: false, error: parsed.error.issues.map(issue => issue.message) }

    //--- successful validation - add user to database
    const response = await prisma.user.create({ data: parsed.data })
    console.log(response);

    return { success: true, message: "Validation Başarılı" }
  } catch (error) {
    return { message: getErrorMessage(error), success: false }
  }
}