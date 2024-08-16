"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import SignUpAccount from "./signup"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LoginAccount() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(form);
  };

  const Router = useRouter();
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(res);
      if (res?.user) {
        Router.push("/dashboard");
      }
      // console.log("Login successfully")
    } catch (error) {
      console.log("Error during sign up:", error);
      // const authError = error as AuthError
      // console.log(authError)
    }
  };

  return (
    <div className="mx-auto ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Get Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[300px]  ">
          <DialogHeader>
            <DialogTitle className="text-center -mt-2">Welcome back!!</DialogTitle>
          </DialogHeader>
          <div className="grid  gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="password"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="w-full flex flex-col gap-2">
              <Button
                className=" font-bold bg-blue-600 w-full"
                onClick={handleSignIn}
              >
                Login
              </Button>

                <p className="text-center">
                  You dont have an account?
                  <span className="underline"><SignUpAccount/></span>
                </p>
             
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
