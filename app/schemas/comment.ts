import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
    body: z.string().min(3).max(1000),
    postId: z.custom<Id<"posts">>()
})