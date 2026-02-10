import { CustomTableProps } from "@/lib/types/docs.type";

export default function CustomTable({ title, columns, rows }: CustomTableProps) {
  return (
    <div className="mb-8">
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="grid gap-4">
              {columns.map((col, colIndex) => {
                const value = row[col.key];
                const isHighlighted = typeof value === 'string' && value.startsWith('**');
                return (
                  <div key={colIndex}>
                    <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                      {col.header}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {isHighlighted ? (
                        <code className="text-accent-red font-semibold">
                          {(value as string).replace(/\*\*/g, '')}
                        </code>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
