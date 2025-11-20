import { useState, useEffect } from 'react'
import type { Egreso } from './database.ts'

function Expenses( { sectionList, obtenerEgresos, agregarDatos, borrarDatos } : {sectionList: string[], obtenerEgresos: () => void, agregarDatos : (tableName : string, nuevaData : any )=> Promise<void>, borrarDatos : (tableName : string, id : number) => Promise<void>} ) {
    
    const [aggEgereso, setAggEgreso] = useState<boolean>(false);
    const [borrarEgreso, setBorrarEgreso] = useState<number>(0);
    const [egresos, setEgresos] = useState<Egreso[]>("" as unknown as Egreso[]);
    const [borrar, setBorrar] = useState<boolean>(false);
    const [, setError] = useState(null);
    const [, setIsLoading] = useState(true);
    const API_URL = 'https://back0dashboard.guevarafranyer09.workers.dev'; 
    
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setBorrar(false);
        }
    });

    fetchData();
  }, []);
  
    return (
    <main className="w-full p-8 h-full overflow-hidden">
        {borrar && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[5px] flex justify-center items-center z-10 transition-opacity duration-300">
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
            <li className='bg-white/10 p-4 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[3rem_30rem_5rem_8rem_auto_10rem] gap-4'>
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
            onClick={() => setAggEgreso(true)}
            //onClick={async () => {
            //    const nuevoEgreso: Egreso = {
            //        id: 0, 
            //        descripcion: 'Nuevo Egreso',
            //        monto: 440,
            //        tipo: 'general',
            //        fecha: new Date().toISOString(),
            //    };
            //    await agregarDatos('egresos', nuevoEgreso);
            //    setEgresos(await obtenerEgresos() as unknown as Egreso[]);
            //}}
        >
            <span className='font-bold text-2xl'>+</span>
            agregar
        
        </div>}
        {aggEgereso &&
        <div className='w-full flex items-center gap-4'>
        <span className='text-right px-4 text-xl font-bold'>Agregar Registro :</span>
        <div className='relative bg-white/10 p-3 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[20rem_5rem_8rem_auto_10rem] gap-4'>
                <input placeholder='Descripción' type='text' className='w-full outline-none border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block' />
                <input placeholder='Monto' type='number' className='outline-none border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block '/>
                <input placeholder='Tipo' className='outline-none border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block px-4' />
                <input placeholder='Fecha' type='date' className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block pr-5' />
                <span className=' flex justify-center items-center gap-4 pr-4'>
                    {/* Placeholder for future actions, e.g., edit/delete */}
                    <a className='hover:text-green-200 cursor-pointer transition-colors duration-150'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </a>
                    <a className='hover:text-red-200 cursor-pointer transition-colors duration-150'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </a>
                </span>        
        </div>
        </div>
        }
        </div>
        <ul className="mt-6 space-y-4 overflow-y-auto text-left pt-4 flex flex-col">
            {egresos.length != 0 ? egresos.map((egreso) => (
            <li key={egreso.id} className='bg-white/10  p-3 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[3rem_30rem_5rem_8rem_auto_10rem] gap-4'>
                <span className=' border-r-[var(--color-border)] flex items-center justify-center border-r-[0.1rem] block'>{egreso.id}</span>
                <p className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block'>{egreso.descripcion}</p>
                <span className='border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block '>${egreso.monto}</span>
                <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block px-4'>{egreso.tipo}</span>
                <span className=' border-r-[var(--color-border)] flex items-center border-r-[0.1rem] block pr-5'>{new Date(egreso.fecha).toLocaleDateString()}</span>
                <span className=' flex justify-center items-center gap-4 pr-4'>
                    {/* Placeholder for future actions, e.g., edit/delete */}
                    <a className='hover:text-green-200 cursor-pointer transition-colors duration-150'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </a>
                    <a
                        className='hover:text-red-200 cursor-pointer transition-colors duration-150'
                        onClick={()=>{
                            setBorrar(true);
                            setBorrarEgreso(egreso.id ?? 0);
                            // borrarDatos('egresos', egreso.id ?? 0);
                            // setEgresos(egresos.filter(e => e.id !== egreso.id));
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </a>
                </span>
                
            </li>
            )) : (<p className='text-center mt-10 text-2xl font-semibold'>No hay egresos registrados.</p>)}
        </ul>
    </main>
    )
}

export default Expenses