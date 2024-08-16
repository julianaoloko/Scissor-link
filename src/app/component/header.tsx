// import LoginAccount from "../component/login";
import SignUpAccount from "../component/signup";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { RiMenuFold4Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className=" px-7 mx-10 bg-slate-600 rounded-2xl">
      <div className="hidden md:block">
        <div className="flex justify-between items-center py-2">
          <nav>
            <ul className="flex gap-3 font-bold cursor-pointer underline text-slate-200">
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQs</li>
            </ul>
          </nav>
          <h3 className="text-2xl text-slate-200 font-bold italic underline">
            lInk shorten
          </h3>
          <div className="items-center flex gap-4">
            {/* <LoginAccount /> */}
            <SignUpAccount />
          </div>
        </div>
      </div>
      <div className="block md:hidden xs:hidden  ">
        <div>
          <DropdownMenu>
            <div className="flex items-center justify-between gap-3 py-4">
              <div>
                <h3 className="text-xl  text-slate-200 font-bold italic">
                  lInkshorten
                </h3>
              </div>
              <DropdownMenuTrigger asChild>
                <div className=" ">
                  <RiMenuFold4Fill className="text-2xl" />
                </div>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-[290px] mr-16 h-[700px] py-8 ml-2 mr-10 -mt-10 px-2 border-none">
              <DropdownMenuGroup >
                <DropdownMenuItem>
                <IoClose className="-mt-5  mb-5 text-3xl font-bold"/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mt-3">Features</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mt-5 py-2"/>
                <DropdownMenuItem>
                  <span className="mt-3">Pricing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mt-5 py-2 " />
                <DropdownMenuItem>
                  <span className="mt-3"> FAQs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mt-5 py-2"/>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* hero section */}
    </header>
  );
}
