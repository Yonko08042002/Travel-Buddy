import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "shared/components/atoms/button";

export default function HeaderBlog() {
  const t = useTranslations();
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-primary text-primary">
        {t("BlogList.From_our_blogs")}
      </h2>
      <Link href="/blogs">
        {" "}
        <Button className="rounded-none group">
          {t("buttonWeb.See_more")}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
