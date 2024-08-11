"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const back = () => {
    router.push('/about')
  }
  return (
    <main className="flex-col p-24">
      <button className="bg-blue-500 rounded text-white px-4 py-2" onClick={back}>Back</button>
      <Link href="/about" className="text-blue-600">Dashboard</Link>
    </main>
  );
}
