import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect = ({ route }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route, { replace: true });
  });

  return <></>;
};
