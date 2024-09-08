"use client";

import React from "react";
import MenuItem from "./MenuItem";
import {
  RectangleGroupIcon,
  RectangleStackIcon,
  BookOpenIcon,
  BookmarkIcon,
  ClipboardIcon,
  ChartBarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

export default function SideBar({ bookshelves }: any) {
  const pathname = usePathname(); // Remplace useRouter

  const icons = [
    <RectangleGroupIcon key={1} className="size-5" />,
    <BookOpenIcon key={2}  className="size-5" />,
    <BookmarkIcon key={3} className="size-5" />,
    <ClipboardIcon key={4} className="size-5" />,
    <ChartBarIcon key={5} className="size-5" />,
    <CreditCardIcon key={6} className="size-5" />,
    <ShieldCheckIcon key={7} className="size-5" />,
    <GlobeAltIcon key={8} className="size-5" />,
  ];

  const getRandomIcon = () => {
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ease-in-out ${
          "w-64"
        } h-screen overflow-hidden max-h-full min-w-48 border-r flex flex-col bg-white text-gray-900`}
      >
        {/* Logo and Date */}
        <div>
          <div className="flex items-center gap-2 border-b pt-3 px-4 pb-5 max-h-20">
            <div>
              <Image
                width={14}
                height={14}
                src="/boo-k-logo-black.jpg"
                alt="logo"
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-[600]">Boo-k</h2>
              <p className="text-xs pt-1">{new Date().toDateString()}</p>
            </div>
          </div>

          {/* Menu Header */}
          <div className="mb-6 px-4 flex items-center gap-2 border-b py-8">
            <RectangleStackIcon className="size-5 font-semibold" />
            <h3 className="text-lg font-semibold">Etagères</h3>
          </div>

          {bookshelves && bookshelves.length > 0 ? (
            bookshelves.map((shelf: any) => (
              <MenuItem
                key={shelf.id}
                icon={getRandomIcon()}
                text={shelf.title}
                href={`/?shelfId=${shelf.id}`}
                className={`transition-colors duration-300 ease-in-out cursor-pointer 
                    ${
                      isActive(`/bookshelf/${shelf.id}`)
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700"
                    } hover:bg-red-100 hover:text-red-500 hover:border-l-4 hover:border-red-500 hover:ml-1`}
              />
            ))
          ) : (
            <div>
              <div className="text-gray-500 flex text-sm px-3">
                <div className="h-3 w-1/12 rounded-sm bg-default-300 gap-8">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
                <div className="h-3 w-11/12 ml-1 rounded-sm bg-default-300">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
              </div>
              <div className="text-gray-500 flex text-sm px-3 mt-5">
                <div className="h-3 w-1/12 rounded-sm bg-default-300 gap-8">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
                <div className="h-3 w-11/12 ml-1 rounded-sm bg-default-300">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
              </div>
              <div className="text-gray-500 flex text-sm px-3 mt-5">
                <div className="h-3 w-1/12 rounded-sm bg-default-300 gap-8">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
                <div className="h-3 w-11/12 ml-1 rounded-sm bg-default-300">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
              </div>
              <div className="text-gray-500 flex text-sm px-3 mt-5">
                <div className="h-3 w-1/12 rounded-sm bg-default-300 gap-8">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
                <div className="h-3 w-11/12 ml-1 rounded-sm bg-default-300">
                  <Skeleton className="rounded-lg"></Skeleton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
