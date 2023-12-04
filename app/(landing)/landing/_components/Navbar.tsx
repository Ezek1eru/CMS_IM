import { Globe2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <div className="flex w-full justify-between ">
      <Link href="/landing">
        <Globe2 className="h-8 w-8 mt-4" />
      </Link>
      <Link href="/api/auth/signin">
        <Button className="mt-4" variant="destructive">
          Ingresar
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
