import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/productItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext);
  const [LatestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const latestProducts = products.slice(3, 13);
      setLatestProduct(latestProducts);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          ipsam architecto corporis, nisi quasi at in commodi. Accusantium
          deserunt officiis molestias minima enim, voluptas consequatur quod
          eius illum placeat beatae?
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {LatestProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
