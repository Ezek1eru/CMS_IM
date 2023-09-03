'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Misionero } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SelectValue } from '@radix-ui/react-select';

const formSchema = z.object({
  name: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  numeroAlumno: z.string().min(2),
  edad: z.string().min(2).optional(),
  tipoDocumento: z.string().min(2),
  numeroDocumento: z.string().min(2),
  carrera: z.string().min(2),
  numeroTelefono: z.string().min(2).optional(),
});

type MisioneroFormValues = z.infer<typeof formSchema>;

interface MisioneroFormProps {
  initialData: Misionero | null;
}

export const MisioneroForm: React.FC<MisioneroFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edita al misionero' : 'Crea un nuevo misionero';
  const description = initialData
    ? 'Edita al misionero'
    : 'Crea un nuevo misionero';
  const toastMessage = initialData
    ? 'Misionero actualizado.'
    : 'Misionero creado.';
  const action = initialData ? 'Guardar cambios' : 'Crear';

  const form = useForm<MisioneroFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      apellido: '',
      email: '',
      numeroAlumno: '',
      edad: '',
      tipoDocumento: '',
      numeroDocumento: '',
      carrera: '',
      numeroTelefono: '',
    },
  });

  const onSubmit = async (data: MisioneroFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/misioneros/${params.misioneroId}`, data);
      } else {
        await axios.post(`/api/misioneros`, data);
      }
      router.refresh();
      router.push(`/misioneros`);
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
      await axios.delete(`/api/misioneros/${params.misioneroId}`);
      router.refresh();
      router.push('/misioneros');
      toast.success('Misionero eliminado.');
    } catch (error) {
      toast.error('Algo ha ido mal.');
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
                  <FormLabel>Misionero</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Apellido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="email@uap.edu.ar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numeroAlumno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº Alumno</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Número de alumno"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Edad del misionero"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona un tipo de documento"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº Documento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Número de documento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carrera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carrera</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Qué carrera estudia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numeroTelefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº Telefono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="+xx xxx xxx xxxx"
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
