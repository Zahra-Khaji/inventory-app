import { useState } from "react";

const Product = ({categories,products,setProducts}) => {
    const [productFormData,setProductFormData] =  useState({title:"",quantity:0,categoryId:""});

    const changeHandler = (e) => {
        setProductFormData({...productFormData,[e.target.name]:e.target.value});

    }
    const addNewProductHandler = (e) => {
        e.preventDefault();
        setProducts([...products,{...productFormData,createAt:new Date().toISOString(),id:new Date().getTime()}]);
        setProductFormData({title:"",quantity:0,categoryId:""});
    };
    return ( 
        <div className="mb-6">
            <h2 className="text-xl text-slate-300 font-bold mb-2">Add New Product</h2>
            <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
                <div>
                    <label htmlFor="product-title" className="block mb-1 text-slate-400">title</label>
                    <input
                    type="text" name="title" value={productFormData.title} id="category-title"  onChange={changeHandler}
                    className="bg-transparent rounded-xl border border-slate-500
                    text-slate-400 w-full md:w-auto"
                    />
                </div>
                <div>
                    <label htmlFor="product-title" className="block mb-1 text-slate-400">quantity</label>
                    <input
                    type="number" name="quantity" value={productFormData.quantity} id="product-quantity" onChange={changeHandler}
                    className="bg-transparent rounded-xl border border-slate-500
                    text-slate-400 w-full md:w-auto"
                    />
                </div>
                <div>
                <label htmlFor="product-category" className="block mb-1 text-slate-400">category</label>
                <select onChange={changeHandler} name="categoryId" value={productFormData.categoryId} className="bg-transparent text-slate-400 rounded-xl w-full">
                    <option className="bg-slate-500 text-slate-300" value="">
                        select a category
                    </option>
                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id} className="bg-slate-500 text-slate-300">
                            {category.title}
                            </option>

                        )
                    })}
                </select>
                <div className="flex items-center justify-between gap-x-4">
                    <button 
                    onClick={addNewProductHandler}
                    className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2 mt-3">Add new product</button>
                </div>


                </div>
            </form>
        </div>
     );
}
 
export default Product;