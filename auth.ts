import { betterAuth } from "better-auth";

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
});
