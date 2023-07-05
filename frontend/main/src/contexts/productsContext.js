import React, { createContext, useState } from 'react';

export const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  
  const [productData, setProductData] = useState([])
  const [category, setCategory] = useState('')

  return (
    <productsContext.Provider
      value={{productData, setProductData,category, setCategory}}>

      {children}
    </productsContext.Provider>
  );
};