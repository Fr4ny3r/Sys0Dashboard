import React, { useState, useEffect, useCallback } from 'react';
import type { Egreso } from './database.ts'


// Supongamos que esta función viene del componente padre 
// y cambia el estado isModalOpen a false.
function FormularioAgregarRegistro({ onClose, agregarDatos, setEgresos, obtenerDatos } : { onClose: () => void, agregarDatos : (tableName : string, nuevaData : any )=> Promise<void>, setEgresos : React.Dispatch<React.SetStateAction<Egreso[]>> , obtenerDatos : (tableName : string) => Promise<any>} ) { 
  
  // Usamos useCallback para memoizar la función y que no cambie en cada render
  const handleEscape = useCallback((event : any) => {
    // Código de la tecla Escape es 27 (aunque event.key es más moderno)
    if (event.key === 'Escape') { 
      onClose(); // Llama a la función que cierra la modal
    }
  }, [onClose]); // Depende de onClose

  useEffect(() => {
    // 1. Añadir el Event Listener cuando el componente se monta
    document.addEventListener('keydown', handleEscape);

    // 2. Limpiar el Event Listener cuando el componente se desmonta
    //    Esto es crucial para evitar pérdidas de memoria y conflictos.
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]); // Depende de la función handleEscape


  const [descripcion, setDescripcion] = useState<string>('');
  const [monto, setMonto] = useState<number>(0);
  const [tipo, setTipo] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');


  const handleDescripcionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value);
  }
  const handleMontoChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setMonto(parseFloat(event.target.value));
  }
  const handleTipoChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  }
  const handleFechaChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
    console.log(fecha);
  }

  const handleSumbit = async (event : React.FormEvent) => {
    event.preventDefault();
    const formData: Egreso = {
      descripcion : descripcion,
      monto : monto,
      tipo : tipo,
      fecha : fecha != '' ? fecha : new Date().toISOString().split('T')[0],
    };
    console.log(formData);
    await agregarDatos('egresos', formData);
    setEgresos(await obtenerDatos('egresos') as unknown as Egreso[]);
    onClose();
  }


  return (
    <div className='absolute top-0 left-0 bg-black/50 backdrop-blur-[0.5rem] w-full h-full flex flex-col justify-center p-10 px-30 items-center gap-4'>
    <form onSubmit={handleSumbit} className='relative w-[30rem] bg-white/10 p-20 rounded-lg border-[var(--color-border)] border-[0.2rem] grid grid-cols-auto gap-4'>
    <span onClick={onClose} className='absolute top-0 left-0 rounded-xl py-1 px-4 rotate-45 flex items-center justify-center text-5xl hover:text-red-500 hover:cursor-pointer'>+</span>
        <span className='text-left p-5 text-3xl font-bold underline decoration-[0.2rem] decoration-white/20'>Agregar Registro</span>
            <input required onChange={handleDescripcionChange} placeholder='Descripción' type='text' className='w-full outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block' />
            <input required onChange={handleMontoChange} placeholder='Monto' type='number' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block '/>
            <input required list="tipos" onChange={handleTipoChange} placeholder='Tipo' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block '/>
            <datalist id="tipos">
              <option value="Alquiler" />
              <option value="Nómina" />
              <option value="Servicios" />
              <option value="Marketing" />
              <option value="Mantenimiento" />
              <option value="Otros" />
            </datalist>
            <input defaultValue={new Date().toISOString().split('T')[0]} onChange={handleFechaChange} placeholder='Fecha' type='date' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 ' />
            <span className=' flex justify-between items-center text-xl pr-4'>
                <button type='submit' className='bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] border-[0.1rem] font-bold py-2 px-4 rounded-lg mt-4 hover:cursor-pointer'>Agregar</button>
                <button type='button' onClick={onClose} className='bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-lg mt-4 hover:cursor-pointer'>Cancelar</button>
                <button type='reset' className='bg-gray-500 hover:bg-gray-600 text-white font-bold p-2 rounded-lg mt-4 hover:cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
                </button>
            </span>        
    </form>
    </div>
  );
}

export default FormularioAgregarRegistro;