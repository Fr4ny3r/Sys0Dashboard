import { useState, useEffect } from 'react'
import type { Egreso } from './components/database.ts'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Aside from './components/Aside'
import SectionBox from './components/SectionBox'
import './App.css'
function App() {
  const [egresos, setEgresos] = useState<Egreso[]>()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

const API_URL = 'https://back0dashboard.guevarafranyer09.workers.dev/api/egresos'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Lanza un error si el código de respuesta no es 2xx
          throw new Error(`Error HTTP: ${response.status}`); 
        }

        // 1. Recibir y parsear el JSON
        const data = await response.json(); 
        
        // 2. Almacenar los datos en el estado de React
        // setEgresos(data); 

      } catch (e : any) {
        console.error("Error al obtener datos:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const obtenerEgresos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setEgresos(data);
    } catch (e : any) {
      console.error("Error al obtener datos:", e);
      setError(e.message);
    }
  }

  const agregarEgresos = async (nuevoEgreso: Egreso) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEgreso),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      // Actualizar la lista de egresos después de agregar uno nuevo
      await obtenerEgresos();
    } catch (e : any) {
      console.error("Error al agregar egreso:", e);
      setError(e.message);
    }
  }

  
  const sectionList = ["inicio", "ingresos", "egresos", "proovedores", "inventario", "reportes", "caja", "mi Tienda"]

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/*<Nav />*/}
      <BrowserRouter>
      <div className="w-full h-full flex bg-[var(--color-sidebar-bg)] justify-center items-center">
        <Aside sectionList={sectionList} />        
        <SectionBox sectionList={sectionList} egresos={egresos ?? []} obtenerEgresos={obtenerEgresos} agregarEgresos={agregarEgresos} />
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
