import React, { useEffect, useCallback } from 'react';

// Supongamos que esta función viene del componente padre 
// y cambia el estado isModalOpen a false.
function FormularioAgregarRegistro({ onClose } : { onClose: () => void }) { 
  
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

  return (
    <div className='absolute top-0 left-0 bg-black/50 backdrop-blur-[0.5rem] w-full h-full flex flex-col justify-center p-10 px-30 items-center gap-4'>
    <form className='relative w-[30rem] bg-white/10 p-20 rounded-lg border-[var(--color-border)] border-[0.2rem] grid grid-cols-auto gap-4'>
        <span className='text-left p-5 text-3xl font-bold'>Agregar Registro :</span>
            <input placeholder='Descripción' type='text' className='w-full outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block' />
            <input placeholder='Monto' type='number' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block '/>
            <input placeholder='Tipo' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 block' />
            <input placeholder='Fecha' type='date' className='outline-none border-b-[var(--color-border)] flex items-center border-b-[0.1rem] p-3 ' />
            <span className=' flex justify-center items-center gap-4 pr-4'>
                <a className='hover:text-green-200 cursor-pointer transition-colors duration-150'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </a>
                <a className='hover:text-red-200 cursor-pointer transition-colors duration-150'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </a>
            </span>        
    </form>
    </div>
  );
}

export default FormularioAgregarRegistro;