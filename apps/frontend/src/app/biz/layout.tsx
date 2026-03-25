import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { BusinessHeader } from "../components/layouts/header";
import "../commons/styles/globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Soloco for Business",
    description:
        "Solocoのソロ活データを収集し、企業向けに情報を提供するアプリです。",
};

export default function BusinessLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <BusinessHeader />
            {children}
        </>
    );
}
