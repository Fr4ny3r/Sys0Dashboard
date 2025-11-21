import Home from './Home'
import Earnings from './Earnings'
import Expenses from './Expenses'
import { Routes, Route } from 'react-router-dom';

function SectionBox( { sectionList, obtenerDatos, agregarDatos, borrarDatos } : {sectionList: string[], obtenerDatos: (tableName : string) => Promise<any>, agregarDatos : (tableName : string, nuevaData : any )=> Promise<void>, borrarDatos : (tableName : string, id : number) => Promise<void>} ) {
  return (
    <section className=" w-full translate-x-1 h-97/100 bg-[var(--color-background)] border-2 border-[var(--color-sidebar-bg)] rounded-l-2xl overflow-hidden">
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/${sectionList[1]}`} element={<Earnings />} />
          <Route path={`/${sectionList[2]}`} element={<Expenses sectionList={sectionList} obtenerDatos={obtenerDatos} agregarDatos={agregarDatos} borrarDatos={borrarDatos}/>} />
        </Routes>
    </section>
  )
}

export default SectionBox
