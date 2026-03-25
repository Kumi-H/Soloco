"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/app/commons/utils/imageUtils";
import { CUSTOMER_NAVIGATION_LINKS } from "@/app/commons/constants/constants";
import UserMenu from "../ui-elements/icon/icon";
import { useToken } from "@/app/commons/contexts/contexts";

const CustomerLogoutIconImage = "/logout_icon.png";
const BizIconImage = "/logout_icon_biz.png";

// S3から画像取得
const CustomerLoginIconImage = getImageUrl("icon_customer_login.png");

const CustomerNavigationMenu = () => (
  <nav className="h-full flex items-center">
    <ul className="flex justify-center h-full">
      {CUSTOMER_NAVIGATION_LINKS.map(({ href, label }) => (
        <li key={href} className="flex items-center px-5">
          <Link href={href}>
            <p className="no-underline font-semibold hover:text-pink-500 transition-all text-lg">
              {label}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export const CustomerHeader = () => {
  const { token } = useToken();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <header className="relative">
      <div className="mx-auto">
        <div className="flex items-center justify-between px-5 lg:px-10 py-2 h-20 lg:h-24">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-lg lg:text-xl font-bold">
                <Image
                  src="/soloco_logo.png"
                  width={120}
                  height={40}
                  alt="Logo"
                  className="w-[120px] lg:w-[150px]" // PCの幅とサイズ
                />
              </div>
            </Link>
          </div>

          {!isLoginPage && (
            <div className="flex items-center h-full text-base lg:text-lg">
              <CustomerNavigationMenu />
              <div className="ml-3 lg:ml-5">
                {token ? (
                  <UserMenu iconSrc={CustomerLoginIconImage} isBiz={false} />
                ) : (
                  <UserMenu iconSrc={CustomerLogoutIconImage} isBiz={false} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const BusinessHeader = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/biz/login";
  return (
    <header className="relative">
      <div className="mx-auto">
        <div className="flex items-center justify-between px-5 lg:px-10 py-2 h-20 lg:h-24">
          <div className="flex-shrink-0">
            <Link href="/biz">
              <div className="text-lg lg:text-xl font-bold">
                <Image
                  src="/soloco_logo.png"
                  width={180}
                  height={35}
                  alt="Logo"
                  className="w-[200px] lg:w-[260px]" // モバイル時のサイズ
                />
              </div>
            </Link>
          </div>

          {!isLoginPage && (
            <div className="flex items-center h-full text-base lg:text-lg">
              <div className="ml-3 lg:ml-5">
                <UserMenu iconSrc={BizIconImage} isBiz={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const LandingPageHeader = () => (
  <header className="relative">
    <div className="mx-auto">
      <div className="flex items-center justify-between px-5 lg:px-10 py-2 h-20 lg:h-24">
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="text-lg lg:text-xl font-bold md:items-center">
              <Image
                src="/soloco_logo.png"
                width={120}
                height={35}
                alt="Logo"
                className="w-[120px] lg:w-[150px]" // モバイル時のサイズ
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </header>
);
