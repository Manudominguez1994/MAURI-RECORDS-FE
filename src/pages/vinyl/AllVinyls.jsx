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
  const [allVinylsClone, setAllVinylsClone] = useState(allVinyls);
  const [queryVinyl, setQueryVinyl] = useState("");

  useEffect(() => {
    getAllVinyls();
  }, []);

  const getAllVinyls = async () => {
    try {
      const response = await service.get("/vinyl/allVinyls");
      setAllVinyls(response.data);
      setAllVinylsClone(response.data);
      // console.log(response.data);
    } catch (error) {
      navigate("/error");
    }
  };
  const handleAll = () =>{
    setAllVinylsClone(allVinyls)
  }

  const handlefilterRock = () => {
    const rockVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Rock");
    setAllVinylsClone(rockVinyls);
  };
  const handlefilterPop = () => {
    const popVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Pop");
    setAllVinylsClone(popVinyls);
  };
  const handlefilterHipHop = () => {
    const hiphopVinyls = allVinyls.filter(
      (vinyl) => vinyl.genre === "Hip-Hop"
    );
    setAllVinylsClone(hiphopVinyls);
  };
  const handlefilterJazz = () => {
    const jazzVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Jazz");
    setAllVinylsClone(jazzVinyls);
  };
  const handlefilterElectronica = () => {
    const electronicaVinyls = allVinyls.filter(
      (vinyl) => vinyl.genre === "Electronica"
    );
    setAllVinylsClone(electronicaVinyls);
  };
  const handlefilterSoul = () => {
    const soulVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Soul");
    setAllVinylsClone(soulVinyls);
  };
  const handlefilterReagge = () => {
    const reaggeVinyls = allVinyls.filter(
      (vinyl) => vinyl.genre === "Reagge"
    );
    setAllVinylsClone(reaggeVinyls);
  };
  const handlefilterOther = () => {
    const otherVinyls = allVinyls.filter(
      (vinyl) => vinyl.genre === "Otros"
    );
    setAllVinylsClone(otherVinyls);
  };

  const handleOperationCreate = async (patata) => {
    // event.preventDefault();
    try {
      const operationObj = await service.post(
        `/operation/create/${patata}`
      );
      // console.log('este es el vinilo que quiero comprar', operationObj.data._id)

      navigate(`/operationConfirm/${operationObj.data._id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleAddFavorite = async (vinylId) => {
    try {
      await service.put(`/user/${vinylId}/fav`);
      console.log("añadido a fav");
    } catch (error) {
      navigate("/error");
    }
  };
  const handleShearchinput = (event) => {
    setQueryVinyl(event.target.value);
  };

  const handleShearch = () => {
    const vinylfilter = allVinyls.filter((eachVinyl) => {
      if (
        eachVinyl.title.includes(queryVinyl) === true ||
        eachVinyl.artist.includes(queryVinyl)
      ) {
        return true;
      } else {
        return false;
      }
    });

    setAllVinylsClone(vinylfilter);
    setQueryVinyl("");
  };

  if (allVinylsClone.length === 0) {
    return (
      <div>
        <h3>No hay vinilos de este genero</h3>
        <Link onClick={handleAll}>
          <h5>Todos los vinilos</h5>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <form>
          <label htmlFor="query"></label>
          <input
            type="text"
            name="query"
            value={queryVinyl}
            onChange={handleShearchinput}
          />
        </form>
        <button onClick={handleShearch}>Buscar</button>
      </div>
      <div>
        <button onClick={handlefilterRock}>Rock</button>
        <button onClick={handlefilterPop}>Pop</button>
        <button onClick={handlefilterHipHop}>Hip-Hop</button>
        <button onClick={handlefilterJazz}>Jazz</button>
        <button onClick={handlefilterElectronica}>Electronica</button>
        <button onClick={handlefilterSoul}>Soul</button>
        <button onClick={handlefilterReagge}>Reagge</button>
        <button onClick={handlefilterOther}>Otros</button>
        <Link onClick={handleAll}>
          <h5>Todos los vinilos</h5>
        </Link>
      </div>
      <div>
        
        {allVinylsClone.map((eachVinyl) => {
          // console.log(eachVinyl.sellerUser)
          // console.log(activeUserId)
          return (
            <>
             
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
                    <>
                    <button onClick={()=> handleOperationCreate(eachVinyl._id)}>Comprar</button>
                    <button onClick={() => handleAddFavorite(eachVinyl._id)}>
                      Favoritos
                    </button>
                    </>
                  ) : null}
                </div>
             
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AllVinyls;
