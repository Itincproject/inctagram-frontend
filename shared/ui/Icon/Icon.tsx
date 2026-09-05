type IconProps = {
  name: string; 
  size?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const Icon = ({ name, size = 24, className, 'aria-hidden': ariaHidden = true }: IconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="currentColor" 
      aria-hidden={ariaHidden}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
