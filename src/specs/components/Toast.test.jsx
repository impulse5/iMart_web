import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import TestComponents from '../../screens/TestComponents';
import { positionTranslate } from '../../components/ui/Toast/positionTranslate';
import { Toaster } from '../../components/ui/Toast/toaster';

test('display a notification when clicking the button "Abrir notificação"', () => {
    const { getByText} = render(<TestComponents />); 
    const openNotificationButton = getByText('Abrir notificação'); 
    fireEvent.click(openNotificationButton); 
  
    const notificationTitle = getByText('Notificação');
    const notificationDescription = getByText('Esta é uma notificação de teste');
  
    expect(notificationTitle).toBeInTheDocument(); 
    expect(notificationDescription).toBeInTheDocument();
  });
  test('Toaster renders with correct position', () => {
    const position = 'down-left';  
    render(<Toaster position={position} />);
    const viewportElement = screen.getByTestId('toast-viewport');
    expect(viewportElement).toHaveClass(positionTranslate[position]);
  });