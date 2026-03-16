import { ResponseFieldsListProps } from "@/lib/types/docs.type";

export default function ResponseFieldsList({ title, fields }: ResponseFieldsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-7.5">{title}</h2>
      <div>
        {fields.map((field, index) => (
          <div
            key={index}
            className={`border-t border-[#dde1ee] py-[30px] ${index === fields.length - 1 ? ' border-b' : ''}`}
          >
            <div className="flex items-start gap-2.5 leading-1.31 mb-3.5">
              <div className="flex items-center">
                <span className="text-base leading-[1.31] text-[#FF0000] font-bold">
                  {field.path}
                </span>
                {field.type && (
                  <div className="flex items-center gap-1.5 ml-3.5">
                    {field.type.split("|").map((t, i) => (
                      <span key={i} className="badge-label border border-[#dee0ea] bg-[#fff]">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span className="text-base leading-[1.31]">{field.description}</span>
            {field.example && (
              <div className="mt-4.5 flex items-center">
                <span className="text-base leading-[1.31] opacity-60 mr-3.5">Example: </span>
                <span className="inline-block w-full text-base leading-[1.19] border border-[#dde1ee] bg-[#fbfcfd] px-3.5 py-2.5 rounded-[8px]">
                  {field.example === `""` ? field.example : field.example.replaceAll(`"`, "")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
