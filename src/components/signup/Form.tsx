"use client";

import toast from "react-hot-toast";
import FormGroup from "../ui/FormGroup";
import SubmitButton from "../SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TSignUpSchema, schema } from "./schema";
import { signUpAction } from "@/lib/actions/auth.action";
import { SubmitHandler, useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    const response = await signUpAction(data);
    if(response.success) {
      toast.success(response?.message as string)
      return
    }
    toast.error(response?.message as string)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup<keyof TSignUpSchema>
          required={true}
          id="name"
          label="İsim Giriniz"
          register={register}
        />
        {errors?.name?.message && errors?.name?.message}

        <FormGroup<keyof TSignUpSchema>
          required
          id="email"
          register={register}
          label="Email Giriniz"
        />
        {errors?.email?.message && errors?.email?.message}

        <FormGroup<keyof TSignUpSchema>
          required
          id="password"
          type="password"
          register={register}
          label="Şifre Giriniz"
        />
        {errors?.password?.message && errors?.password?.message}

        <SubmitButton label="EKLE" loadingText="EKLENİYOR..." />
      </form>
    </div>
  );
};

export default Form;
