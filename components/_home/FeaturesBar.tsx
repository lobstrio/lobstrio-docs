import { FEATURES } from "./Home.dto";

export default function FeaturesBar() {
    return (
        <div className="border-y border-[#dde1ee] bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto px-6 md:px-0 py-8">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between items-center gap-6 sm:gap-10">
                    {FEATURES.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-3">
                            <item.icon className="w-5 h-5 text-[#ff0000]" />
                            <span className="text-[18px] font-semibold leading-[1.33]">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
