import { cn } from "@/lib/utils";
import React from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  description?: string;
}

export function DataTable<T>({
  data,
  columns,
  title,
  description,
}: DataTableProps<T>) {
  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
          {description && <p className="mt-1 text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="w-full overflow-x-auto rounded-lg border border-border shadow-sm">
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
            {data.map((row, rowIndex) => (
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
      
      <p className="mt-4 text-sm text-muted-foreground">
        Showing {data.length} {data.length === 1 ? "entry" : "entries"}
      </p>
    </div>
  );
}
