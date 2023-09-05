import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Compras() {
  const navigate = useNavigate();
  const [allOperations, setAllOperations] = useState([]);
  const { activeUserId } = useContext(AuthContext);

  useEffect(() => {
    getAllOperations();
  }, []);

  const getAllOperations = async () => {
    try {
      const response = await service.get("/operation/allOperations/all");
      console.log(response.data);
      setAllOperations(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Compras</h3>

      {allOperations.map((eachOperation) => {
        return (
          <div>
            {activeUserId === eachOperation.buyerUser._id ? (
              <div>
                <h3>Album: {eachOperation.product.title}</h3>
                <h3>Banda: {eachOperation.product.artist}</h3>
                <img
                  style={{ width: 200 }}
                  src={eachOperation.product.image}
                  alt=""
                />
                <p>Usuario comprador: {eachOperation.buyerUser.name}</p>
                <p>Usuario vendedor: {eachOperation.sellerUser.name}</p>
                <p>Precio: {eachOperation.totalPrice}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default Compras;
