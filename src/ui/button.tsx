import { memo } from "react";

const Button: React.FC<{
  handleClick: () => void;
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
}> = memo(({ handleClick, children, className, isDisabled }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={isDisabled ? `${className} disabled` : className}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
});
export default Button;
