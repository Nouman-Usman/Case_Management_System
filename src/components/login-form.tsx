"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { UserFormValidation } from "@/lib/validations/";
import { Label } from "@/components/ui/label"
import {appName} from "@/contants/index"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createUser } from "@/lib/Auth/index";
import { loginWithGoogle } from "@/lib/Auth/Auth_With_Google/index";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      password: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    console.log(values);
    try {
      const user = {
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      console.log(user);
      // const newUser = await createUser(user);

      // if (newUser) {
      //   router.push(`/patients/${newUser.$id}/register`);
      // }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login for {appName} </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...form.register("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter Your Phone Number"
                  type="tel"
                  required
                  {...form.register("phone")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                Login
              </Button>
              <Button variant="outline" type="button" className="w-full" onClick={loginWithGoogle}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              {/* <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a> */}
              <Button variant="link" className="mt-4 text-underline" type="button" onClick={() => router.push("/signup")}>
                SignUp
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
