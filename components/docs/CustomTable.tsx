import { CustomTableProps } from "@/lib/types/docs.type";

function WithTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group inline-flex cursor-pointer">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-[12px] font-normal leading-[1.33] tracking-normal px-[10px] pt-[2px] pb-[5px] rounded-[4px] shadow-[0_1px_5px_0_rgba(10,37,64,0.12)] border border-[#dee0ea] bg-white text-inherit">
        {label}
      </span>
    </div>
  );
}

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
              {(() => {
                const INLINE_KEYS = ['type', 'required'];
                const renderValue = (col: typeof columns[0], value: typeof row[string]) => {
                  if (col.key === 'required') {
                    return <div className="badge-label badge-get text-base leading-[1.31]">{value === 'Yes' ? 'Required' : value}</div>;
                  }
                  const isHighlighted = typeof value === 'string' && value.startsWith('**');
                  const div = (
                    <div className={`${col.key === 'type' ? 'badge-label border border-[#dee0ea] bg-white rounded-[7px] ' : col.key === 'default' ? 'badge-label border border-[#dee0ea] bg-[#f2f5f9] rounded-[7px] ' : ''}text-base leading-[1.31] min-w-0 break-words${col.semibold ? ' font-semibold' : ''}`}>
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
                          if (value.includes('`')) {
                            const parts = value.split(/(`[^`]+`)/g);
                            return <>{parts.map((part, i) =>
                              part.startsWith('`') && part.endsWith('`')
                                ? <span key={i} className="badge-label border border-[#dee0ea] bg-[#f2f5f9] rounded-[7px] text-base leading-[1.31]">{part.slice(1, -1)}</span>
                                : part
                            )}</>;
                          }
                        }
                        return value;
                      })()}
                    </div>
                  );
                  return col.key === 'default'
                    ? <WithTooltip label="Default">{div}</WithTooltip>
                    : div;
                };

                const hasInlineCols = columns.some(c => INLINE_KEYS.includes(c.key));

                if (!hasInlineCols) {
                  return columns.map((col, colIndex) => (
                    <div key={colIndex} className="flex gap-2 flex-wrap lg:flex-nowrap">
                      {colIndex !== 0 && (
                        <div className="text-base leading-[1.31] font-semibold opacity-60 uppercase tracking-wider mb-[5px]">
                          {col.header}:
                        </div>
                      )}
                      {renderValue(col, row[col.key])}
                    </div>
                  ));
                }

                const firstCol = columns[0];
                const inlineCols = columns.filter(c => INLINE_KEYS.includes(c.key));
                const blockCols = columns.filter(c => c.key !== firstCol.key && !INLINE_KEYS.includes(c.key));

                return (
                  <>
                    <div className="flex gap-3 flex-wrap items-center">
                      {renderValue(firstCol, row[firstCol.key])}
                      {inlineCols.map((col, i) => (
                        <div key={i}>{renderValue(col, row[col.key])}</div>
                      ))}
                    </div>
                    {blockCols.map((col, i) => (
                      <div key={i} className="flex gap-2 flex-wrap lg:flex-nowrap">
                        {col.key === 'description' && (
                          <div className="text-base leading-[1.31] font-semibold opacity-60 uppercase tracking-wider mb-[5px]">
                            {col.header}:
                          </div>
                        )}
                        {renderValue(col, row[col.key])}
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
