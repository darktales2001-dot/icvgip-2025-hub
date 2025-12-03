import { PageLayout } from "@/components/PageLayout";
import { DataTable } from "@/components/DataTable";
import acceptedPapersData from "@/data/acceptedPapers.json";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

interface AcceptedPaperEntry {
  paperId: number;
  paperTitle: string;
  abstract: string;
  primaryContactAuthorName: string;
  primaryContactAuthorEmail: string;
  authors: string;
}

function AbstractCell({ abstract }: { abstract: string }) {
  const [expanded, setExpanded] = useState(false);
  const truncated = abstract.length > 200 ? abstract.slice(0, 200) + "..." : abstract;

  return (
    <div className="max-w-md">
      <p className="text-sm leading-relaxed">
        {expanded ? abstract : truncated}
      </p>
      {abstract.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

const columns: {
  key: keyof AcceptedPaperEntry;
  header: string;
  className?: string;
  render?: (value: AcceptedPaperEntry[keyof AcceptedPaperEntry], row: AcceptedPaperEntry) => React.ReactNode;
}[] = [
  {
    key: "paperId",
    header: "Paper ID",
    className: "w-24 text-center",
  },
  {
    key: "paperTitle",
    header: "Paper Title",
    className: "min-w-[250px] font-medium",
  },
  {
    key: "abstract",
    header: "Abstract",
    className: "min-w-[400px]",
    render: (value) => <AbstractCell abstract={String(value)} />,
  },
  {
    key: "primaryContactAuthorName",
    header: "Primary Contact Author Name",
    className: "min-w-[180px]",
  },
  {
    key: "primaryContactAuthorEmail",
    header: "Primary Contact Author Email",
    className: "min-w-[200px]",
    render: (value) => (
      <a
        href={`mailto:${String(value)}`}
        className="text-primary hover:underline"
      >
        {String(value)}
      </a>
    ),
  },
  {
    key: "authors",
    header: "Authors",
    className: "min-w-[300px]",
  },
];

export default function AcceptedPapers() {
  return (
    <PageLayout
      title="Accepted Papers"
      description="All papers accepted for presentation at ICVGIP 2025"
    >
      <DataTable<AcceptedPaperEntry>
        data={acceptedPapersData}
        columns={columns}
      />
    </PageLayout>
  );
}
