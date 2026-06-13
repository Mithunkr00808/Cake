import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to your Slice of Cake account to manage orders and profile.",
    robots: { index: false, follow: false },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
