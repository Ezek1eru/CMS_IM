'use client';

import { useEffect, useState } from 'react';

import { AñadirMisionero } from '@/components/modals/añadir-misionero-modal';
import { CreateGrupoModal } from '@/components/modals/create-grupo-modal';
import { CreateMisioneroModal } from '@/components/modals/create-misionero-modal';
import { EditGrupoModal } from '@/components/modals/edit-grupo-modal';
import { EditarMisioneroModal } from '@/components/modals/editar-misionero-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateGrupoModal />
      <EditGrupoModal />
      <CreateMisioneroModal />
      <EditarMisioneroModal />
      <AñadirMisionero />
    </>
  );
};
