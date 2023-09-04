import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function AllVinyls() {
  const navigate = useNavigate();

  // const AllGenre = ["Rock", "Pop", "Hip-Hop", "Jazz", "Electronica", "Soul", "Reagge","Otros"]

  const { activeUserId } = useContext(AuthContext);
  const [allVinyls, setAllVinyls] = useState([]);

  useEffect(() => {
    getAllVinyls();
  }, []);

  const getAllVinyls = async () => {
    try {
      const response = await service.get("/vinyl/allVinyls");
      setAllVinyls(response.data);
      // console.log(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handlefilterRock = () => {
    const rockVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Rock");
    setAllVinyls(rockVinyls);
  }
  const handlefilterPop = () => {
    const popVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Pop");
    setAllVinyls(popVinyls);
  }
  const handlefilterHipHop = () => {
    const hiphopVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Hip-Hop");
    setAllVinyls(hiphopVinyls);
  }
  const handlefilterJazz = () => {
    const jazzVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Jazz");
    setAllVinyls(jazzVinyls);
  }
  const handlefilterElectronica = () => {
    const electronicaVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Electronica");
    setAllVinyls(electronicaVinyls);
  }
  const handlefilterSoul = () => {
    const soulVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Soul");
    setAllVinyls(soulVinyls);
  }
  const handlefilterReagge = () => {
    const reaggeVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Reagge");
    setAllVinyls(reaggeVinyls);
  }
  const handlefilterOther = () => {
    const otherVinyls = allVinyls.filter((vinyl)=> vinyl.genre === "Otros");
    setAllVinyls(otherVinyls);
  }

  
  const handleAddFavorite = async (vinylId) => {
    try {
      await service.put(`/user/${vinylId}/fav`);
      console.log("añadido a fav");
    } catch (error) {
      navigate("/error");
    }
  };

  if(allVinyls.length === 0){
    return(
      <div>
    <h3>No hay vinilos de este genero</h3>
    <Link onClick={getAllVinyls}><h5>Todos los vinilos</h5></Link> 
    </div>
    ) 
  }

  return (
    <div>
      <div>
      {/* {AllGenre.map((eachGenre)=>{
          return(
            <>
              <button>{eachGenre}</button>
            </>
          )
      })} */}
      <button onClick={handlefilterRock}>Rock</button>
      <button onClick={handlefilterPop}>Pop</button>
      <button onClick={handlefilterHipHop}>Hip-Hop</button>
      <button onClick={handlefilterJazz}>Jazz</button>
      <button onClick={handlefilterElectronica}>Electronica</button>
      <button onClick={handlefilterSoul}>Soul</button>
      <button onClick={handlefilterReagge}>Reagge</button>
      <button onClick={handlefilterOther}>Otros</button>
      <Link onClick={getAllVinyls}><h5>Todos los vinilos</h5></Link>      
      </div>
      <div>
      {allVinyls.map((eachVinyl) => {
        // console.log(eachVinyl.sellerUser)
        // console.log(activeUserId)
        return (
          <div key={eachVinyl._id}>
            <h2>{eachVinyl.title}</h2>
            <h4>{eachVinyl.artist}</h4>
            <img src={eachVinyl.image} alt="image" />
            <p>{eachVinyl.price}</p>
            <p>{eachVinyl.genre}</p>
            <Link to={`/vinylDetails/${eachVinyl._id}`}>
              <button>Destalles</button>
            </Link>
            {eachVinyl.sellerUser !== activeUserId ? (
              <button onClick={() => handleAddFavorite(eachVinyl._id)}>
                Favoritos
              </button>
            ) : null}
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default AllVinyls;
