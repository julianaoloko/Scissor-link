import Image from "next/image";
import Header from "./component/header";
import Hero from "./component/hero"

export default function Home() {
  return (
    <main className="h-full pt-8 bg-slate-800">
      <Header/>
      <Hero/>
    </main>
  );
}
