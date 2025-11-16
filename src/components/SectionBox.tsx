import Home from './Home'

function SectionBox( { sectionList, sect } : {sectionList: string[], sect : string}) {

  return (
    <section className=" w-full translate-x-1 h-97/100 bg-[var(--color-background)] border-2 border-[var(--color-sidebar-bg)] rounded-l-2xl overflow-hidden">
      {sect == sectionList[0] ? <Home /> : <></>}
      {sect == sectionList[1] ? <></> : <></>}
    </section>
  )
}

export default SectionBox
