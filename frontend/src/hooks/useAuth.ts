import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormsType, LoginResponse, VerifyDataType } from "../types/Auth";
import {
  loginApiClient,
  registerApiClient,
  verifyApiClient,
} from "../services/authServices";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  return useMutation<LoginResponse, Error, LoginResponse>({
    mutationFn: loginApiClient.post,
    onSuccess: (user: LoginResponse) => {
      login(user);
      navigate("/");
    },
  });
};

export const useRegisterUser = () => {
  const setPhoneNumber = useAuthStore((s) => s.setPhoneNumber);
  const navigate = useNavigate();
  return useMutation<LoginResponse, Error, LoginResponse>({
    mutationFn: registerApiClient.post,
    onMutate: (newUser: LoginResponse) => {
      setPhoneNumber(newUser.phone_number);
    },
    onSuccess: () => {
      navigate("/auth/verify");
    },
  });
};

export const useVerifyrUser = () => {
  const navigate = useNavigate();
  const clearPhoneNumber = useAuthStore((s) => s.clearPhoneNumber);
  return useMutation<VerifyDataType, Error, VerifyDataType>({
    mutationFn: verifyApiClient.post,
    onSuccess: () => {
      clearPhoneNumber();
      navigate("/");
    },
  });
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const forms: FormsType = {
  signIn: {
    title: "به کوئرا تسک منیجر خوش برگشتی :) ",
    label: "ورود",
    schema: {
      phone_number: z.string().regex(phoneRegex, "شماره تلفت مامعتبر میباشد!"),
      password: z.string().min(1, "رمز عبور الزامی است"),
    },
    fields: [
      { key: "phone_number", type: "text", label: "شماره تلفن" },
      { key: "password", type: "password", label: "رمز عبور" },
    ],
  },
  signUp: {
    title: "ثبت‌نام در کوئرا تسک منیجر",
    label: "ثبت نام",
    schema: {
      full_name: z.string().min(1, { message: "ایمیل الزامی است" }),
      phone_number: z.string().regex(phoneRegex, "شماره تلفت مامعتبر میباشد!"),
      email: z
        .string()
        .min(1, { message: "ایمیل الزامی است" })
        .email("ایمیل وارد شده معتبر نیست"),
      password: z
        .string()
        .min(6, { message: "پسورد باید حداقل 6 کاراکتر باشد." }),
      password2: z
        .string()
        .min(6, { message: "پسورد باید حداقل 6 کاراکتر باشد." }),
      terms: z.literal(true, {
        errorMap: () => ({ message: "شما با قوانین موافقت نکردید!!" }),
      }),
    },
    fields: [
      { key: "full_name", type: "text", label: "نام و نام خانوادگی" },
      { key: "phone_number", type: "text", label: "شماره تلفن" },
      { key: "email", type: "email", label: "ایمیل" },
      { key: "password", type: "password", label: "رمز عبور" },
      { key: "password2", type: "password", label: "تکرار رمز عبور" },

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
      code: z
        .string()
        .min(4, { message: "پسورد باید دقیقا 4 عدد باشد." })
        .max(4, { message: "پسورد باید دقیقا 4 عدد باشد." }),
    },
    fields: [{ key: "code", type: "text", label: "کد یکبار مصرف" }],
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
              .refine((data) => data.password !== data.confirmPassword, {
                path: ["password2"],
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
