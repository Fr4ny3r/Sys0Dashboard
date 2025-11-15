
function Aside({ sectionList, sect, setSect } : { sectionList : string[], sect : string, setSect : () => void }) {

  return (
    <aside className="sidebar w-2/12 h-full overflow-hidden text-[var(--color-sidebar-link)]">
      <span className="h-2/12 block flex flex-col justify-center items-center border-1 border-[var(--color-border)]/20">asd</span>
      <ul className="flex flex-col gap-2 border-1 border-[var(--color-border)]/20" >
      {sect ? (sectionList.map(s => (
          <li key={s.index} className="p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
            {s == 'inicio' ? (
              <>
              <a>{" " + s[0].toUpperCase() + s.slice(1)}</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
              </>
            ) :
            (s == 'ingresos' ? (
              <>
              <a>{s[0].toUpperCase() + s.slice(1)}</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" /></svg>
              </>
            ) :
            (s == 'egresos' ? (
              <>
              <a>{s[0].toUpperCase() + s.slice(1)}</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
              </>
            ) :
            (<a>{s[0].toUpperCase() + s.slice(1)}</a>) ))}            
          </li>
        ))) : (<span>Cargando...</span>)} 
      </ul>
      <span className="block w-full h-full border-1 border-[var(--color-border)]/20"></span>
    </aside>
  )
}

export default Aside
