import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Account",
    description: "Manage your Slice of Cake account, view orders, and update your profile.",
    robots: { index: false, follow: false },
};

export default function MyAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
