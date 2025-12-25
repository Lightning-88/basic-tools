"use client";

import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed shadow-lg z-10 shadow-shadow-black h-14 px-4 bg-zinc-50 dark:bg-zinc-950 w-full">
      <nav className="flex items-center justify-between gap-8 h-full border-b border-zinc-200 dark:border-zinc-700">
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
        </div>

        <div
          className={`border-l border-zinc-200 bg-zinc bg-zinc-50 h-screen fixed right-0 top-0 pt-4 px-4 w-64 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-10 transition-transform duration-200 md:hidden dark:bg-zinc-950 dark:border-zinc-700`}
        >
          <div className="flex justify-between mb-8">
            <h1>Basic Tools</h1>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-2">
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
                } z-20 text-sm flex-col text-left border top-6 gap-2 rounded-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 left-0 p-4 w-44`}
              >
                <Link href="/qris-generator">Qris Generator</Link>
                <Link href="/qrcode">QR Generator</Link>
                <Link href="/fbdown">Fb Download</Link>
                <Link href="/tktkdown">Tiktok Download</Link>
              </span>
            </div>
            <button className="flex gap-1 text-gray-950 text-sm/6 dark:text-white">
              List
              <ChevronDown width={12} />
            </button>
            <Link href="/" className="text-gray-950 text-sm/6 dark:text-white">
              Showcase
            </Link>
            <DarkModeToggle />
          </div>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>

        {isOpen && (
          <div
            className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.4)]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}
