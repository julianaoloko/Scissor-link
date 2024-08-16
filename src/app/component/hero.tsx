// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { GiBreakingChain } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import LoginAccount from "./login";
// import SignUpAccount from "./signup";
// import LoginAccount from "./login";
export default function Hero() {
  return (
    <div className="h-screen   border border-gray-50 border-dashed min-h-min py-8 item-center mt-10 relative text-center">
      <GiBreakingChain className=" absolute left-1 text-9xl font-bold text-zinc-100 blur-sm" />
      <p className="max-w-fit  text-4xl font-bold py-3 w-96 mt-20  mx-auto leading-snug text-zinc-100">
        Make that social link shorter. Super fast!
      </p>
      <p className="text-xs max-w-fit font-thin text-slate-200 py-6 px-6 w-96 mx-auto">
        Say good bye to long, cumbersome URLs and hello to a simpler, sleeker
        way to shorten, share and manage your links.
      </p>
      {/* <Label htmlFor="email" className="text-2l font-bold text-slate-200">
          Your email address
        </Label> */}
      <div className="  items-center  mx-auto font-bold border-none px-6 ">
        {/* <Input type="text" id="email" placeholder="enter your url" required /> */}
        {/* <GiBreakingChain className=" text-8xl font-bold text-zinc-100  blur-sm" /> */}
        <LoginAccount/>
      </div>
    </div>
  );
}
