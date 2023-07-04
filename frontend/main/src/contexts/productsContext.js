import React, { createContext, useState } from 'react';

export const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [productData, setProductData] = useState([])

  return (
    <productsContext.Provider
      value={{productData, setProductData }}>

      {children}
    </productsContext.Provider>
  );
};