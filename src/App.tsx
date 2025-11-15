import { useState } from 'react'
import Nav from './components/Nav'
import Aside from './components/Aside'
import SectionBox from './components/SectionBox'
import './App.css'
function App() {
  const [sect, setSect] = useState<string>("inicio")
  const sectionList = ["inicio", "ingresos", "egresos", "proovedores", "inventario", "reportes", "caja", "mi Tienda"]

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/*<Nav />*/}
      <div className="w-full h-full">
        <Aside sectionList={sectionList} sect={sect} setSect={setSect}/>        
        <SectionBox sect={sect}/>
      </div>
    </div>
  )
}

export default App
