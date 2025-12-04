import { cn } from "@/lib/utils";
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Column<T> {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  searchable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function DataTable<T>({
  data,
  columns,
  title,
  description,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((row) => {
      return columns.some((column) => {
        if (column.searchable === false) return false;
        const value = row[column.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, columns]);

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>
      )}

      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}
      
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
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "transition-colors hover:bg-muted/50",
                  rowIndex % 2 === 0 ? "bg-card" : "bg-card/80"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-sm text-foreground",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {columns.map((column) => (
              <div
                key={String(column.key)}
                className={cn(
                  "mb-3 last:mb-0",
                  column.key === columns[0].key && "border-b border-border pb-3 mb-3"
                )}
              >
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  {column.header}
                </div>
                <div className="text-sm text-foreground">
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? "")}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} {data.length === 1 ? "entry" : "entries"}
        {searchQuery && ` (filtered)`}
      </p>
    </div>
  );
}
