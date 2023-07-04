import React from 'react';
import './productsCardSkeleton.css'
function ProductsCardSkeleton({ count }) {
    return (
        <>
            {Array.from(Array(count)).map((_, index) => (
                <div className="skeleton-box" key={index}></div>
            ))}
        </>
    );
}

export default ProductsCardSkeleton;
