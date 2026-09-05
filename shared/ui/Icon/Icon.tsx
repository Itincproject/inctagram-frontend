type IconProps = {
  name: string; 
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 24, className }: IconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      className={className} 
      fill="currentColor" 
      aria-hidden="true"
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};