import type { Egreso } from './database.ts'


function Expenses( { sectionList, egresos } : {sectionList: string[], egresos: Egreso[]}) {
    return (
    <main className="relative w-full p-8 h-full overflow-hidden">
        <span className="bg-[var(--color-primary)]/50 rounded-xl w-full h-20 flex px-9 text-3xl font-bold items-center block">
            <h1>{sectionList[2][0].toUpperCase() + sectionList[2].slice(1)}</h1>
        </span>
        <ul className="mt-6 space-y-4 overflow-y-auto text-left pt-10 flex flex-col border-b-[var(--color-border)] border-b-[0.2rem] pb-6">
            <li className='bg-white/10 p-4 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[30rem_5rem_8rem_auto_10rem] gap-4'>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block'>Descripcion</span>
                <span className='text-left flex border-r-[var(--color-border)] border-r-[0.1rem] block pr-5'>Monto</span>
                <span className='text-left flex border-r-[var(--color-border)] border-r-[0.1rem] block pr-5'>Tipo</span>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block px-5'>Fecha</span>
            </li>
        </ul>
        <ul className="mt-6 space-y-4 overflow-y-auto text-left pt-4 flex flex-col">
        <div className='flex justify-around items-center w-[8rem] bg-white/10 border-[var(--color-border)] border-[0.1rem] p-2 px-3 text-lg rounded-xl hover:cursor-pointer select-none'><span className='font-bold text-2xl'>+</span> agregar</div>
            {egresos && egresos.map((egreso) => (
            <li key={egreso.id} className='bg-white/10 p-3 rounded-lg border-[var(--color-border)] border-[0.1rem] grid grid-cols-[30rem_5rem_8rem_auto_10rem] gap-4'>
                <p className=' border-r-[var(--color-border)] border-r-[0.1rem] block'>{egreso.descripcion}</p>
                <span className='border-r-[var(--color-border)] border-r-[0.1rem] block '>${egreso.monto}</span>
                <span className=' text-left flex border-r-[var(--color-border)] border-r-[0.1rem] block px-4'>{egreso.tipo}</span>
                <span className=' border-r-[var(--color-border)] border-r-[0.1rem] block pr-5'>{new Date(egreso.fecha).toLocaleDateString()}</span>
                <span className=' flex justify-center items-center gap-4 pr-4'>
                    {/* Placeholder for future actions, e.g., edit/delete */}
                    <a className='hover:text-[var(--color-accent)]/30 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </a>
                    <a className='hover:text-[var(--color-accent)]/30 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.9rem" height="1.9rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </a>
                </span>
                
            </li>
            ))}
        </ul>
    </main>
    )
}

export default Expenses