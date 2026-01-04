"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CreateRoute() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const mutation = useMutation(api.posts.createPost);
    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            image: undefined
        }
    });

    function onSubmit(values: z.infer<typeof postSchema>) {
        startTransition(async () => {
            await createBlogAction(values);
            toast.success("Post is created");
        })

    }

    return (
        <div className="py12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl pt-5">Create Post</h1>
                <p className="text-xl text-muted-foreground">Share your thoughts with everyone</p>
            </div>
            <div>
                <Card className="w-full max-w-xl mx-auto">
                    <CardHeader>
                        <CardTitle>Create blog Article</CardTitle>
                        <CardDescription>Create a new blog article</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="gap-y-4">
                                <Controller name="title" control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Title</FieldLabel>
                                            <Input aria-invalid={fieldState.invalid} placeholder="This is my first post" {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />
                                <Controller name="content" control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Content</FieldLabel>
                                            <Textarea aria-invalid={fieldState.invalid} placeholder="Description of my first post" {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />
                                <Controller name="image" control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Image</FieldLabel>
                                            <Input type="file" accept="image/*" aria-invalid={fieldState.invalid} placeholder="Description of my first post"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />
                                <Button disabled={isPending}>{isPending ? (
                                    <>
                                        <Loader2 className="animate-spin size-4" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <span>Create Post</span>
                                )}</Button>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}