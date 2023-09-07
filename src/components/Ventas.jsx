import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Ventas() {
  const navigate = useNavigate();
  const [allOperations, setAllOperations] = useState([]);
  const { activeUserId } = useContext(AuthContext);
  const [onSaleVinyls, setOnSaleVinyls] = useState([]);

  const [onsaleSale, setSaleOnSaleButton] = useState(null);

  useEffect(() => {
    getAllOperations();
    // handleOnSaleVinyls();
  }, []);

  const handleOnSaleVinyls = async () => {
    try {
      const response = await service.get("/vinyl/allVinyls/on-sale");
      setOnSaleVinyls(response.data);
      setSaleOnSaleButton(true);
      console.log("aaaaaaa", response);
    } catch (error) {
      navigate("/error");
    }
  };

  const getAllOperations = async () => {
    try {
      const response = await service.get("/operation/allOperations/all");
      console.log(response.data);
      setAllOperations(response.data);
      setSaleOnSaleButton(false);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <h3>Ventas</h3>

      <Link onClick={handleOnSaleVinyls}>Ventas en curso</Link>
      <Link onClick={getAllOperations}>Ventas realizadas</Link>

      {onsaleSale === true ? (
        <div>
          {onSaleVinyls.map((eachVinyl) => {
            return (
              <>
              <h3><Link to={`/vinylDetails/${eachVinyl._id}`}>{eachVinyl.title}</Link></h3>
              <h3>{eachVinyl.artist}</h3>
              <img src={eachVinyl.image} alt="" />
              </>
            )
          })}
        </div>
      ) : (
        <div>
          {allOperations.map((eachOperation) => {
            const año = eachOperation.createdAt.slice(0, 4);
            const mes = eachOperation.createdAt.slice(5, 7);
            const dia = eachOperation.createdAt.slice(8, 10);

            return (
              <>
                <div>
                  {activeUserId === eachOperation.sellerUser._id ? (
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
                      <p>
                        Fecha de operación:{" "}
                        {`Has vendido tu vinilo el ${dia} del ${mes} del ${año}`}
                      </p>
                    </div>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Ventas;
