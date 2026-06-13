import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/admin/",
                    "/api/",
                    "/cart",
                    "/checkout",
                    "/login",
                    "/my-account",
                    "/order-confirmation",
                ],
            },
        ],
        sitemap: "https://sliceofcake.in/sitemap.xml",
    };
}
