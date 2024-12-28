"use client";
import { DataTable } from "shared/components/molecules/DataTable";
import { Heading } from "shared/components/atoms/heading";
import { Separator } from "shared/components/atoms/separator";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "shared/components/molecules/CellAction";
import {
  deletePromotion,
  upsertPromotion,
} from "application/use-cases/promotion";
import { Button } from "shared/components/atoms/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UpsertPromotionForm from "./UpsertPromotionForm";
import { useState } from "react";
import { Prisma, type Promotion } from "@prisma/client";
import type { AddPromotionInputs } from "domain/promotion/promotion.schema";
import { useTranslations } from "next-intl";

interface ProductsClientProps {
  data: Promotion[];
}

export const PromotionsTable = ({ data }: ProductsClientProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    Promotion | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddPromotionInputs) => {
    try {
      setLoading(true);
      await upsertPromotion({
        id: selectedColumn?.id,
        ...data,
      });

      toast.success(
        selectedColumn
          ? "Promotion updated successfully"
          : "Promotion added successfully"
      );
    } catch (_error) {
      toast.error("Failed to add promotion");
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Promotion>[] = [
    {
      accessorKey: "name",
      header: "NAME",
    },
    {
      accessorKey: "startDate",
      header: "START DATE",
    },
    {
      accessorKey: "endDate",
      header: "END DATE",
    },
    {
      accessorKey: "discountPercentage",
      header: "DISCOUNT PERCENTAGE",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deletePromotion(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between">
        <Heading
          title={`Promotions (${data.length})`}
          description="Manage promotions"
        />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className="mr-2 h-4 w-4" /> {t("buttonWeb.Add_new")}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertPromotionForm
          defaultValues={{
            description: selectedColumn?.description ?? "",
            name: selectedColumn?.name ?? "",
            startDate: selectedColumn?.startDate ?? new Date(),
            endDate: selectedColumn?.endDate ?? new Date(),
            discountPercentage:
              selectedColumn?.discountPercentage ?? new Prisma.Decimal(0.0),
          }}
          title={selectedColumn ? "Edit Promotion" : "Add Promotion"}
          loading={loading}
          isOpen
          onSubmit={onSubmit}
          onClose={() => setSelectedColumn(undefined)}
        />
      )}
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
