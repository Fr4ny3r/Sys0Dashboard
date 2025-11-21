import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Aside from './components/Aside'
import SectionBox from './components/SectionBox'
import './App.css'
function App() {
  const [, setError] = useState(null);

const API_URL = 'https://back0dashboard.guevarafranyer09.workers.dev'; 


  const obtenerDatos = async (tableName : string) => {
    try {
      const response = await fetch(`${API_URL}/api/${tableName}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e : any) {
      console.error("Error al obtener datos:", e);
      setError(e.message);
    }
  }

  const agregarDatos = async (tableName : string, nuevaData : any) => {
    try {
      const response = await fetch(`${API_URL}/api/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaData),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      // Actualizar la lista de egresos después de agregar uno nuevo
    } catch (e : any) {
      console.error("Error al agregar egreso:", e);
      setError(e.message);
    }
  }

  const borrarDatos = async (tableName : string, id : number) => {
    try {
      const response = await fetch(`${API_URL}/api/${tableName}/${id}`, {
        method: 'DELETE',
                headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }else {
        console.log(`Egreso con id ${id} borrado correctamente.`);
      }
      // Actualizar la lista de egresos después de borrar uno
    } catch (e : any) {
      console.error("Error al borrar egreso:", e);
      setError(e.message);
    }
  }

  const actualizarDatos = async (tableName : string, id : number, datosActualizados : any) => {
    try {
      const response = await fetch(`${API_URL}/api/${tableName}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      // Actualizar la lista de egresos después de actualizar uno
    } catch (e : any) {
      console.error("Error al actualizar egreso:", e);
      setError(e.message);
    }
  }



  
  const sectionList = ["inicio", "ingresos", "egresos", "proovedores", "inventario", "reportes", "caja", "mi Tienda"]

  return (
    <div className="w-screen h-screen overflow-hidden">
      <BrowserRouter>
      <div className="w-full h-full flex bg-[var(--color-sidebar-bg)] justify-center items-center">
        <Aside sectionList={sectionList} />        
        <SectionBox sectionList={sectionList} obtenerDatos={obtenerDatos} agregarDatos={agregarDatos} borrarDatos={borrarDatos} />
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
