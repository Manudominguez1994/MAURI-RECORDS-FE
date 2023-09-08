import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Card from "react-bootstrap/Card";
import { Nav } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
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
      // console.log("aaaaaaa", response);
    } catch (error) {
      navigate("/error");
    }
  };

  const getAllOperations = async () => {
    try {
      const response = await service.get("/operation/allOperations/all");
      // console.log(response.data);
      setAllOperations(response.data);
      setSaleOnSaleButton(false);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <div className="ventas-container">
        <Nav>
          <Nav.Item>
            <Link onClick={handleOnSaleVinyls} className="enlaces">
              Ventas en curso
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link onClick={getAllOperations} className="enlaces">
              Ventas realizadas
            </Link>
          </Nav.Item>
        </Nav>
      </div>
      <div>
        {onsaleSale === true ? (
          <div>
            <h3>Ventas en curso</h3>
            {onSaleVinyls.map((eachVinyl) => {
              return (
                <Link to={`/vinylDetails/${eachVinyl._id}`} className="enlaces">
                  <div className="album-card">
                    <img style={{ width: 200 }} src={eachVinyl.image} alt="" />
                    <h3>{eachVinyl.title}</h3>

                    <h3>{eachVinyl.artist}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <h3>Ventas realizadas</h3>
            {allOperations.map((eachOperation) => {
              const año = eachOperation.createdAt.slice(0, 4);
              const mes = eachOperation.createdAt.slice(5, 7);
              const dia = eachOperation.createdAt.slice(8, 10);

              return (
                <div>
                  {activeUserId === eachOperation.sellerUser._id ? (
                    <div className="album-card">
                      <img
                        style={{ width: 200 }}
                        src={eachOperation.product.image}
                        alt=""
                      />
                      <h3> {eachOperation.product.title}</h3>
                      <h3> {eachOperation.product.artist}</h3>

                      <p>Usuario comprador: {eachOperation.buyerUser.name}</p>

                      <p>Usuario vendedor: {eachOperation.sellerUser.name}</p>

                      <p>{eachOperation.totalPrice}€</p>

                      <p>
                        Fecha de operación:{" "}
                        {`Has vendido tu vinilo el ${dia} del ${mes} del ${año}`}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Ventas;
