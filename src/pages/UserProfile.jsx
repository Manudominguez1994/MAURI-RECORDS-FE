import  { useEffect, useState } from "react";
import service from "../services/service.config";
import { Link, useNavigate } from "react-router-dom";
function UserProfile() {
  const navigate = useNavigate()
  const [userObj, setUserObj] = useState("");

  useEffect(() => {
    getUserObj();
  }, []);

  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      // console.log("auqi mi usuario en FO", response.data);
      setUserObj(response.data);
    } catch (error) {
      navigate('/error')
    }
  };

  return (
    <div>
      <h2>{userObj.name}</h2>
      <img src={userObj.image} alt="imageprofile" style={{width:250}} />
      <p>{userObj.email}</p>
      <h4>{userObj.city}</h4>
      <div>
        <button>Compras</button>
        <button>Ventas</button>
        <Link to={"/edit-profile"}><button >Editar Perfil</button></Link> 
      </div>
      <div>
        <h3>Favoritos</h3>
      </div>
    </div>
  );
}

export default UserProfile;
