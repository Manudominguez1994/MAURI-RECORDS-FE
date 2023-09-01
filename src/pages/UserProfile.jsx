import React, { useEffect, useState } from "react";
import service from "../services/service.config";
import imageProfile from "../assets/profile-picture-default-png.png";
function UserProfile() {
  const [userObj, setUserObj] = useState("");

  useEffect(() => {
    getUserObj();
  }, []);

  const getUserObj = async () => {
    try {
      const response = await service.get("/user/myprofile");
      console.log("auqi mi usuario en FO", response.data);
      setUserObj(response.data);
    } catch (error) {}
  };

  return (
    <div>
      <h2>{userObj.name}</h2>
      {userObj.image === "" ? <img src={imageProfile} alt="imageProfile" style={{width: 250}} /> : null}
      <p>{userObj.email}</p>
      <h4>{userObj.city}</h4>
      <div>
        <button>Compras</button>
        <button>Ventas</button>
        <button>Editar Perfil</button>        
      </div>
      <div>
        <h3>Favoritos</h3>
      </div>
    </div>
  );
}

export default UserProfile;
