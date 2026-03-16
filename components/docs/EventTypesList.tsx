import { EventTypesListProps } from "@/lib/types/docs.type";

export default function EventTypesList({ title, events }: EventTypesListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-7.5">{title}</h2>
      <div>
        {events.map((event, index) => (
          <div
            key={index}
            className={`border-t border-[#dde1ee] py-[30px]${index === events.length - 1 ? ' border-b' : ''}`}
          >
            <div className="flex items-start justify-between leading-1.31 mb-3.5">
              <span className="text-base leading-[1.31] text-[#FF0000] font-bold">
                {event.event}
              </span>
            </div>
            <span className="text-base leading-[1.31]">
              {event.description}
            </span>
            <div className="mt-4.5 flex items-center">
              <span className="text-base leading-[1.31] opacity-60 mr-3.5">Trigger: </span>
              <span className="inline-block w-full text-base leading-[1.19] border border-[#dde1ee] bg-[#fbfcfd] px-3.5 py-2.5 rounded-[8px]">
                {event.trigger}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
