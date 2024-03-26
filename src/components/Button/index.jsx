import { Button } from '../ui/button';

export const ButtonComponent = ({ title, handleClick, isDisabled, type, classType, sizeButton }) => {
  return (
    <Button onClick={handleClick} disabled={isDisabled} variant={type} className={classType} size={sizeButton}>
      {title}
    </Button>
  );
};
