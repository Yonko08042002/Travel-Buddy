import { configs } from "shared/lib/constant";
import Image from "next/image";
import Link from "next/link";
import type { UserWithRoles } from "application/use-cases/user";
import { UserMenu } from "shared/components/organisms/UserMenu";
import { LanguageSelector } from "presentation/home/components/LanguageSelector";

type HeaderProps = {
  user: UserWithRoles;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="border-gray-100 border-b shadow-xs">
      <nav className="flex h-14 items-center justify-between px-8">
        <Link href="/admin" className="text-xl">
          <Image src={configs.logo} alt="logo" height={60} width={110} />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <UserMenu user={user} />
        </div>
      </nav>
    </header>
  );
}
