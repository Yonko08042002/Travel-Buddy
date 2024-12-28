"use client";
import { DataTable } from "shared/components/molecules/DataTable";
import { Heading } from "shared/components/atoms/heading";
import { Separator } from "shared/components/atoms/separator";
import type { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "shared/components/molecules/CellAction";
import { deleteVideo, upsertVideo } from "application/use-cases/video";
import { Button } from "shared/components/atoms/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UpsertVideoForm from "./UpsertVideoForm";
import { useState } from "react";
import type { Video } from "@prisma/client";
import type { AddVideoInputs } from "domain/video/video.schema";
import { useTranslations } from "next-intl";

interface ProductsClientProps {
  data: Video[];
}

export const VideosTable = ({ data }: ProductsClientProps) => {
  const [selectedColumn, setSelectedColumn] = useState<
    Video | null | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const onSubmit = async (data: AddVideoInputs) => {
    try {
      setLoading(true);
      await upsertVideo({
        id: selectedColumn?.id,
        ...data,
      });

      toast.success(
        selectedColumn
          ? "Video updated successfully"
          : "Video added successfully"
      );
    } catch (_error) {
      toast.error("Failed to add video");
    } finally {
      setLoading(false);
      setSelectedColumn(undefined);
    }
  };

  const columns: ColumnDef<Video>[] = [
    {
      accessorKey: "name",
      header: "NAME",
    },
    {
      accessorKey: "link",
      header: "LINK",
      cell: ({ row }) => (
        <a
          href={row.original.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {row.original.link}
        </a>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <CellAction
          onEdit={() => setSelectedColumn(row.original)}
          onDelete={() => deleteVideo(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between">
        <Heading
          title={`Videos (${data.length})`}
          description="Manage videos"
        />
        <Button onClick={() => setSelectedColumn(null)}>
          <Plus className="mr-2 h-4 w-4" /> {t("buttonWeb.Add_new")}
        </Button>
      </div>
      <Separator />
      {selectedColumn !== undefined && (
        <UpsertVideoForm
          defaultValues={{
            name: selectedColumn?.name ?? "",
            link: selectedColumn?.link ?? "",
          }}
          title={selectedColumn ? "Edit Video" : "Add Video"}
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
