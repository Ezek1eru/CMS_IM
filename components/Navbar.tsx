'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import MainNav from '@/components/MainNav';

import { Globe2, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Globe2 className="h-8 w-8" />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="outline">
                {session?.user?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
