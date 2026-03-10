import { ParametersListProps } from "@/lib/types/docs.type";

export default function ParametersList({ title, parameters }: ParametersListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
      <div>
        {parameters.map((param, index) => (
          <div
            key={index}
            className={`border-t border-[#dde1ee] py-[30px] ${index === parameters.length - 1 ? ' border-b' : ''}`}
          >
            <div className="flex items-start gap-2.5 leading-1.31 mb-3.5">
              <div className="flex items-center">
                <span className="text-base leading-[1.31] text-[#FF0000] font-bold">
                  {param.name}
                </span>
                {param.type && (
                  <span className="badge-label border border-[#dee0ea] bg-[#fff] ml-3.5">
                    {param.type}
                  </span>
                )}
              </div>
              <span
                className={`badge-label ${
                  param.required ? 'badge-get' : 'badge-post'
                }`}
              >
                {param.required ? 'Required' : 'Optional'}
              </span>
            </div>
            <span className="text-base leading-[1.31]">{param.description}</span>
            {param.example && (
              <div className="mt-6.5 flex items-center">
                <span className="text-base leading-[1.31] opacity-60 mr-3.5">Example: </span>
                <span className="inline-block w-full text-base leading-[1.19] border border-[#dde1ee] bg-[#fbfcfd] px-3.5 py-2.5 rounded-[8px]">
                  {param.example === `""` ? param.example : param.example.replaceAll(`"`, "")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
