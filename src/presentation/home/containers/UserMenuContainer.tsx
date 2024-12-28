import { getMe } from "application/use-cases/user";
import { UserMenu } from "shared/components/organisms/UserMenu";

import Link from "next/link";
import SizeGoods from "../components/SizeGoods";
import DropMenu from "../components/DropMenu";

export default async function UserMenuContainer() {
  const me = await getMe();

  if (!me) {
    return (
      <div className="flex gap-1 lg:gap-3 items-center">
        <SizeGoods />
        <DropMenu />
      </div>
    );
  }

  return (
    <div className="flex gap-1 lg:gap-8 items-center">
      <Link href="/cart">
        <SizeGoods />
      </Link>
      <UserMenu user={me} />
    </div>
  );
}
