import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';


function Aside({ sectionList } : { sectionList : string[] }) {

  const [tar, setTar] = useState<string>("")
  const elementoRef = useRef(null);
  const [posicion, setPosicion] = useState<number>(0)


  const handleTarget = (s : string)=>{
    setTar(s)
  }


  return (
    <aside className="sidebar w-2/12 h-full overflow-hidden text-[var(--color-sidebar-link)]">
      <span className="font-extrabold h-2/12 block flex justify-center items-center "><span className="-translate-y-1/6">Sys</span><span className="font-extrabold -mx-1 text-[var(--color-sidebar-link)]/20 text-3xl">0</span><span className="translate-y-1/6">Dashboard</span></span>
      <ul className="relative flex flex-col gap-2" >
        
      {sectionList.lenght != 0 ? (sectionList.map(s => (
          <>
            {s == sectionList[0] ? (
              <Link to={`/`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">    
                <span title={s} className="relative flex w-full items-center justify-between ">
                <a>{" " + s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[1] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[2] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[3] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[4] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-robot-face"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z" /><path d="M9 16c1 .667 2 1 3 1s2 -.333 3 -1" /><path d="M9 7l-1 -4" /><path d="M15 7l1 -4" /><path d="M9 12v-1" /><path d="M15 12v-1" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[5] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-report-analytics"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[6] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-box"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>
                </span>
              </li>
              </Link>
            ) :
            (s == sectionList[7] ? (
              <Link to={`/${s}`}>
              <li key={s} id="sectList" className="relative rounded-sm p-3 mx-1 flex items-center justify-between hover:font-bold hover:bg-[var(--color-primary)]/10 hover:cursor-pointer transition">
                <span title={s} className=" flex w-full items-center justify-between">
                <a>{s[0].toUpperCase() + s.slice(1)}</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="12%" height="12%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="scale-[2] opacity-2 icon icon-tabler icons-tabler-outline icon-tabler-building-store"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /></svg>
                </span>
              </li>
              </Link>
            ) : (<a>{s[0].toUpperCase() + s.slice(1)}</a>) )))))))} 
            </>           
        ))) : (<span>Cargando...</span>)} 
        
      </ul>
      <span className="absolute w-2/12 p-2 bottom-1 gap-2 flex">
        <a title="configuracion" className="hover:cursor-pointer hover:scale-[1.04] transition"><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-shadow-xl icon icon-tabler icons-tabler-outline icon-tabler-settings-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg></a>
        <a title="perfil" className="hover:cursor-pointer hover:scale-[1.04] transition" ><svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-scan"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" /></svg></a>
      </span>
    </aside>
  )
}

export default Aside