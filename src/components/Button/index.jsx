import { Button } from '../ui/button';

export const ButtonComponent = ({ title, handleClick, isDisabled, type, className, sizeButton }) => {
  return (
    <Button onClick={handleClick} disabled={isDisabled} variant={type} className={className} size={sizeButton}>
      {title}
    </Button>
  );
};
