import { z } from "zod";
import { FormsType } from "../types/Auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const forms: FormsType = {
  signIn: {
    title: "به کوئرا تسک منیجر خوش برگشتی :) ",
    label: "ورود",
    schema: {
      email: z
        .string()
        .min(1, { message: "ایمیل الزامی است" })
        .email("ایمیل وارد شده معتبر نیست"),
      password: z.string().min(1, "رمز عبور الزامی است"),
    },
    fields: [
      { key: "email", type: "email", label: "ایمیل" },
      { key: "password", type: "password", label: "رمز عبور" },
    ],
  },
  signUp: {
    title: "ثبت‌نام در کوئرا تسک منیجر",
    label: "ثبت نام",
    schema: {
      phone: z.string().regex(phoneRegex, "شماره تلفت مامعتبر میباشد!"),
      email: z
        .string()
        .min(1, { message: "ایمیل الزامی است" })
        .email("ایمیل وارد شده معتبر نیست"),
      password: z
        .string()
        .min(6, { message: "پسورد باید حداقل 6 کاراکتر باشد." }),
      confirmPassword: z
        .string()
        .min(6, { message: "پسورد باید حداقل 6 کاراکتر باشد." }),
      terms: z.literal(true, {
        errorMap: () => ({ message: "شما با قوانین موافقت نکردید!!" }),
      }),
    },
    fields: [
      { key: "phone", type: "text", label: "شماره تلفن" },
      { key: "email", type: "email", label: "ایمیل" },
      { key: "password", type: "password", label: "رمز عبور" },
      { key: "terms", type: "checkbox", label: "قوانین و مقررات را می‌پذیرم." },
    ],
  },
  signInPhone: {
    title: "به کوئرا تسک منیجر خوش برگشتی :) ",
    label: "ورود",
    schema: {
      phone: z.string().regex(phoneRegex, "شماره تلفت مامعتبر میباشد!"),
    },
    fields: [{ key: "phone", type: "text", label: "شماره تلفن" }],
  },
  code: {
    title: "تایید رمز یکبار مصرف",
    label: "تایید",
    schema: {
      phone: z
        .number()
        .min(4, { message: "پسورد باید دقیقا 4 عدد باشد." })
        .max(4, { message: "پسورد باید دقیقا 4 عدد باشد." }),
    },
    fields: [{ key: "phone", type: "text", label: "شماره تلفن" }],
  },
};

const useAuth = (formClass: string) => {
  const { schema, fields, label, title } = forms[formClass];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:
      formClass === "signUp"
        ? zodResolver(
            z
              .object(schema)
              .refine((data) => data.password === data.confirmPassword, {
                path: ["confirmPassword"],
                message: "پسورد و تکرار آن باید یکسان باشد.",
              })
          )
        : zodResolver(z.object(schema)),
  });

  return {
    title,
    fields,
    label,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
};

export default useAuth;
