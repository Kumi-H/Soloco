"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { SearchSchema, searchSchema } from "@/app/commons/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "./loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Report() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchSchema>({
    mode: "onBlur",
    resolver: zodResolver(searchSchema),
  });
  const [keyword, setKeyword] = useState<string | null>(null);

  const {
    data: reports,
    error,
    isLoading,
  } = useSWR(
    () =>
      `${process.env.NEXT_PUBLIC_API_REVIEWS_URL}/report/?keyword=` + keyword,
    fetcher
  );

  if (error) return console.log(error);

  const onSubmit = async (data: SearchSchema) => {
    setKeyword(data.search);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl font-bold my-2">クチコミ分析</h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-10/12 justify-between mt-2">
          <div className="mb-2 w-full px-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <p className="mb-3">
                Solocoユーザーのクチコミから行動傾向を分析してレポートを作成します。<br />
                例）旅、誕生日、ホテル、ごほうび etc...
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-row space-x-2 items-center"
              >
                <input
                  {...register("search")}
                  type="search"
                  id="search"
                  className="block w-1/2 h-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="キーワードを入力"
                />
                <button
                  type="submit"
                  className="w-auto h-full text-white bg-fuchsia-300 hover:bg-fuchsia-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 w-auto whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={isSubmitting}
                >
                  分析レポート作成
                </button>
                {errors.search && (
                  <p className="text-red-500 text-xs mb-2">
                    {errors.search.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-10/12 justify-between mt-2">
          <div className="mb-2 w-full md:w-3/5 px-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">ワードクラウド</h2>
              <div className="w-full">
                {isLoading ? (
                  <div
                    className="border border-gray-300 rounded-md"
                    style={{
                      width: "100%",
                      height: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loading />
                  </div>
                ) : reports.wordcloud ? (
                  <Image
                    className="border border-gray-300 rounded-md"
                    src={`data:image/png;base64,${reports.wordcloud}`}
                    alt="Word Cloud"
                    width={500}
                    height={300}
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <div
                    className="border border-gray-300 rounded-md"
                    style={{
                      width: "100%",
                      height: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-2 w-full md:w-2/5 px-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">
                年齢別クチコミ投稿数
              </h2>
              <div className="w-full">
                {isLoading ? (
                  <div
                    className="border border-gray-300 rounded-md"
                    style={{
                      width: "100%",
                      height: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loading />
                  </div>
                ) : reports.age_count ? (
                  <Image
                    src={`data:image/png;base64,${reports.age_count}`}
                    alt="Age Count Graph"
                    width={500}
                    height={300}
                    style={{
                      width: "100%",
                      borderRadius: "5%",
                    }}
                  />
                ) : (
                  <div
                    className="border border-gray-300 rounded-md"
                    style={{
                      width: "100%",
                      height: "400px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-10/12 justify-between mt-2">
          <div className="mb-4 w-full px-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">AIによる分析</h2>
              {isLoading ? (
                <div className="block w-full h-52 text-md rounded-md border">
                  <Loading />
                </div>
              ) : reports.llm ? (
                <textarea
                  id="ai"
                  name="ai"
                  className="block w-full h-52 text-md rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  {reports.llm}
                </textarea>
              ) : (
                <div className="block w-full h-52 text-md rounded-md border"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
