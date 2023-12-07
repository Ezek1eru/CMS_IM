import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
  lugar: z.string().min(2),
  fecha: z.date(),
});

type ModalType = 'crearUsuario' | 'crearSalida';

export const CreateSalidaModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && (type as ModalType) === 'crearSalida';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lugar: '',
      fecha: new Date().toISOString().substr(0, 10), // Establecer fecha por defecto (hoy)
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/salidas`, values);

      form.reset();
      router.reload();
      toast.success('Salida creada correctamente');
      onClose();
    } catch (error) {
      toast.error('Algo ha ido mal.');
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-5xl">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crear Salida
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full py-8">
            <div className="grid grid-cols-1 gap-8 px-10">
              <FormField
                control={form.control}
                name="lugar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lugar</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Lugar de la salida"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        disabled={isLoading}
                        placeholder="Fecha de la salida"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading} className="ml-auto" type="submit">
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
