import type { Egreso } from './database.ts'
import Home from './Home'
import Earnings from './Earnings'
import Expenses from './Expenses'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function SectionBox( { sectionList, egresos } : {sectionList: string[], egresos: Egreso[]}) {
  return (
    <section className=" w-full translate-x-1 h-97/100 bg-[var(--color-background)] border-2 border-[var(--color-sidebar-bg)] rounded-l-2xl overflow-hidden">
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/${sectionList[1]}`} element={<Earnings />} />
          <Route path={`/${sectionList[2]}`} element={<Expenses sectionList={sectionList} egresos={egresos} />} />
        </Routes>
    </section>
  )
}

export default SectionBox
