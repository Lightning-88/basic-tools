"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <header>
      <nav className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-700">
        <div>
          <Link href="/">
            <h1 className="font-semibold">Basic Tools</h1>
          </Link>
        </div>

        <div className="items-center gap-6 hidden md:flex">
          <Link href="/" className="text-gray-950 text-sm/6 dark:text-white">
            Docs
          </Link>
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <button className="flex gap-1 text-gray-950 text-sm/6 dark:text-white">
              Tools
              {isMouseOver ? (
                <ChevronUp width={12} aria-hidden="false" />
              ) : (
                <ChevronDown width={12} />
              )}
            </button>
            <span
              className={`absolute ${
                isMouseOver ? "flex" : "hidden"
              } text-sm flex-col text-left border top-6 gap-2 rounded-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 left-0 p-4 w-44`}
            >
              <Link href="/qris-generator">Qris Generator</Link>
              <Link href="/qrcode">QR Generator</Link>
            </span>
          </div>
          <button className="flex gap-1 text-gray-950 text-sm/6 dark:text-white">
            List
            <ChevronDown width={12} />
          </button>
          <Link href="/" className="text-gray-950 text-sm/6 dark:text-white">
            Showcase
          </Link>
          <Link
            href="/"
            className="group relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300"
          >
            <span className="absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30"></span>
            Plus
            <svg
              width="5"
              height="5"
              viewBox="0 0 5 5"
              className="absolute top-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50"
            >
              <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
            </svg>
            <svg
              width="5"
              height="5"
              viewBox="0 0 5 5"
              className="absolute top-[-2px] right-[-2px] fill-sky-300 dark:fill-sky-300/50"
            >
              <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
            </svg>
            <svg
              width="5"
              height="5"
              viewBox="0 0 5 5"
              className="absolute bottom-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50"
            >
              <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
            </svg>
            <svg
              width="5"
              height="5"
              viewBox="0 0 5 5"
              className="absolute right-[-2px] bottom-[-2px] fill-sky-300 dark:fill-sky-300/50"
            >
              <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
