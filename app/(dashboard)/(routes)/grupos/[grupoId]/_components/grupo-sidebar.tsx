'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type GrupoSidebarProps = {
  name: string;
};

const GrupoSidebar = ({ name }: GrupoSidebarProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <div className="p-4">
        <Button
          className="text-rose-600 cursor-pointer"
          variant="outline"
          onClick={() => router.push(`/grupos/${params.grupoId}`)}
        >
          Grupo: {name}
        </Button>
      </div>
      <Separator className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <ScrollArea className="flex-1 px-3">
        <div className="flex items-start space-x-6 m-2">
          <div className="flex flex-col h-full space-y-5">
            <Link
              className={cn(
                'text-xl text-muted-foreground font-medium transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/misioneros`}

            >
              Misioneros
            </Link>
            <Link
              className={cn(
                'text-xl font-medium text-muted-foreground transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/salidas`}
            >
              Salidas
            </Link>
            <Link
              className={cn(
                'text-xl font-medium text-muted-foreground transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/`}
            >
              Usuarios
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GrupoSidebar;
