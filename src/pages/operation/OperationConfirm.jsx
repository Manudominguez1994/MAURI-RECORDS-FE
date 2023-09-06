import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";

function OperationConfirm() {
  const [operationConfirm, setOperationConfirm] = useState("");
  const [buttonValue, setButtonValue] = useState(true);

  
  const navigate = useNavigate();

  const params = useParams();
  console.log("id dinamnica de operation", params);

  useEffect(() => {
    getOperationConfirm();
    // handleOnsale();
    setButtonValue(true);
  }, []);

  const getOperationConfirm = async () => {
    try {
      const operation = await service.get(`/operation/${params.operationId}`);
      setOperationConfirm(operation.data);
      console.log(
        "aquí recibo el objeto de la operación desde BE",
        operation.data
      );  
    } catch (error) {
      console.log("Este error lo odio");
      navigate("/error");
    }
  };


  const handleButtonChange = () => {
    setButtonValue(false);
  };

  if (operationConfirm === "") {
    return <h3>confirmando operación</h3>;
  }


  const año = operationConfirm.createdAt.slice(0, 4)
  const mes = operationConfirm.createdAt.slice(5, 7)
  const dia = operationConfirm.createdAt.slice(8, 10)
  
  return (
    

    <div>
      {buttonValue === true ? (
        <div>
          <h3>Album: {operationConfirm.product.title}</h3>
          <h3>Banda: {operationConfirm.product.artist}</h3>
          <img
            style={{ width: 200 }}
            src={operationConfirm.product.image}
            alt=""
          />
          <p>Usuario comprador: {operationConfirm.buyerUser.name}</p>
          <p>Usuario vendedor: {operationConfirm.sellerUser.name}</p>
          <p>Precio: {operationConfirm.totalPrice}</p>
          <p>Fecha de operación: {`La operación se ha realizado el ${dia} del ${mes} del ${año}`} </p>

          <button onClick={handleButtonChange}>Confirmar compra</button>
        </div>
      ) : (
        <div>
          <h2>¡Ya tienes tu vinilo!</h2>
          <p>
            Si quieres seguir dejando panoja pulsa <Link to={"/"}>aquí</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default OperationConfirm;
