import * as z from "zod";

export const MessageSchema = z.object({
  title: z.string().max(256),
  explanation: z.string().min(1),
  tags: z.array(z.string().min(1).max(50)).min(1).max(3),
});
