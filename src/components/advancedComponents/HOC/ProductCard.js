import React, { useState, useMemo } from "react";

import { productsJsonArr } from "./ProductsJsonArr.js";

// export const ProductsListWithSearch = () => {

//   const [searchTerm, setSearchTerm] = useState(null);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const memoizedFilteredProducts = useMemo(
//     function filterProducts() {
//       let searchTermNormalized = searchTerm.toUpperCase();
//       return productsJsonArr.filter((product) => {
//         return Object.values(product).join(" ").includes(searchTermNormalized);
//       });
//     },
//     [searchTerm]
//   );

//   return (
//     <React.Fragment>
//       <input
//         onChange={handleSearch}
//         value={searchTerm}
//         type="text"
//         placeholder="search for a product..."
//       ></input>
// 			<ProductsList products={memoizedFilteredProducts}></ProductsList>
//     </React.Fragment>
//   );
// };

const ProductCard = (props) => {
  const { title, style, price, description, isFreeShipping } = props;
  return (
    <div className="product">
      <p>
        <b>Title</b> {title}
      </p>
      <p>
        <b>Style</b> {style}
      </p>
      <p>
        <b>Price</b> {price}
      </p>
      <p>
        <b>Description</b> {description}
      </p>
      <p>
        <b>Free shipping:</b> {isFreeShipping ? "free" : "with charge"}
      </p>
    </div>
  );
};

const ProductsList = (props) => {
  const { products } = props;

  return (
    <div>
      <section>
        <h2>Products</h2>
      </section>
      <div>
        {products.map((product, i) => (
          <div key={`${product.sku}${i}`}>
            <ProductCard {...product}></ProductCard>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export const withSearchFeature = (WrappedComponent, dataArr) => {
  const WithSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    const memoizedFilteredProducts = useMemo(
      function filterProducts() {
        if (searchTerm === "") return dataArr;

        let searchTermNormalized = searchTerm.toUpperCase();
        return dataArr.filter((product) => {
          let joinedProductValues = Object.values(product)
            .map((v) => String(v).toUpperCase())
            .join(" ");

          let termIncludes = joinedProductValues.includes(searchTermNormalized);
          return termIncludes;
        });
      },
      [searchTerm]
    );

    return (
      <React.Fragment>
        <input
          onChange={handleSearch}
          value={searchTerm}
          type="text"
          placeholder="search..."
        ></input>
        <WrappedComponent
          products={memoizedFilteredProducts}
        ></WrappedComponent>
      </React.Fragment>
    );
  };

  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;

  return WithSearch;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export const ProductsListWithSearch = withSearchFeature(ProductsList, productsJsonArr);
