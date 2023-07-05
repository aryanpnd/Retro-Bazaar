import React, { createContext, useState } from 'react';

export const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  
  const [category, setCategory] = useState('')

  return (
    <productsContext.Provider
      value={{category, setCategory}}>

      {children}
    </productsContext.Provider>
  );
};