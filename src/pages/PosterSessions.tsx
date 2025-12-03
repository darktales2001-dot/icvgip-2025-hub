import { PageLayout } from "@/components/PageLayout";
import { DataTable } from "@/components/DataTable";
import posterSessionsData from "@/data/posterSessions.json";
import React from "react";

interface PosterSessionEntry {
  paperId: number;
  paperTitle: string;
  authors: string;
  session: string;
  sessionChair: string;
}

const columns: {
  key: keyof PosterSessionEntry;
  header: string;
  className?: string;
  render?: (value: PosterSessionEntry[keyof PosterSessionEntry], row: PosterSessionEntry) => React.ReactNode;
}[] = [
  {
    key: "paperId",
    header: "Paper ID",
    className: "w-24 text-center",
  },
  {
    key: "paperTitle",
    header: "Paper Title",
    className: "min-w-[300px] font-medium",
  },
  {
    key: "authors",
    header: "Authors",
    className: "min-w-[300px]",
  },
  {
    key: "session",
    header: "Session",
    className: "min-w-[130px]",
    render: (value) => (
      <span className="inline-flex rounded-full bg-[hsl(142,76%,95%)] px-3 py-1 text-xs font-medium text-[hsl(142,76%,30%)]">
        {String(value)}
      </span>
    ),
  },
  {
    key: "sessionChair",
    header: "Session Chair",
    className: "min-w-[150px]",
    render: (value) => value ? String(value) : <span className="text-muted-foreground">TBA</span>,
  },
];

export default function PosterSessions() {
  return (
    <PageLayout
      title="Poster Sessions"
      description="Interactive poster presentations and discussions"
    >
      <DataTable<PosterSessionEntry>
        data={posterSessionsData}
        columns={columns}
      />
    </PageLayout>
  );
}
