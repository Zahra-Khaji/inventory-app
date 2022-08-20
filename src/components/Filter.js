
const Filter = ({onSearch,onSort,sort,searchValue,categories,onSelectCategory,selectedCategory}) => {

    return ( 
        <div>
            <div className="flex items-center justify-between mb-6">
                <label className="text-slate-500 text-lg">Search</label>
                <input value={searchValue} onChange={onSearch} type="text"  className="bg-transparent rounded-xl border border-slate-500 text-slate-400 p-1"/>

            </div>
            <div className="flex items-center justify-between mb-6">
                <label className="text-slate-500 text-lg">Sort</label>
                <select onChange={onSort} value={sort} className="bg-transparent rounded-xl  text-slate-400">
                    <option className="bg-slate-500 text-slate-300" value="">select a category</option>
                    <option className="bg-slate-500 text-slate-300" value="latest">latest</option>
                    <option className="bg-slate-500 text-slate-300" value="earliest">earliest</option>
                </select>
            </div>
            <div className="flex items-center justify-between mb-6">
                <label className="text-slate-500 text-lg">Categoty</label>
                <select onChange={onSelectCategory} value={selectedCategory} className="bg-transparent rounded-xl  text-slate-400">
                    <option className="bg-slate-500 text-slate-300" value="">All</option>
                    {categories?.map((item)=>{
                        return (
                            <option key={item.id} value={item.id} className="bg-slate-500 text-slate-300">{item.title}</option>
                        )
                    })}
                </select>
            </div>

        </div>
     );
}
 
export default Filter;