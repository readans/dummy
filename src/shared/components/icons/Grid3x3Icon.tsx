import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Grid3x3Icon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-grid-3x3" {...props}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 8h18" /><path d="M3 16h18" /><path d="M8 3v18" /><path d="M16 3v18" /></svg>
)

export default Grid3x3Icon;
