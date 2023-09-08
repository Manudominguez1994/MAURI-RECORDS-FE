import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/service.config";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

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
  const handleAll = () => {
    setAllVinylsClone(allVinyls);
  };

  const handlefilterRock = () => {
    const rockVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Rock");
    setAllVinylsClone(rockVinyls);
  };
  const handlefilterPop = () => {
    const popVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Pop");
    setAllVinylsClone(popVinyls);
  };
  const handlefilterHipHop = () => {
    const hiphopVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Hip-Hop");
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
    const reaggeVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Reagge");
    setAllVinylsClone(reaggeVinyls);
  };
  const handlefilterOther = () => {
    const otherVinyls = allVinyls.filter((vinyl) => vinyl.genre === "Otros");
    setAllVinylsClone(otherVinyls);
  };

  const handleOperationCreate = async (patata) => {
    // event.preventDefault();
    try {
      const operationObj = await service.post(`/operation/create/${patata}`);
      // console.log('este es el vinilo que quiero comprar', operationObj.data._id)

      navigate(`/operationConfirm/${operationObj.data._id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleAddFavorite = async (vinylId) => {
    try {
      await service.put(`/user/${vinylId}/fav`);
      // console.log("añadido a fav");
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
      <div className="allVinyls-container">
        <div style={{ textAlign: "center" }}>
          <div className="searchAndBtn">
            <Form>
              <InputGroup>
                <div className="search-input">
                  <Form.Control
                    type="text"
                    name="query"
                    value={queryVinyl}
                    onChange={handleShearchinput}
                    placeholder="Busca tu album o artista favorito"
                  />
                </div>
                <Button variant="warning" onClick={handleShearch}>
                  Buscar
                </Button>
              </InputGroup>
            </Form>
          </div>
        </div>
        <div>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterRock}
          >
            Rock
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterPop}
          >
            Pop
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterHipHop}
          >
            Hip-Hop
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterJazz}
          >
            Jazz
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterElectronica}
          >
            Electronica
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterSoul}
          >
            Soul
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterReagge}
          >
            Reagge
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handlefilterOther}
          >
            Otros
          </Button>
          <Button
            className="genre-btn"
            variant="outline-warning"
            onClick={handleAll}
          >
            Todos
          </Button>
        </div>
        <h3>No hay vinilos de este genero</h3>
      </div>
    );
  }

  return (
    <div className="allVinyls-container">
      <div>
        <div className="searchAndBtn">
          <Form>
            <InputGroup>
              <div className="search-input">
                <Form.Control
                  type="text"
                  name="query"
                  value={queryVinyl}
                  onChange={handleShearchinput}
                  placeholder="Busca tu album o artista favorito"
                />
              </div>
              <Button variant="warning" onClick={handleShearch}>
                Buscar
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterRock}
        >
          Rock
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterPop}
        >
          Pop
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterHipHop}
        >
          Hip-Hop
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterJazz}
        >
          Jazz
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterElectronica}
        >
          Electronica
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterSoul}
        >
          Soul
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterReagge}
        >
          Reagge
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handlefilterOther}
        >
          Otros
        </Button>
        <Button
          className="genre-btn"
          variant="outline-warning"
          onClick={handleAll}
        >
          Todos
        </Button>
      </div>
      <div className="allVinyls-container">
        {allVinylsClone.map((eachVinyl) => {
          return (
            <div className="allVinyls-container-flex">
              <div className="album-card" key={eachVinyl._id}>
                <div className="album-image-container">
                  <img
                    className="album-image"
                    src={eachVinyl.image}
                    alt="image"
                  />
                </div>

                <div className="album-props">
                  <h2>{eachVinyl.title}</h2>
                </div>
                <div className="album-props">
                  <h3>{eachVinyl.artist}</h3>
                </div>
                <div className="album-props">
                  <h5>{eachVinyl.price}€</h5>
                </div>
                <div className="album-props">
                  <h5>{eachVinyl.genre}</h5>
                </div>
                <div className="vinyl-card-btn">
                  <Link to={`/vinylDetails/${eachVinyl._id}`}>
                    <Button variant="warning">Detalles</Button>
                  </Link>
                  {eachVinyl.sellerUser !== activeUserId ? (
                    <>
                      <Link>
                        <Button
                          variant="warning"
                          onClick={() => handleOperationCreate(eachVinyl._id)}
                        >
                          Comprar
                        </Button>
                      </Link>
                      <Link>
                        <Button
                          variant="warning"
                          onClick={() => handleAddFavorite(eachVinyl._id)}
                        >
                          Favoritos
                        </Button>
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllVinyls;
