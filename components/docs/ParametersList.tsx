import { ParametersListProps } from "@/lib/types/docs.type";

export default function ParametersList({ title, parameters }: ParametersListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <code className="text-base text-[#FF0000] font-semibold">
                  {param.name}
                </code>
                <span className="text-base text-text-muted ml-2">
                  {param.type}
                </span>
              </div>
              <span
                className={`badge text-xs ${
                  param.required ? 'badge-get' : 'bg-surface'
                }`}
              >
                {param.required ? 'Required' : 'Optional'}
              </span>
            </div>
            <span className="text-base opacity-90">{param.description}</span>
            {param.example && (
              <div className="mt-2">
                <span className="text-base text-text-muted">Example: </span>
                <code className="text-base text-accent-green">
                  {param.example}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
