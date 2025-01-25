import { memo } from "react";

const Button: React.FC<{
  handleClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = memo(({ handleClick, children, className }) => {
  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
});
export default Button;
