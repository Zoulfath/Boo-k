// components/NavBar.tsx
import React, { useState } from "react";
import {
  Navbar,
  NavbarContent,
  Input,
  Kbd,
} from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export default function NavigationBar({setSearchItem}: any) {
  const [searchItem, setLocalSearchItem] = useState("");
  const handleInputChange = (e: any) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    setLocalSearchItem(searchTerm)
  }


  return (
    <Navbar className="min-h-20 border-b px-2 md:px-8 flex justify-between w-full bg-white">
      <div className="flex w-full md:w-1/3">
        <NavbarContent className="">
          <Input
            value={searchItem}
            onChange={handleInputChange}
            type="text"
            placeholder="Search"
            radius="sm"
            classNames={{
              input: "bg-red-100",
              inputWrapper: "bg-indigo-50 shadow-none",
            }}
            startContent={<MagnifyingGlassIcon className="size-5" />}
            endContent={<Kbd className="shadow-none rounded-sm" keys={["command"]}></Kbd>}
          />
        </NavbarContent>
      </div>
      {/* <div>
        <NavbarContent className="hidden sm:flex gap-8 justify-end">
          <NavbarItem isActive>
            <Button variant="light" radius="sm">
             <span className="font-extralight">Nouveautés</span> 
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="flat" color="danger" radius="sm">
            <PencilIcon className="size-4 font-semibold" />
              Notes
            </Button>
          </NavbarItem>
          <NavbarItem>
            <div className="flex items-center">
              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
                }}
              />
            </div>
          </NavbarItem>
        </NavbarContent>
      </div> */}
    </Navbar>
  );
}
