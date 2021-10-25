import React, { useState, useMemo, useEffect } from "react";

import { productsJsonArr } from "./ProductsJsonArr.js";

export const HocComponents = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <section>
        <ProductsListWithSearch></ProductsListWithSearch>
      </section>
      <section>
        <ArticleListWithSearch></ArticleListWithSearch>
      </section>
    </div>
  );
};

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
  const { data: products } = props;
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

export const withSearchFeature = (WrappedComponent, selectDataArr) => {
  const WithSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dataArr, setDataArr] = useState([]);

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    useEffect(() => {
      async function fetchDataArr() {
        const fetchedDataArr = await selectDataArr();
        setDataArr(fetchedDataArr);
      }
      fetchDataArr();
    }, []);

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
      [dataArr, searchTerm]
    );

    return (
      <React.Fragment>
        <input
          onChange={handleSearch}
          value={searchTerm}
          type="text"
          placeholder="search..."
        ></input>
        <WrappedComponent data={memoizedFilteredProducts}></WrappedComponent>
      </React.Fragment>
    );
  };

  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;

  return WithSearch;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const ArticleList = (props) => {
  const { data: articles } = props;

  return (
    <div>
      <section>
        <h3>Articles</h3>
      </section>
      <section>
        {articles.map((article, i) => (
          <div key={`${article.id}${i}`}>
            <ArticleCard {...article}></ArticleCard>
            <hr />
          </div>
        ))}
      </section>
    </div>
  );
};
const ArticleCard = (props) => {
  const {
    type_of,
    title,
    description,
    readable_publish_date,
    comments_count,
    cover_image,
    tags,
  } = props;

  return (
    <div>
      <div>
        <img
          src={cover_image}
          alt={tags}
          className="img img-fluid"
          style={{ maxHeight: "400px", maxWidth: "400px" }}
        />
      </div>
      <p>
        <b>type</b> {type_of}
      </p>
      <p>
        <b>title</b> {title}
      </p>
      <p>
        <b>description</b> {description}
      </p>
      <p>
        <b>published at</b> {readable_publish_date}
      </p>
      <p>
        <b>comments:</b> {comments_count}
      </p>
      <p>
        <b>tags</b> {tags}
      </p>
    </div>
  );
};

export const ProductsListWithSearch = withSearchFeature(
  ProductsList,
  async function getProductsArr() {
    const response = await new Promise((resolve) => {
      resolve(productsJsonArr);
    });
    return response;
  }
);

// https://developers.forem.com/api#operation/getArticles

export const ArticleListWithSearch = withSearchFeature(
  ArticleList,
  async function fetchArticlesFromServer() {
    const response = await fetch("https://dev.to/api/articles?per_page=20");
    const fetchedData = await response.json();
    if (response.ok) {
      return fetchedData;
    }
  }
);
