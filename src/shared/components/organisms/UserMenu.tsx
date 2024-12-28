"use client";
import type { UserWithRoles } from "application/use-cases/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "shared/components/atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "shared/components/atoms/dropdown-menu";
import { AlignJustify, LogOutIcon, UserPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../atoms/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface UserMenuProps {
  user: UserWithRoles;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const handleSignOut = async () => {
    await signOut();
  };
  const t = useTranslations();
  return (
    <div className="flex gap-2 items-center border-black border-[1px] p-1 rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="flex items-center w-6 h-6">
            <AvatarImage src={user.avatar!} alt={user.name!} />
            <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5 rounded-xl ">
          <DropdownMenuLabel className="flex justify-center items-center gap-3">
            {" "}
            <Avatar>
              <AvatarImage src={user.avatar!} alt={user.name!} />
              <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
            </Avatar>{" "}
            {user.name}{" "}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="px-2 font-semibold flex gap-3 ">
            <Link href="/profile">
              <Button
                variant={"link"}
                className="px-0 flex gap-1  w-full text-base text-black justify-start hover:no-underline"
              >
                <UserPen className="text-secondary" /> {t("buttonWeb.profile")}
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 font-semibold flex gap-3 ">
            {" "}
            <Button
              onClick={handleSignOut}
              variant={"link"}
              className="px-0 flex gap-1 justify-start w-full text-base text-black justify-start hover:no-underline"
            >
              <LogOutIcon className="text-secondary" /> {t("buttonWeb.logout")}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlignJustify />
    </div>
  );
};
