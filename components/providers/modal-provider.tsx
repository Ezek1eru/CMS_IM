'use client';

import { useEffect, useState } from 'react';

import { AñadirMisionero } from '@/components/modals/añadir-misionero-modal';
import { CreateGrupoModal } from '@/components/modals/create-grupo-modal';
import { CrearInformeModal } from '@/components/modals/create-informe-modal';
import { CreateMisioneroModal } from '@/components/modals/create-misionero-modal';
import { CrearUsuarioModal } from '@/components/modals/create-usuario-modal';
import { EditGrupoModal } from '@/components/modals/edit-grupo-modal';
import { EditarUsuarioModal } from '@/components/modals/edit-usuario-modal';
import { EditarInformeModal } from '@/components/modals/editar-informe-modal';
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
      <CrearUsuarioModal />
      <EditarUsuarioModal />
      <CrearInformeModal />
      <EditarInformeModal />
    </>
  );
};
