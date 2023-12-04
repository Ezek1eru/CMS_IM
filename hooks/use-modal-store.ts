import { Grupo, Misionero, User } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'createGrupo'
  | 'editarGrupo'
  | 'crearMisionero'
  | 'editarMisionero'
  | 'añadirMisionero'
  | 'crearUsuario'
  | 'editarUsuario'
  | 'crearInforme'
  | 'editarInforme';

interface ModalData {
  grupo?: Grupo | undefined;
  misionero?: Misionero | undefined;
  usuario?: User | undefined;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
