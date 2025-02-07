import React from "react";

interface ExclamationMarkIconProps extends React.SVGProps<SVGSVGElement> { }

const ExclamationMarkIcon: React.FC<ExclamationMarkIconProps> = (props) => {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-mark"
      {...props} // Permite personalización
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 19v.01" />
      <path d="M12 15v-10" />
    </svg>
  );
};

export default ExclamationMarkIcon;
