import { PageLayout } from "@/components/PageLayout";
import { DataTable } from "@/components/DataTable";
import oralSessionsData from "@/data/oralSessions.json";
import React from "react";

interface OralSessionEntry {
  paperId: number;
  paperTitle: string;
  authors: string;
  broadArea: string;
  session: string;
  additionalPosterSession: string;
  sessionChair: string;
}

const columns: {
  key: keyof OralSessionEntry;
  header: string;
  className?: string;
  render?: (value: OralSessionEntry[keyof OralSessionEntry], row: OralSessionEntry) => React.ReactNode;
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
    className: "min-w-[250px]",
  },
  {
    key: "broadArea",
    header: "Broad Area",
    className: "min-w-[150px]",
  },
  {
    key: "session",
    header: "Session",
    className: "min-w-[120px]",
    render: (value) => (
      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {String(value)}
      </span>
    ),
  },
  {
    key: "additionalPosterSession",
    header: "Additional Poster Session",
    className: "min-w-[150px]",
    render: (value) =>
      value ? (
        <span className="inline-flex rounded-full bg-[hsl(142,76%,95%)] px-3 py-1 text-xs font-medium text-[hsl(142,76%,30%)]">
          {String(value)}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "sessionChair",
    header: "Session Chair",
    className: "min-w-[150px]",
    render: (value) => value ? String(value) : <span className="text-muted-foreground">TBA</span>,
  },
];

export default function OralSessions() {
  return (
    <PageLayout
      title="Oral Sessions"
      description="Full paper presentations with Q&A sessions"
    >
      <DataTable<OralSessionEntry>
        data={oralSessionsData}
        columns={columns}
      />
    </PageLayout>
  );
}
