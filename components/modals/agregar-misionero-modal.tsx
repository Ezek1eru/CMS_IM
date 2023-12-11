'use client';

import { useRouter } from 'next/navigation';

import BuscarMisinoeros from '@/app/(dashboard)/(routes)/grupos/[grupoId]/misioneros/_components/buscar-misioneros';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';

export const AgregarMisioneroModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'agregarMisionero';

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Busca Misioneros
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Selecciona el misionero que quieres añadir al grupo
          </DialogDescription>
        </DialogHeader>
        <BuscarMisinoeros />
      </DialogContent>
    </Dialog>
  );
};
