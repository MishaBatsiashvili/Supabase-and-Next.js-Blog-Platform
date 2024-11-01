import { FieldError } from "react-hook-form";

const FieldErrorItem: React.FC<{
  error: FieldError | undefined;
  className?: string;
}> = ({ error, className }) => {
  if (!error) {
    return <></>;
  }

  return (
    <div className={`text-sm text-red-400 ${className}`}>{error.message}</div>
  );
};

export default FieldErrorItem;
