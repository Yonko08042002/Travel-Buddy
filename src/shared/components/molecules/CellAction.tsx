"use client";
import { AlertModal } from "./AlertModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "shared/components/atoms/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "shared/components/atoms/button";
import { useTranslations } from "next-intl";

interface CellActionProps {
  onDelete: () => void;
  onEdit: () => void;
}

export function CellAction({ onDelete, onEdit }: CellActionProps) {
  const t = useTranslations("Actions");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    onDelete();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>

          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" /> {t("Update")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 text-red-500" /> {t("Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
