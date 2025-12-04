import { PageLayout } from "@/components/PageLayout";
import acceptedPapersData from "@/data/acceptedPapers.json";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Mail, User, Search } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AcceptedPaperEntry {
  paperId: number;
  paperTitle: string;
  abstract: string;
  primaryContactAuthorName: string;
  primaryContactAuthorEmail: string;
  authors: string;
}

function ExpandableCard({ row, columns }: { row: AcceptedPaperEntry; columns: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Paper ID:</span>
              <span className="text-sm font-medium text-foreground">{row.paperId}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{row.paperTitle}</h3>
            </div>
            <div>
              <p className="text-xs text-muted-foreground line-clamp-2">{row.abstract}</p>
            </div>
          </div>
          <button className="text-primary hover:text-primary/80 ml-4">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Abstract
            </h4>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {row.abstract}
            </p>
          </div>
          <div className="space-y-3 pt-4 border-t border-border">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Primary Contact Author
              </h4>
              <p className="text-sm text-foreground">{row.primaryContactAuthorName}</p>
              {row.primaryContactAuthorEmail && (
                <a
                  href={`mailto:${row.primaryContactAuthorEmail}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="h-3 w-3" />
                  {row.primaryContactAuthorEmail}
                </a>
              )}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                All Authors
              </h4>
              <p className="text-sm text-foreground">{row.authors}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExpandableRow({ row, columns }: { row: AcceptedPaperEntry; columns: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        className={cn(
          "transition-colors hover:bg-muted/50 cursor-pointer",
          "bg-card"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {columns.map((column) => {
          if (column.key === "abstract") {
            return (
              <td
                key={String(column.key)}
                className={cn("px-4 py-3 text-sm text-foreground", column.className)}
              >
                <div className="max-w-md">
                  <p className="text-sm leading-relaxed line-clamp-2">
                    {row.abstract}
                  </p>
                </div>
              </td>
            );
          }
          return (
            <td
              key={String(column.key)}
              className={cn("px-4 py-3 text-sm text-foreground", column.className)}
            >
              {column.render
                ? column.render(row[column.key], row)
                : String(row[column.key] ?? "")}
            </td>
          );
        })}
        <td className="px-4 py-3">
          <button className="text-primary hover:text-primary/80">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-muted/30">
          <td colSpan={columns.length + 1} className="px-4 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Abstract
                </h4>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {row.abstract}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Primary Contact Author
                  </h4>
                  <p className="text-sm text-foreground">{row.primaryContactAuthorName}</p>
                  {row.primaryContactAuthorEmail && (
                    <a
                      href={`mailto:${row.primaryContactAuthorEmail}`}
                      className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                    >
                      <Mail className="h-3 w-3" />
                      {row.primaryContactAuthorEmail}
                    </a>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    All Authors
                  </h4>
                  <p className="text-sm text-foreground">{row.authors}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
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
      value ? (
        <a
          href={`mailto:${String(value)}`}
          className="text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {String(value)}
        </a>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    ),
  },
  {
    key: "authors",
    header: "Authors",
    className: "min-w-[300px]",
  },
];

export default function AcceptedPapers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return acceptedPapersData;

    const query = searchQuery.toLowerCase();
    return acceptedPapersData.filter((row) => {
      return (
        String(row.paperId).toLowerCase().includes(query) ||
        row.paperTitle.toLowerCase().includes(query) ||
        row.abstract.toLowerCase().includes(query) ||
        row.primaryContactAuthorName.toLowerCase().includes(query) ||
        (row.primaryContactAuthorEmail && row.primaryContactAuthorEmail.toLowerCase().includes(query)) ||
        row.authors.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <PageLayout
      title="Accepted Papers"
      description="All papers accepted for presentation at ICVGIP 2025. Click on any row to expand and view full details."
    >
      <div className="w-full">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block w-full overflow-x-auto rounded-lg border border-border shadow-sm">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-border bg-primary">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-semibold text-primary-foreground whitespace-nowrap",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
                <th className="w-12 px-4 py-3 text-left text-sm font-semibold text-primary-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((row, rowIndex) => (
                <ExpandableRow key={rowIndex} row={row} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredData.map((row, rowIndex) => (
            <ExpandableCard key={rowIndex} row={row} columns={columns} />
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {filteredData.length} of {acceptedPapersData.length} {acceptedPapersData.length === 1 ? "entry" : "entries"}
          {searchQuery && ` (filtered)`}
        </p>
      </div>
    </PageLayout>
  );
}
