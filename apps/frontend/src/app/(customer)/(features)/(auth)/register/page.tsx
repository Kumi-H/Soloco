"use client";

import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, authSchema } from "@/app/commons/types/types";
import { useAuth } from "@/app/commons/auth/firebaseConfig";
import { useToken } from "@/app/commons/contexts/contexts";
import { useRouter } from "next/navigation";
import { PinkButton } from "@/app/components/ui-elements/button/button";

export default function SignUpForm() {
  const { signUp } = useAuth();
  const { token, setToken } = useToken();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    mode: "onBlur",
    resolver: zodResolver(authSchema),
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
        toast.success("ユーザー登録完了！");
        localStorage.setItem("userId", userId.id);
        router.push(`/solo-type/test?userId=${userId.id}`);
      } catch (error) {
        console.error("エラー:", error);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="bg-white p-10 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">ユーザ登録</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              メールアドレス
              <span className="text-sm font-medium text-red-600 ml-2">
                必須
              </span>
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              placeholder="abc@test.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              パスワード（8文字以上）
              <span className="text-sm font-medium text-red-600 ml-2">
                必須
              </span>
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              placeholder="●●●●●●●●"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ニックネーム
              <span className="text-sm font-medium text-red-600 ml-2">
                必須
              </span>
            </label>
            <input
              {...register("nickname")}
              id="nickname"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              placeholder="サオトメ メグミ"
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              年齢
            </label>
            <select
              {...register("age")}
              id="age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="unknown">選択してください</option>
              <option value="18-20">18〜20歳</option>
              <option value="21-25">21〜25歳</option>
              <option value="26-30">26〜30歳</option>
              <option value="31-35">31〜35歳</option>
              <option value="36-40">36〜40歳</option>
              <option value="41-45">41〜45歳</option>
              <option value="46-50">46〜50歳</option>
              <option value="51-55">51〜55歳</option>
              <option value="56-60">56〜60歳</option>
              <option value="61-65">61〜65歳</option>
              <option value="66+">66歳以上</option>
            </select>
          </div>
          <div>
            <PinkButton type="submit" disabled={isSubmitting}>
              登録する
            </PinkButton>
          </div>
        </form>
      </div>
    </div>
  );
}
