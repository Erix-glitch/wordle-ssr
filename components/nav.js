"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: <span className="">Answer</span> },
    {
      href: "/art",
      label: (
        <span className="bg-linear-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
          Art
        </span>
      ),
    },
  ];

  return (
    <footer className="absolute left-1/2 -translate-x-1/2 top-4 px-4 py-2 border rounded dark:text-gray-400 text-gray-800 font-mono">
      {links.map(({ href, label }, index) => {
        const isActive = pathname === href;
        return (
          <span key={href}>
            <Link
              href={href}
              className={`${
                isActive ? "underline" : "no-underline"
              } hover:underline hover:font-bold active:decoration-wavy`}
            >
              {label}
            </Link>
            {index < links.length - 1 && <span className="mx-1">|</span>}
          </span>
        );
      })}
    </footer>
  );
}
