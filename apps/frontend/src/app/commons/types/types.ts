import { z } from "zod";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, ReactNode } from "react";

export type CategoryTag = {
  id: number;
  name: string;
};

export type CategoryCardProps = {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  tags: CategoryTag[];
};

export type ActivitiesProps = {
  id: number;
  subcategory: string;
  image: string;
  provider_name: string;
  time_zone: string;
  solo_level: string;
  likes_count: number;
  favorites_count: number;
};

export type ActivityListProps = {
  activities: ActivitiesProps | ActivitiesProps[] | undefined;
};

export type ActivityGroupProps = {
  subcategory: string;
  activities: ActivitiesProps[];
};

export type ActivityProps = {
  provider_name: string;
  image_large: string;
  title: string;
  description: string;
  plan_name: string;
  price: number;
  image_small: string;
  coupon_discount_rate: number;
  url: string;
};

export type ActivityCardProps = {
  activity: ActivitiesProps;
};

export type ReviewProps = {
  id: number;
  nickname: string;
  text: string;
  image: string;
  likes_count: number;
  favorites_count: number;
  update_date: string;
};

export type ReviewItem = {
  // user_id: number;
  text: string;
  image: string;
};

export type ReviewFormProps = {
  apiUrl: string;
};

export type SoloTypeFormProps = {
  solo_level: string;
  activity_preference: string;
  time_preference: string;
  is_planned: boolean;
  weekend_plan_preference: boolean;
  after_work_preference: string;
  comfort_adventure: string;
};

export type SoloTypeResultProp = {
  solo_type: string;
  userId: string;
};

export type UserRegisterProps = {
  email: string;
  nickname: string;
  age: string;
};

export type UserServerResponse = {
  userId: string;
};

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
  nickname: z.string().min(1, { message: "ニックネームを入力してください" }),
  age: z.string(),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const bizAuthSchema = z.object({
  company: z.string().min(1, { message: "企業名を入力してください" }),
  contactName: z.string().min(1, { message: "ご担当者氏名を入力してください" }),
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
});

export type BizAuthSchema = z.infer<typeof bizAuthSchema>;

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で入力してください" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export type ScrollButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  show: boolean;
};

export const searchSchema = z.object({
  search: z.string().min(1, "キーワードを入力してください"),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export type TokenProps = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export type TokenProviderProps = {
  children: ReactNode;
};
