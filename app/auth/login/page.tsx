"use client";

import { loginSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign } from "crypto";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function LoginPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onLogin(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Welcome to NextPro App");
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
                <CardTitle>Login</CardTitle>
                <CardDescription>Start using the application</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onLogin)}>
                    <FieldGroup className="gap-y-4">
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
                        <Button disabled={isPending}>{isPending ? (<>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Loading...</span>
                        </>) : (
                            <span>Login in</span>
                        )}
                        </Button>
                        <CardDescription className="flex items-center">Forgot password?</CardDescription>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}