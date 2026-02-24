import { ProTipProps } from '@/lib/types/layout.type';

export default function ProTip({ type, children }: ProTipProps) {
  const config = {
    tip: {
      icon: "/images/note-icon.svg", 
      borderColor: 'border-[#ff00007a]',
      iconColor: 'text-accent-red',
      bgColor: 'bg-accent-red/10',
      title: 'Pro Tip',
    },
    warning: {
      icon: "/images/warn-icon.svg",
      borderColor: 'border-[#ffb546]',
      iconColor: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10',
      title: 'Warning',
    },
    note: {
      icon: "/images/pro-tip.svg",
      borderColor: 'border-[#49da9a]',
      iconColor: 'text-accent-green',
      bgColor: 'bg-accent-green/10',
      title: 'Note',
    },
  };

  const { icon, borderColor, iconColor, bgColor, title } = config[type];

  return (
    <div className={`pro-tip border ${borderColor} ${bgColor}`}>
      <div className="flex gap-[14px]">
        <div className="flex-shrink-0 mt-0.5">
          <img
            src={icon}
            alt={title}
            className="w-5 h-5"
          />
        </div>

        <div className="flex-1">
          <h4 className={`text-[17px] font-bold leading-[1.29] mb-[13px]`}>{title}</h4>
          <div className="text-base opacity-90 leading-[1.64]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
