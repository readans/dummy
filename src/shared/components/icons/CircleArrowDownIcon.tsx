import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> { }

const CircleArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-circle-arrow-down"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M8 12l4 4" />
      <path d="M12 8v8" />
      <path d="M16 12l-4 4" />
    </svg>
  );
};

export default CircleArrowDownIcon;