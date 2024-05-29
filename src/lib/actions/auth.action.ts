"use server";

import bcrypt from "bcrypt";
import { prisma } from "../client";
import type { TReturnPost, TTimeStamp } from "@/types";
import getErrorMessage from "@/utils/error"
import { TSignUpSchema, schema } from "@/components/signup/schema";

type TReturnAuth = TReturnPost<Omit<TSignUpSchema, "password"> & TTimeStamp>

export const signUpAction = async (formdata: TSignUpSchema): Promise<TReturnAuth> => {
  try {
    const parsed = schema.safeParse(formdata)

    /**
     * validaton failed
     * We send error messages to the client page
     */
    if (!parsed.success) return { success: false, error: parsed.error.issues.map(issue => issue.message) }

    //---  hash password
    const hash = await bcrypt.hash(parsed.data.password, 8)
    const sendData = { ...parsed.data, password: hash }

    //--- create user in the database
    const response = await prisma.user.create({ data: sendData })

    //--- we return the message if the user addition was successful
    return { success: true, message: `${response.name} adlı kullanıcı başarıyla eklendi` }
  } catch (error) {
    return { message: getErrorMessage(error), success: false }
  }
}