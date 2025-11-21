import { useState, useEffect, useMemo } from 'react'
import FormularioAgregarRegistro from './FormularioAgregarRegistro.tsx';
import type { Egreso } from './database.ts'

function Expenses( { sectionList, obtenerDatos, agregarDatos, borrarDatos } : {sectionList: string[], obtenerDatos: (tableName : string) => Promise<any>, agregarDatos : (tableName : string, nuevaData : any )=> Promise<void>, borrarDatos : (tableName : string, id : number) => Promise<void>} ) {
    
    const [egresoTemp , setEgresoTemp] = useState<Egreso | null>(null);
    const [editarEgreso , setEditarEgreso] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [aggEgereso, setAggEgreso] = useState<boolean>(false);
    const [borrarEgreso, setBorrarEgreso] = useState<number>(0);
    const [egresos, setEgresos] = useState<Egreso[]>("" as unknown as Egreso[]);
    const [borrar, setBorrar] = useState<boolean>(false);
    const [, setError] = useState(null);
    const [, setIsLoading] = useState(true);
    const API_URL = 'https://back0dashboard.guevarafranyer09.workers.dev'; 
    
    const ITEMS_PER_PAGE = 5;
    const totalPages = useMemo(() => {
    return Math.ceil(egresos.length / ITEMS_PER_PAGE);
    }, [egresos.length]);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const currentEgresos = egresos.slice(startIndex, endIndex);

    const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
    };

    const goToPrevPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
    };

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/egresos`);

        if (!response.ok) {
          // Lanza un error si el código de respuesta no es 2xx
          throw new Error(`Error HTTP: ${response.status}`); 
        }

        // 1. Recibir y parsear el JSON
        const data = await response.json(); 
        
        // 2. Almacenar los datos en el estado de React
        setEgresos(data); 

      } catch (e : any) {
        console.error("Error al obtener datos:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
    return (
    <main className="w-full p-8 h-full overflow-hidden">
        {borrar && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[0.5rem] flex justify-center items-center z-10 transition-opacity duration-300">
                <div className="bg-[var(--color-background)] p-6 rounded-xl border-2 border-[var(--color-border)]">
                    <h2 className="text-2xl font-bold mb-4">¿Estás seguro de que deseas borrar este registro?</h2>
                    <div className="flex justify-end gap-4">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            onClick={async () => {
                                await borrarDatos('egresos', borrarEgreso)
                                setBorrar(false);
                                try {
                                const response = await fetch(`${API_URL}/api/egresos`);
                                if (!response.ok) {
                                    throw new Error(`Error HTTP: ${response.status}`);
                                }
                                const data = await response.json();
                                setEgresos(data);
                                
                                } catch (e : any) {
                                console.error("Error al obtener datos:", e);
                                setError(e.message);
                                }

                            }}
                        >Borrar</button>
                        <button
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            onClick={() => setBorrar(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )} 
        
        <span className="bg-[var(--color-primary)]/50 rounded-xl w-full h-20 flex px-9 text-3xl font-bold items-center block">
            <h1>{sectionList[2][0].toUpperCase() + sectionList[2].slice(1)}</h1>
        </span>
        <ul className="mt-6 space-y-4 overflow-y-auto text-left pt-10 flex flex-col border-b-[var(--color-border)] border-b-[0.2rem] pb-6">
            <li className='bg-white/10 p-4 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[3rem_minmax(10rem,_1fr)_5rem_8rem_6rem_10rem] xl:grid-cols-[3rem_minmax(15rem,_1fr)_5rem_8rem_6rem_10rem] gap-4'>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block'>Id</span>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block'>Descripcion</span>
                <span className='text-left flex border-r-[var(--color-border)] border-r-[0.1rem] block pr-5'>Monto</span>
                <span className='text-left flex border-r-[var(--color-border)] border-r-[0.1rem] block pr-5'>Tipo</span>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block px-5'>Fecha</span>
            </li>
        </ul>
        <div className='flex items-center h-[3.5rem] mt-6'>
        {!aggEgereso &&
        <div
            className='flex justify-around items-center w-[8rem] bg-white/10 border-[var(--color-border)] border-[0.1rem] p-2 px-3 text-lg rounded-xl hover:cursor-pointer select-none'
            onClick={() => setAggEgreso(true)}>
            <span className='font-bold text-2xl'>+</span>
            agregar
        
        </div>}
        {aggEgereso &&
        <FormularioAgregarRegistro onClose={() => setAggEgreso(false)} agregarDatos={agregarDatos} setEgresos={setEgresos} obtenerDatos={obtenerDatos} />
        }
        </div>
        <div className="flex flex-col">
      <ul className="mt-6 space-y-4 overflow-y-auto text-left pt-4 flex flex-col">
        {currentEgresos.length !== 0 ? (
          currentEgresos.map((egreso) => (
            <li 
              key={egreso.id} 
              className={`bg-white/10 px-3 py-2 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[3rem_minmax(10rem,_1fr)_5rem_8rem_6rem_10rem] xl:grid-cols-[3rem_minmax(15rem,_1fr)_5rem_8rem_6rem_10rem] gap-1 ${editarEgreso != egreso.id ? '' : 'border-[var(--color-accent)] border-[0.2rem]'}`}
            >
              {/* Contenido de tu egreso... (mantenido igual) */}
              {editarEgreso != egreso.id ?
              <>
              <span className=' border-r-[var(--color-border)] flex items-center justify-center border-r-[0.1rem] block'>{egreso.id}</span>
              <p title={`${egreso.descripcion}`} className=' overflow-hidden text-nowrap border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block'>{egreso.descripcion}</p>
              <span className='border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block '>${egreso.monto}</span>
              <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block px-4'>{egreso.tipo}</span>
              <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block pr-5'>{new Date(egreso.fecha).toLocaleDateString()}</span>
              <span className=' flex justify-center items-center gap-4 pr-4'>
                <a
                    className='hover:text-green-200 cursor-pointer transition-colors duration-150'
                    onClick={() => {
                        setEgresoTemp(egreso);
                        setEditarEgreso(egreso.id ?? 0)
                    }}
                >
                    {/* Icono de Editar */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </a>
                <a
                    className='hover:text-red-200 cursor-pointer transition-colors duration-150'
                    onClick={()=>{
                        setBorrar(true);
                        setBorrarEgreso(egreso.id ?? 0);
                    }}
                >
                    {/* Icono de Basura */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </a>
              </span>
              </> :
              <>
              <span className=' border-r-[var(--color-border)] flex items-center justify-center border-r-[0.1rem] block'>{egreso.id}</span>
              <input defaultValue={`${egresoTemp?.descripcion}`} title={`${egreso.descripcion}`} className=' overflow-hidden text-nowrap border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block' />
              <span className='border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block '>${egreso.monto}</span>
              <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block px-4'>{egreso.tipo}</span>
              <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block pr-5'>{new Date(egreso.fecha).toLocaleDateString()}</span>
              <span className=' flex justify-center items-center gap-4 pr-4'>
                <button
                    className='hover:text-green-200 cursor-pointer transition-colors duration-150'
                    onClick={() => setEditarEgreso(0)}
                >
                    {/* Icono de Guardar */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                </button>
                <button
                    className='hover:text-red-200 cursor-pointer transition-colors duration-150'
                    onClick={()=>{
                        setEditarEgreso(0)
                    }}
                >
                    {/* Icono de Basura */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cancel"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M18.364 5.636l-12.728 12.728" /></svg>
                </button>
              </span>
              </>
              }
        
            </li>
          ))
        ) : (
          <p className='text-center mt-10 text-2xl font-semibold'>No hay egresos registrados.</p>
        )}
      </ul>
      {/* CONTROLES DE PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="flex absolute w-full bottom-0 justify-center p-3 items-center">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors duration-150`}
          >
            Anterior
          </button>
          
          <span className="text-white mx-3">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors duration-150`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
    </main>
    )
}

export default Expenses