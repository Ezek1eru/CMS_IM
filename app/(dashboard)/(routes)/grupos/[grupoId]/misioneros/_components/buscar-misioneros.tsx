'use client';

import { useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import prismadb from '@/lib/prismadb';
import { Plus } from 'lucide-react';

const BuscarMisinoeros = () => {
  const [misioneros, setMisioneros] = useState([]);

  useEffect(() => {
    const fetchMisioneros = async () => {
      const response = await fetch('/api/misioneros');
      const data = await response.json();

      setMisioneros(data);
    };

    fetchMisioneros();
  }, []);

  return (
    <Command className="p-4 rounded-lg">
      <CommandInput
        className="border rounded p-2"
        placeholder="Busca un misionero"
      />
      <CommandList className="mt-4">
        <CommandEmpty className="text-red-500">No se encuentran</CommandEmpty>
        {misioneros.map((misionero) => (
          <CommandItem
            key={misionero.id}
            onClick={() => {}}
            className="flex justify-between cursor-pointer p-2 rounded"
          >
            {misionero.name} {misionero.apellido}
            <Plus className="h-4 w-4" />
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
export default BuscarMisinoeros;
