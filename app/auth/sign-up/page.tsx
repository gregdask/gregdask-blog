"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SignUpPage() {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                name: data.name,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account created successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="name" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="John Doe" type="name" {...field} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                        <Controller name="email" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="johndoe@email.com" type="email" {...field} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                        <Controller name="password" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="*******" type="password" {...field} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />
                        <Button disabled={isPending}>{isPending ? (
                            <>
                                <Loader2 className="animate-spin size-4" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>SignUp</span>
                        )}</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}