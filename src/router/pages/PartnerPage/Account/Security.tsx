import { useState } from 'react';
import { ListItem } from '../ListItem';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface Security {
  email: string;
  phone: string | number;
  pass_date_modified: Date | string;
}

interface SecurityProps {
  data: Security;
}

export const Security = ({ data }: SecurityProps) => {
  const [name, setName] = useState('Иванов Сергей Юрьевич');
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone.toString());

  return (
    <div className="flex mt-6">
      <div className="flex flex-col gap-0.5 w-full">
        <ListItem first input name="Имя" value={name} saveValue={setName} />
        <ListItem input verified name="Почта" value={email} saveValue={setEmail} />
        <ListItem input name="Телефон" value={phone} saveValue={setPhone} />
        <ListItem
          modal
          last
          name="Пароль"
          value={format(new Date(data.pass_date_modified), 'PPP', { locale: ru })}
        />
      </div>
    </div>
  );
};
