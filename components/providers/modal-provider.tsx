'use client';

import { useEffect, useState } from 'react';

import { CreateGrupoModal } from '@/components/modals/create-grupo-modal';
import { EditGrupoModal } from '@/components/modals/edit-grupo-modal';

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
    </>
  );
};
