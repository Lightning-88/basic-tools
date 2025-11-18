"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={{ pathname: "/qris-generator" }}>
        <Button>Try it</Button>
      </Link>
    </div>
  );
}
