interface EventType {
  event: string;
  description: string;
  trigger: string;
}

interface EventTypesListProps {
  title: string;
  events: EventType[];
}

export default function EventTypesList({ title, events }: EventTypesListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <code className="text-base text-accent-red font-semibold">
                {event.event}
              </code>
            </div>
            <span className="text-sm text-text-secondary mb-2">
              {event.description}
            </span>
            <div className="mt-2 pt-2 border-t border-border">
              <span className="text-xs text-text-muted">Trigger: </span>
              <span className="text-sm text-text-secondary">
                {event.trigger}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
