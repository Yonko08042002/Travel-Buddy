"use client";
import { ShareIcon } from "lucide-react";
import { Button } from "shared/components/atoms/button";

export default function ShareButton() {
  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };
  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <ShareIcon className="h-4 w-4 mr-2" />
      Chia sẻ
    </Button>
  );
}
