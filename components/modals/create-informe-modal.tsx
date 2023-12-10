'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
  name: z.string().min(2),
  descripcion: z.string().min(2),
  fecha: z.date({
    required_error: 'La fecha es requerida',
  }),
  grupoId: z.string(),
});

export const CrearInformeModal = () => {
  const { grupoId } = useParams();
  const router = useRouter();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === 'crearInforme';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      descripcion: '',
      fecha: null,
      grupoId: grupoId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/informes`, values);

      form.reset();

      router.refresh();
      toast.success('Informe creado correctamente.');
      onClose();
    } catch (error: any) {
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
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-3xl">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crea un nuevo informe
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Cuenta como ha ido la actividad misionera
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full py-8 px-6"
          >
            <div className="flex justify-between">
              <div className="flex-1 flex-col pr-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-xs"
                          disabled={isLoading}
                          placeholder="titulo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder="Como ha ido"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha del informe</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
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
