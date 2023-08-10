'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grupo } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(2),
});

type GrupoFormValues = z.infer<typeof formSchema>;

interface GrupoFormProps {
  initialData: Grupo | null;
}

export const GrupoForm: React.FC<GrupoFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? 'Edita el grupo misionero'
    : 'Crea un nuevo grupo misionero';
  const description = initialData
    ? 'Edita el grupo misionero'
    : 'Crea un nuevo grupo misionero';
  const toastMessage = initialData ? 'Grupo actualizado.' : 'Grupo creado.';
  const action = initialData ? 'Guardar cambios' : 'Crear';

  const form = useForm<GrupoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit = async (data: GrupoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/grupos/${params.grupoId}`, data);
      } else {
        await axios.post(`/api/grupos`, data);
      }
      router.refresh();
      router.push(`/grupos`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Algo ha ido mal.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/grupos/${params.grupoId}`);
      router.refresh();
      router.push('/grupos');
      toast.success('Grupo eliminado.');
    } catch (error) {
      toast.error('Aegurate de haber borrado todos los misioneros primero.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del Grupo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
