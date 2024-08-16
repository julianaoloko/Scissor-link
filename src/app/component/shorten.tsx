"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { handleCreateShortenLink } from "./action";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Shortener() {
  const [form, setForm] = useState({ name: "", link: "" });
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(form);
  };
  const createShortLink = async (e: FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    try {
        await handleCreateShortenLink(form.name, form.link);
        // router.push("/dashboard/links");
    } catch (error) {
        console.error("Error creating link", error);
        // setError(error);
        // setLoading(false);
        // setTimeout(() => {
        //     setError(null);
        // }, 5000);
    }
};
  return (
    <div className="mx-auto ">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 font-bold  gap-2 "><FaPlus className="text-xl font-bold"/>Create link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-sm">
             Welcome
            </DialogTitle>
            <DialogDescription>
            Create a new shortened link
            </DialogDescription>
          </DialogHeader>
          <div className="grid  gap-4 py-2">
            <div className="grid grid-cols-2 items-center gap-1" >
              <Label htmlFor="name" className="font-bold text-sm w-80">What&apos;s the name of your link?</Label>
              <Input
                id="name"
                type="text"
                name="name"
                  value={form.name}
                onChange={handleChange}
                className="col-span-3 my-1"
                placeholder="unique clinic"
              />
            </div>
            <div className="grid gap-4 ">
              <div className="grid grid-cols-2 items-center gap-1 ">
                <Label htmlFor="link" className="font-bold text-sm">Enter your link</Label>
                <Input
                  type="text"
                  name="link"
                  id="link"
                  value={form.link}
                  onChange={handleChange}
                  className="col-span-3 my-1"
                  placeholder="example.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-1">
                <Label htmlFor="link" className="font-bold text-sm w-80">Customize your link (optional)</Label>
                <Input
                  type="name"
                  name="name"
                  id="link"
                  // value={form.link}
                  onChange={handleChange}
                  className="col-span-3 my-1"
                  placeholder=" shorten_url.vercel.app/ uniqueClinic"
                />
              </div>
              <div className="flex justify-between mt-2">
              <Button variant="outline" className="  font-semibold" >
              <DialogClose>Cancel</DialogClose></Button>
              <Button className="  bg-blue-300 font-semibold" onClick={createShortLink}>
              
              <DialogClose>Create</DialogClose></Button>
                
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
