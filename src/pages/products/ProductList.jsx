import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PaymentIntent from "../../components/PaymentIntent"

function ProductList() {
  const [products, setProducts] = useState(null);
  const [ productToBuy, setProductToBuy ] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/products");
      setProducts(response.data);
    } catch (err) {
      navigate("/error")
    }
  };

  const handleBuy = (productToPay) => {
    setProductToBuy(productToPay)
  }

  if (!products) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h1>My Products</h1>
      <hr />

      {products.map((eachProduct) => {
          return (
            <div key={eachProduct._id}>
              <p>Name: {eachProduct.name}</p>
              <p>Price: {eachProduct.price}</p>
              <button onClick={() => handleBuy(eachProduct)}>Pagar</button>
              { productToBuy && productToBuy._id ===  eachProduct._id && <PaymentIntent productToBuy={productToBuy}/> }
              <hr />
            </div>
          );
        })
      }
    </div>
  );
}

export default ProductList;