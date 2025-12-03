import { PageLayout } from "@/components/PageLayout";
import { DataTable } from "@/components/DataTable";
import visionIndiaData from "@/data/visionIndia.json";

interface VisionIndiaEntry {
  sn: number;
  paperTitle: string;
  venue: string;
  authors: string;
}

const columns: {
  key: keyof VisionIndiaEntry;
  header: string;
  className?: string;
}[] = [
  {
    key: "sn",
    header: "SN",
    className: "w-16 text-center",
  },
  {
    key: "paperTitle",
    header: "Paper Title",
    className: "min-w-[300px] font-medium",
  },
  {
    key: "venue",
    header: "Venue at which the work is accepted / presented / published",
    className: "min-w-[200px]",
  },
  {
    key: "authors",
    header: "Authors",
    className: "min-w-[300px]",
  },
];

export default function VisionIndia() {
  return (
    <PageLayout
      title="Vision-India Session"
      description="Showcasing cutting-edge research from Indian institutions accepted at top-tier international venues"
    >
      <DataTable<VisionIndiaEntry>
        data={visionIndiaData}
        columns={columns}
      />
    </PageLayout>
  );
}
