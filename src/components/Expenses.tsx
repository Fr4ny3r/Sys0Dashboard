
function Expenses( { sectionList } : {sectionList: string[]}) {
    return (
    <main className="relative w-full p-8 h-full overflow-hidden">
        <span className="bg-[var(--color-primary)]/50 rounded-xl w-full h-20 flex px-9 text-3xl font-bold items-center block">
            <h1>{sectionList[2][0].toUpperCase() + sectionList[2].slice(1)}</h1>
        </span>
    </main>
    )
}

export default Expenses