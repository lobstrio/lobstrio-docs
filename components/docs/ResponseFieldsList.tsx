import { ResponseFieldsListProps } from "@/lib/types/docs.type";

export default function ResponseFieldsList({ title, fields }: ResponseFieldsListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <code className="text-base text-accent-red font-semibold">
                  {field.path}
                </code>
                {field.type && (
                  <span className="text-base text-text-muted ml-2">
                    {field.type}
                  </span>
                )}
              </div>
            </div>
            <span className="text-base text-text-secondary">{field.description}</span>
            {field.example && (
              <div className="mt-3">
                <span className="text-base text-text-muted">Example: </span>
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
