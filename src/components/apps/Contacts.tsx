import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const contacts = [
  { name: 'Анна Иванова', phone: '+7 (999) 123-45-67' },
  { name: 'Борис Петров', phone: '+7 (999) 234-56-78' },
  { name: 'Виктория Сидорова', phone: '+7 (999) 345-67-89' },
  { name: 'Дмитрий Козлов', phone: '+7 (999) 456-78-90' },
  { name: 'Елена Морозова', phone: '+7 (999) 567-89-01' },
];

export default function Contacts() {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 bg-white space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Контакты</h2>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить
          </Button>
        </div>
        <Input placeholder="Поиск контактов..." />
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {contact.name[0]}
              </div>
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={18} className="text-green-600" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
