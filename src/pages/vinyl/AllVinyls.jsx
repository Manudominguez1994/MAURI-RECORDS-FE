import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function AllVinyls() {
  const navigate = useNavigate();

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
  const handleAddFavorite = async (vinylId) => {
    try {
      await service.put(`/user/${vinylId}/fav`);
      console.log("añadido a fav");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
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
  );
}

export default AllVinyls;
