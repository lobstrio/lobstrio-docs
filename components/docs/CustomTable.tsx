import { CustomTableProps } from "@/lib/types/docs.type";

export default function CustomTable({ title, columns, rows }: CustomTableProps) {
  return (
    <div className="mb-8">
      {title && <h2 className="text-3xl leading-[1.33] font-bold mb-7.5 ">{title}</h2>}
      <div>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`border-t border-[#dde1ee] py-[30px]${rowIndex === rows.length - 1 ? ' border-b' : ''}`}
          >
            <div className="grid gap-3">
              {columns.map((col, colIndex) => {
                const value = row[col.key];
                const isHighlighted = typeof value === 'string' && value.startsWith('**');
                return (
                  <div key={colIndex} className="flex gap-2">
                    {colIndex !== 0 && (
                      <div className="text-base leading-[1.31] font-semibold opacity-60 uppercase tracking-wider mb-[5px]">
                        {col.header}:
                      </div>
                    )}
                    <div className={`text-base leading-[1.31] whitespace-nowrap ${col.semibold ? ' font-semibold' : ''}`}>
                      {isHighlighted ? (
                        <span className="text-[#ff0000] text-base leading-[1.31] font-bold uppercase">
                          {((v) => v.trim() || v)((value as string).replace(/\*\*/g, ''))}
                        </span>
                      ) : (() => {
                        if (typeof value === 'string') {
                          const match = value.match(/^(\d+)(.+)$/);
                          if (match) {
                            return <><span className="font-semibold">{match[1]}</span>{match[2]}</>;
                          }
                        }
                        return value;
                      })()}
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
