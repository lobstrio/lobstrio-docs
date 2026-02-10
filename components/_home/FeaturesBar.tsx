import { FEATURES } from "./Home.dto";

export default function FeaturesBar() {
    return (
        <div className="border-y border-border bg-surface/50">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {FEATURES.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <item.icon className="w-5 h-5 text-accent-red flex-shrink-0" />
                            <span className="text-sm text-text-secondary">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
