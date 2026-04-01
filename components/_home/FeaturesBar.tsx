import Image from "next/image";
import { ComponentType } from "react";
import { FEATURES } from "./Home.dto";

type FeatureItem = {
    icon?: ComponentType<{ className?: string }>;
    iconSrc?: string;
    text: string;
};

type FeaturesBarProps = {
    features?: FeatureItem[];
};

export default function FeaturesBar({ features = FEATURES }: FeaturesBarProps) {
    return (
        <div className="border-y border-[#dde1ee] bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto px-6 md:px-0 py-8">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between items-center gap-6 sm:gap-10">
                    {features.map((item, i) => (
                        <div key={i} className="flex items-center justify-start gap-3">
                            {item.iconSrc
                                ? <Image src={item.iconSrc} alt="" className="w-6 h-6" width={24} height={24} />
                                : item.icon && <item.icon className="w-6 h-6 text-[#ff0000]" />
                            }
                            <span className="text-xl font-bold leading-[1.33]">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
