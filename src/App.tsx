import { useState, useEffect } from 'react'
import { supabase } from './components/supabase.js'
import { Egreso } from './components/database.ts'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Aside from './components/Aside'
import SectionBox from './components/SectionBox'
import './App.css'
function App() {
  const [egresos, setEgresos] = useState<Egreso[]>()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


  const fetchEgresos = async () => {
    try {
      const { data, error } = await supabase
      .from('egresos')
      .select('*');

      if (error) {
        console.error('Error al obtener datos:', error);
        setError(error);
        setEgresos([]);
      } else {
        setEgresos(data);
      }

    } catch (err : any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
        
  fetchEgresos();

  }, []);
  
  const sectionList = ["inicio", "ingresos", "egresos", "proovedores", "inventario", "reportes", "caja", "mi Tienda"]

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/*<Nav />*/}
      <BrowserRouter>
      <div className="w-full h-full flex bg-[var(--color-sidebar-bg)] justify-center items-center">
        <Aside sectionList={sectionList} />        
        <SectionBox sectionList={sectionList} />
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
