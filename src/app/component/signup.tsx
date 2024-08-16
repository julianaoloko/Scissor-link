"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { createUserWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { Phone } from "lucide-react";
import { PhoneAuthCredential } from "firebase/auth/web-extension";

export default function SignUpAccount() {
    const [form, setForm] = useState({ email: "", password: "",})
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
          const { name, value } = e.currentTarget
          setForm((prev) => ({...prev, [name]: value}))
          console.log(form)
      }
      const Router = useRouter()
      const handleSignUp = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, form.email, form.password)
            // const resPhone =  res(auth, )
            console.log(res)
            if(res?.user){
                Router.push("/dashboard")
            }
            // console.log("User Created Successfully")
        } catch (error) {
            console.log("Error duri~ng sign up:", error)
            // const authError = error as AuthError
            // console.log(authError)
        }
      }
  return (
    <div className="mx-auto ">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">SignUp</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[300px]">
          <DialogHeader>
            <DialogTitle className="text-center -mt-2">Create an Account</DialogTitle>
          </DialogHeader>
          <div className="grid  gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-1">
              <Label htmlFor="name">Username</Label>
              <Input
                id="displayUsername"
                // type="text"
                // name="email"
                // value={form.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-1">
              <Label htmlFor="name">Email</Label>
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
                className=" font-bold bg-blue-600 w-full cursor-pointer"
                onClick={handleSignUp}
              >
                Signup
              </Button>
             
                <p className="text-center">
                  You already have an account?
                  <DialogClose>
                  <span className="underline">login</span>
                  </DialogClose>
                </p>
            </div>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  );
}
