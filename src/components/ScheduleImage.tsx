import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ScheduleImage({ src, alt, className }: ScheduleImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn("relative group cursor-pointer", className)}>
        <div className="rounded-xl border border-border bg-card p-4 shadow-lg overflow-x-auto">
          <img
            src={src}
            alt={alt}
            className="w-full min-w-[800px] rounded-lg transition-transform group-hover:scale-[1.02]"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <ZoomIn className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Click to zoom</span>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2">
          <div className="overflow-auto max-h-[90vh]">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}



