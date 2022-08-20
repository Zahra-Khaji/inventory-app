import Category from "./components/Category";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Filter from "./components/Filter";


const App = () => {
    const [categories,setCategories] = useState([]);
    const [products,setProducts] =  useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);
    const [sort,setSort] = useState("latest");
    const [searchValue,setSearchValue] = useState("");
    const [selectedCategory,setSelectedCategory] = useState("");
    const selectCategoryHandler = (e) => {
        setSelectedCategory(e.target.value);
    }

    const deleteProductHandler = (id) => {
        const updatedProducts = products.filter((p)=>p.id !== parseInt(id));
        setProducts(updatedProducts);
    }
    const searchHandler = (e) => {
        setSearchValue(e.target.value.trim().toLowerCase());
    }
    const sortHandler = (e) => {
        setSort(e.target.value);
    };
    const filterSearchTitle = (array) => {
        return array.filter((p) => p.title.toLowerCase().includes(searchValue));
    };
    const sortDate = (array) => {
        let sortedProducts = [...array];
        return sortedProducts.sort((a,b) => {
            if(sort === "latest") {
                return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
            }
            else if(sort === "earliest"){
                return new Date(a.createAt) > new Date(b.createAt) ? 1 : -1;
            }

        })
    };
    const filterSelectedCategory = (array) => {
        if(!selectedCategory) 
            return array;
        return array.filter((item) => item.categoryId === selectedCategory);
    };
    useEffect(()=>{
        let resualt = products;
        resualt = filterSearchTitle(resualt);
        resualt = filterSelectedCategory(resualt);
        resualt = sortDate(resualt);
        setFilteredProducts(resualt);
    },[products,sort,searchValue,selectedCategory]);
    useEffect(()=>{
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [] ;
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [] ;
        setProducts(savedProducts);
        setCategories(savedCategories);
    },[]);
    useEffect(()=>{
        if(products.length)
            localStorage.setItem("products",JSON.stringify(products));

    },[products]);
    useEffect(()=>{
        if(categories.length)
            localStorage.setItem("categories",JSON.stringify(categories));
    },[categories]);


    return (  
        <div>
            <div className="bg-slate-800 min-h-screen">
                <NavBar products={products}/>
                <div className="container max-w-screen-sm mx-auto p-4">
                    <Category categories={categories} setCategories={setCategories}/>
                    <Product products={products} setProducts={setProducts} categories={categories} />
                    <Filter categories={categories}  searchValue={searchValue} sort={sort} onSearch={searchHandler} 
                    onSort={sortHandler} selectedCategory={selectedCategory} onSelectCategory={selectCategoryHandler}/>
                    <ProductList products={filteredProducts} categories={categories} deleteProductHandler={deleteProductHandler}/>
                </div>
            </div>
        </div>
    );
}
 
export default App;