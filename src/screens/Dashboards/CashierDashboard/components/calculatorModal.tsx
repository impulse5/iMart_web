import { useState, useRef, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/ui/Button/button";

const CalculatorModal = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: (open: boolean) => void }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (value: string) => {
    const operators = ['+', '-', '*', '/', '%', '.'];
  
    if (operators.includes(value)) {
      if (input === '' && result !== '') {
        setInput(result + value);
        setResult('');
      } else if (input === '' || operators.includes(input.slice(-1))) {
        setInput(prevInput => prevInput.slice(0, -1) + value);
      } else {
        setInput(prevInput => prevInput + value);
      }
    } else if (value === '=') {
      try {
        const sanitizedInput = input.replace(/[^0-9+\-*/.%]/g, '');
        const calcResult = evaluate(sanitizedInput).toString();
        setResult(calcResult);
        setInput('');
      } catch (error) {
        setResult('Erro');
      }
    } else if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === 'C') {
      setInput(prevInput => prevInput.slice(0, -1));
    } else {
      if (input === '' && result !== '') {
        setInput(value);
        setResult('');
      } else {
        setInput(prevInput => {
          if (value === '0' && prevInput === '') {
            return prevInput;
          }
          if (value === '0' && prevInput.endsWith('.')) {
            return prevInput + '0';
          }
          if (value === '0' && prevInput.split(/[\+\-\*\/\%\=]/).pop()?.length === 0) {
            return prevInput;
          }
          return prevInput + value;
        });
      }
    }
  };
  

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (!isOpen) return;
  
    if (!isNaN(Number(key)) || ['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape', '%', '.', 'Delete'].includes(key)) {
      event.preventDefault();
  
      if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        handleButtonClick('C');
      } else if (key === 'Delete') {
        handleButtonClick('AC');
      } else {
        handleButtonClick(key);
      }
    }
  };
  

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, isOpen]);

  return (
    // @ts-ignore
    <Dialog open={isOpen} onOpenChange={setOpen} ref={dialogRef} tabIndex={0}>
      <DialogContent className="bg-neutral-900 text-white p-6">
        <div className="calculator bg-black p-4 rounded-md w-[340px] mx-auto shadow-lg">
          <div className="text-right text-white text-xl mb-4">
            <div className='py-8'>{input}</div>
            <div className="text-3xl font-semibold">{result}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {['AC', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((symbol) => {
              let buttonClass = "bg-neutral-800 text-white";
              if (['+', '-', '*', '/', '='].includes(symbol)) {
                buttonClass = "bg-neutral-500 text-white";
              } else if (symbol === 'AC') {
                buttonClass = "bg-neutral-300 text-black";
              }

              return (
                <Button
                  key={symbol}
                  variant="secondary"
                  className={`${buttonClass} p-4 py-8 text-xl rounded-md shadow-md ${symbol === '0' ? 'col-span-2' : ''}`}
                  onClick={() => handleButtonClick(symbol)}
                >
                  {symbol}
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
