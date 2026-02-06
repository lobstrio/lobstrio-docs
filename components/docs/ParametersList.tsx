'use client';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface ParametersListProps {
  title: string;
  parameters: Parameter[];
}

export default function ParametersList({ title, parameters }: ParametersListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <code className="text-base text-accent-red font-semibold">
                  {param.name}
                </code>
                <span className="text-sm text-text-muted ml-2">
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
            <span className="text-sm text-text-secondary">{param.description}</span>
            {param.example && (
              <div className="mt-2">
                <span className="text-xs text-text-muted">Example: </span>
                <code className="text-sm text-accent-green">
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
