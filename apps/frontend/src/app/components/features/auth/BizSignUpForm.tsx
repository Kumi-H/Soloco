"use client";

import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { BizAuthSchema, bizAuthSchema } from "@/app/commons/types/types";
import { useAuth } from "@/app/commons/auth/firebaseConfig";
import { useToken } from "@/app/commons/contexts/contexts";
import { useRouter } from "next/navigation";
import { PinkButton } from "@/app/components/ui-elements/button/button";

export function BizSignUpForm() {
  const { signUp } = useAuth();
  const { setToken } = useToken();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BizAuthSchema>({
    mode: "onBlur",
    resolver: zodResolver(bizAuthSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const result = await signUp(email, password);
    if (result === "error") {
      toast.error("Error: 登録できません");
    } else {
      try {
        setToken(result);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_USERS_URL}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        const userId = await response.json();
        console.log("成功", userId);
        toast.success("ユーザー登録が完了しました");
        router.push(`/solo-type/test?userId=${userId}`);
      } catch (error) {
        console.error("エラー:", error);
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">ユーザ登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            企業名
          </label>
          <input
            {...register("company")}
            id="company"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="企業名"
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ご担当者氏名
          </label>
          <input
            {...register("contactName")}
            id="contactName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="氏名"
          />
          {errors.contactName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contactName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="abc@test.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="●●●●●●●●"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <PinkButton type="submit" disabled={isSubmitting}>
            登録する
          </PinkButton>
        </div>
      </form>
    </div>
  );
}
