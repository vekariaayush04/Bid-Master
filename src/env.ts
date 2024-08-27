import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server:{
        DATABASE_URL:z.string().url(),
        NODE_ENV : z.string().min(1),
        CLOUDFLARE_ACCOUNT_ID : z.string().min(1),
        CLOUDFLARE_ACCESS_KEY_ID : z.string().min(1),
        CLOUDFLARE_SECRET_ACCESS_KEY : z.string().min(1),
        CLOUDFLARE_BUCKET_NAME : z.string().min(1)
    },
    client:{},
    runtimeEnv:{
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL : process.env.DATABASE_URL,
        CLOUDFLARE_ACCOUNT_ID : process.env.CLOUDFLARE_ACCOUNT_ID,
        CLOUDFLARE_ACCESS_KEY_ID : process.env.CLOUDFLARE_ACCESS_KEY_ID,
        CLOUDFLARE_SECRET_ACCESS_KEY : process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
        CLOUDFLARE_BUCKET_NAME : process.env.CLOUDFLARE_BUCKET_NAME
    }
})