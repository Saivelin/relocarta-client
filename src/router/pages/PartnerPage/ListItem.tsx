import cn from 'classnames';
import { Button } from '../../../components/Button/Button';
import { useState } from 'react';
import { DownOutlined, CheckCircleFilled } from '@ant-design/icons';

interface ItemProps {
  first?: boolean;
  last?: boolean;
  name: string;
  value: string;
  edit?: boolean;
  select?: boolean;
  input?: boolean;
  saveValue?: (value: string) => void;
  options?: string[];
  close?: () => void;
  verified?: boolean;
  modal?: boolean;
}

export const ListItem = ({
  first = false,
  last = false,
  name,
  value,
  edit = false,
  input = false,
  select = false,
  saveValue,
  options,
  verified = false,
  modal = false,
}: ItemProps) => {
  const [editable, setEditable] = useState(edit);
  const [inputValue, setInputValue] = useState(value);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const isView = !input && !select && !modal;

  return (
    <div
      className={cn(
        'p-5 bg-gray-50 text-base text-gray-500 flex justify-between items-center gap-8',
        {
          ['rounded-tl-lg rounded-tr-lg']: first,
          ['rounded-bl-lg rounded-br-lg']: last,
        },
      )}
    >
      {!editable && (
        <>
          <span>{name}</span>

          <div className="flex items-center gap-6">
            <div>
              <span>{value}</span>
              {verified && <CheckCircleFilled className="text-accent ml-2" />}
            </div>
            {!isView && (
              <Button
                clearGray
                onClick={() => {
                  modal ? console.log('Открыть модальное окно') : setEditable(true);
                }}
              >
                Изменить
              </Button>
            )}
          </div>
        </>
      )}
      {editable && (
        <>
          {!select && (
            <input
              autoFocus
              type="text"
              className="text-base bg-transparent outline-none w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          {select && options && (
            <div
              className="relative w-full"
              onClick={() => setOptionsVisible((state) => !state)}
            >
              <input
                type="text"
                className="text-base bg-white outline-none w-full p-1 cursor-pointer"
                value={inputValue}
                disabled
              />
              <DownOutlined className="absolute top-2 right-3 text-sm text-gray-300 cursor-pointer" />

              {optionsVisible && (
                <div className="absolute top-[33px] left-0 shadow w-full bg-white z-10">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      className="p-2 cursor-pointer hover:bg-primary-light hover:text-primary"
                      onClick={() => {
                        setInputValue(opt);
                        if (saveValue) saveValue(opt);
                        setEditable(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            {!select && (
              <Button
                primary
                noBorder
                notRounded
                className="max-h-7 p-2"
                onClick={() => {
                  if (saveValue) saveValue(inputValue);
                  setEditable(false);
                }}
              >
                Подтвердить
              </Button>
            )}
            <span
              className="cursor-pointer hover:text-primary"
              onClick={() => setEditable(false)}
            >
              Отмена
            </span>
          </div>
        </>
      )}
    </div>
  );
};
