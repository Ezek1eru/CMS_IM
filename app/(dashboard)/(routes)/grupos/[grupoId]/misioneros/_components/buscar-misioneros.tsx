import axios from 'axios';
import { useEffect, useState } from 'react';

import prismadb from '@/lib/prismadb';

const BuscarMisinoeros = () => {
  const [misioneros, setMisioneros] = useState([]);

  return (
    <div>
      <h1>Buscar misioneros</h1>
    </div>
  );
};

export default BuscarMisinoeros;
