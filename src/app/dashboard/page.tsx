"use client";
import { useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase/config";
// import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
import Shortener from "../component/shorten";
import { GiNetworkBars } from "react-icons/gi";
import { LinkDetails } from "../lib/type";
import { handleGetLinks } from "../component/action";
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa";


// interface Pageprops {
//   children: ReactNode;
// }

// eslint-disable-next-line @next/next/no-async-client-component
export default function Page() {
  const [link, setLink] = useState<LinkDetails[] | null>(null);
  const router = useRouter();
  // const links = await handleGetLinks();
  //   console.log(links)
  useEffect(() => {
    const fetchedLink = async () => {
      const links = await handleGetLinks();
      const ascLink = links.sort(
        (a, b) =>
          b.createdAt?.toDate()?.getTime() - a.createdAt?.toDate()?.getTime()
      );
      setLink(ascLink);
      console.log(links);
    };
    fetchedLink(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <div className="mb-32  md:mb-4 mx-3 ">
      <div>
        <h1 className="font-bold text-2xl my-2 ">Links</h1>
      </div>

      <div>
        <div className="mt-5 relative ">
          
          <Shortener />
        </div>
        {link &&
          link.map((items, index) => (
            <div
              key={index}
              className="flex p-4 my-5 shadow-lg items-center justify-between mt-4 "
            >
              <div className="flex-1 mb-2 my-2 flex flex-col gap-3">
                <p className="text-2xl font-bold underline">{items.name}</p>
                <div className="w-56">
                  <p className="truncate text-current text-sm">{items.link}</p>
                </div>
                <div className="flex gap-5 ">
                  <Link href={`/${items.shortLink}`}>
                    <p className="text-xs font-light underline">
                      link-shorten-beryl.vercel.app/{items.shortLink}
                    </p>
                  </Link>
                  <FaRegCopy
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `link-shorten-beryl.vercel.app/${items.shortLink}`
                      );
                    }}
                  />
                </div>
                <p className="text-xs font-thin">
                  {items.createdAt.toDate().toDateString()}
                </p>
              </div>
              <div className="">
                <p className="text-sm font-bold">{items.clicks}</p>
                <GiNetworkBars className="text-green-800 text-lg font-extrabold" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
