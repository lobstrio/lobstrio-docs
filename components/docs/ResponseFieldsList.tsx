import { ResponseFieldsListProps } from "@/lib/types/docs.type";

export default function ResponseFieldsList({ title, fields }: ResponseFieldsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between leading-1.31 mb-3.5">
              <div className="flex items-center">
                <code className="text-base text-[#FF0000] font-semibold">
                  {field.path}
                </code>
                {field.type && (
                  <span className="text-base text-[#71717a] ml-[13px]">
                    {field.type}
                  </span>
                )}
              </div>
            </div>
            <span className="text-base opacity-90 leading-[1.31]">{field.description}</span>
            {field.example && (
              <div className="mt-3">
                <span className="text-base text-[#71717a]">Example: </span>
                <code className="text-base text-accent-green">
                  {field.example}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
