"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/app/commons/types/types";
import { useAuth } from "@/app/commons/auth/firebaseConfig";
import { useToken } from "@/app/commons/contexts/contexts";
import { WhiteButton } from "@/app/components/ui-elements/button/button";
import { PinkButton } from "@/app/components/ui-elements/button/button";

export default function CustomerLogIn() {
  const { signIn } = useAuth();
  const { setToken } = useToken();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    const { email, password } = data;
    const result = await signIn(email, password);
    if (result === "error") {
      toast.error("メールアドレスまたはパスワードが間違っています。");
    } else {
      setToken(result);
      toast.success("ログイン成功！");
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto max-w-md px-6 py-10">
      <div className="bg-white p-10 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
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
            <PinkButton type="submit" disabled={isSubmitting}>
              ログインする
            </PinkButton>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">アカウントがない場合</p>
          <WhiteButton href="/register">新規登録する</WhiteButton>
        </div>
      </div>
    </div>
  );
}
