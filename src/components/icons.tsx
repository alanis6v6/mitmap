import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10v10h16V10" />
      <path d="M3 9 5 4h14l2 5" />
      <path d="M3 9a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.8h.01" />
    </svg>
  );
}

export function HeartIcon(props: IconProps & { filled?: boolean }) {
  const { filled, ...rest } = props;
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...rest}>
      <path d="M12 20s-7.5-4.6-9.8-9.3C.7 7.4 2.3 4 5.7 3.4c2-.3 3.8.6 4.8 2.3l1.5 2.4 1.5-2.4c1-1.7 2.8-2.6 4.8-2.3 3.4.6 5 4 3.5 7.3C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4.5h11.5l-2 3.5 2 3.5H5" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function DesktopIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16.5V20" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m14.5 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9.5 5 7 7-7 7" />
    </svg>
  );
}

export function LocateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="2.3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
    </svg>
  );
}

export function PanelRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M15.5 4.5v15" />
    </svg>
  );
}

export function PlusCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function SearchSmallIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}
