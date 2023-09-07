import { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
import EditImage from "../components/EditImage";
import Favoritos from "./Favoritos";
import Compras from "../components/Compras";
import Ventas from "../components/Ventas";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function UserProfile() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState(null);
  const [numValue, setNumValue] = useState(0);

  useEffect(() => {
    
    setTimeout(() => {
      getUserObj();
    }, 2000);
  }, []);

  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      // console.log("auqi mi usuario en FO", response.data);
      setUserObj(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handlenumValue1 = () => {
    setNumValue(1);
  };
  const handlenumValue2 = () => {
    setNumValue(2);
  };
  const handlenumValue3 = () => {
    setNumValue(3);
  };

  if (userObj === null) {
    return (
     <>
     
      <Spinner animation="grow" variant="primary" />
     </>
    )
  }

  return (
    <div className="divProfileFather">
      <div className="divProfileData">
        <Card style={{ width: 500 }} className="divProfileData">
          <Card.Img
            variant="top"
            src={userObj.image}
            alt="imageprofile"
            style={{ width: 300, padding: 50, }}
          />
          <Card.Body>
            <Card.Title>
              <h2>{userObj.name}</h2>
            </Card.Title>
            <Card.Text>
              {" "}
              <p>{userObj.email}</p>
            </Card.Text>
            <Card.Text>
              {" "}
              <h4>{userObj.city}</h4>
            </Card.Text>

            <Nav>
              <Nav.Item>
                <Link to={"/edit-image"} className="enlaces">Editar Imagen</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={"/edit-profile"} className="enlaces">Editar Perfil</Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>
      </div>
     
        <div className="divPestañasYData">
          <div className="divProfilePestañas">
            
            
                <Button variant="outline-secondary" onClick={handlenumValue1} style={{marginLeft:10,marginRight:10}}>Compras</Button>
              
            
                <Button variant="outline-secondary" onClick={handlenumValue2} style={{marginLeft:10,marginRight:10}}>Ventas</Button>
              
            
                <Button variant="outline-secondary" onClick={handlenumValue3} style={{marginLeft:10,marginRight:10}}>Favoritos</Button>
              
            
          </div>
          <div className="divProfilePestañasContent">
            {numValue === 1 ? <Compras /> : null}
            {numValue === 2 ? <Ventas /> : null}
            {numValue === 3 ? <Favoritos userObj={userObj} /> : null}
          </div>
        </div>
      
    </div>
  );
}

export default UserProfile;
