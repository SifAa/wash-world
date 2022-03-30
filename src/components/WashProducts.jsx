import React, { useEffect } from "react";
import axios from "axios";
import info from "../info";

export default function WashProducts(data) {
  //console.log(data);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(info.backendUrl + "/products/" + data.lpn).then((result) => {
      //console.log(result.data.response.products);
      data.setProducts(result.data.response.products);
    });
  }, []);

  return (
    <div>
      <h2>Vælg program</h2>
      {/* {console.log(data.products)} */}
      {data.products.map((product) => {
        return (
          <div
            key={product.productid}
            className="card"
            id={"card-" + product.productid}
          >
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text program-price">{product.price}</p>
              <button
                className="btn btn-wash btn-card"
                onClick={data.chooseWash}
                value={product.program}
              >
                Program {product.program}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
