import { Button } from "shared/components/atoms/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "shared/components/atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "shared/components/atoms/dropdown-menu";
import { AlignJustify, User } from "lucide-react";
import { useTranslations } from "next-intl";
export default function DropMenu() {
  const t = useTranslations();
  return (
    <div className="flex gap-2 items-center border-black border-[1px] p-1 rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="flex items-center w-6 h-6">
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5 rounded-xl ">
          <DropdownMenuItem className="px-2 font-semibold flex gap-3 ">
            <Link href="/login">
              <Button
                variant={"link"}
                className="w-full text-base text-black justify-start hover:no-underline"
              >
                {t("buttonWeb.login")}
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 font-semibold flex gap-3 ">
            <Link href="/register">
              <Button
                variant={"link"}
                className="w-full text-base text-black justify-start hover:no-underline"
              >
                {t("buttonWeb.register")}
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlignJustify />
    </div>
  );
}
