"use client";

import { useToken } from "../commons/contexts/contexts";

export default function BizHome() {
  const { token } = useToken();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold my-4">Business Top</h1>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          新規登録（有料）
        </button>
      </div>
    </div>
  );
}
