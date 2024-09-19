"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/app/commons/utils/imageUtils";
import { CUSTOMER_NAVIGATION_LINKS } from "@/app/commons/constants/constants";
import UserMenu from "../ui-elements/Icon/page";
import { useToken } from "@/app/commons/contexts/contexts";

// S3から画像取得
const Logo = getImageUrl("soloco_logo.png");
const BizLogo = getImageUrl("logo_business.png");
const CustomerLogoutIconImage = getImageUrl("icon_customer_logout.png");
const CustomerLoginIconImage = getImageUrl("icon_customer_login.png");
const BizIconImage = getImageUrl("icon_business_login.png");

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
    return (
        <header className="relative">
            <div className="mx-auto">
                <div className="flex items-center justify-between px-10 py-2 h-24">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="text-xl font-bold">
                                <Image
                                    src={Logo}
                                    width={150}
                                    height={50}
                                    alt="Logo"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center h-full text-lg">
                        <CustomerNavigationMenu />
                        <div className="ml-5">
                            {token ? (
                                <UserMenu iconSrc={CustomerLoginIconImage} />
                            ) : (
                                <UserMenu iconSrc={CustomerLogoutIconImage} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export const BusinessHeader = () => (
    <header className="relative">
        <div className="mx-auto">
            <div className="flex items-center justify-between px-10 py-2 h-24">
                <div className="flex-shrink-0">
                    <Link href="/business">
                        <div className="text-xl font-bold">
                            <Image
                                src={BizLogo}
                                width={260}
                                height={50}
                                alt="Logo"
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex items-center h-full text-lg">
                    <div className="ml-5">
                        <UserMenu iconSrc={BizIconImage} />
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export const LandingPageHeader = () => (
    <header className="relative">
        <div className="mx-auto">
            <div className="flex items-center justify-between px-10 py-2 h-24">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <div className="text-xl font-bold">
                            <Image
                                src={Logo}
                                width={150}
                                height={50}
                                alt="Logo"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </header>
);
