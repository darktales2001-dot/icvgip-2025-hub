import { PageLayout } from "@/components/PageLayout";
import { DataTable } from "@/components/DataTable";
import tinyPapersData from "@/data/tinyPapers.json";

interface TinyPaperEntry {
  paperTitle: string;
}

const columns: {
  key: keyof TinyPaperEntry;
  header: string;
  className?: string;
}[] = [
  {
    key: "paperTitle",
    header: "Paper Title",
    className: "font-medium",
  },
];

export default function TinyPapers() {
  return (
    <PageLayout
      title="Tiny Papers"
      description="Short papers presenting preliminary results and work-in-progress research"
    >
      <DataTable<TinyPaperEntry>
        data={tinyPapersData}
        columns={columns}
      />
    </PageLayout>
  );
}
