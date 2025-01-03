import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "shared/components/atoms/breadcrumb";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  const t = useTranslations("admin");
  return (
    <section>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin"> {t("dashboard")}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}
