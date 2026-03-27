"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAuth } from "@/app/commons/auth/firebaseConfig";
import { useToken } from "@/app/commons/contexts/contexts";
import { useRouter } from "next/navigation";

interface IconProps {
  iconSrc: string;
  isBiz: boolean;
}

const UserMenu: React.FC<IconProps> = ({ iconSrc, isBiz }) => {
  const { signOut } = useAuth();
  const { token, setToken } = useToken();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const loginPath = isBiz ? "/biz/login" : "/login";

  const handleLogout = async (event: React.MouseEvent) => {
    if(!token){
      return;
    }

    event.preventDefault();
    const result = await signOut();
    setToken("");
    if (result === "Sign out") {
      toast.success("ログアウトしました");
      router.push(loginPath);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none transition-opacity duration-300 hover:opacity-70"
      >
        <Image
          src={iconSrc}
          alt="User Icon"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
          <Link href={loginPath} onClick={handleLogout}>
            <p className="block px-4 py-2 font-semibold text-base text-gray-700 hover:text-[#FA6183]">
              {token ? "ログアウト" : "ログイン"}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
