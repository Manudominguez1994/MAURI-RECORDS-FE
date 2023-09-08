import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
function favoritos(props) {
  // console.log(props, "imrpime props");
  return (
    <div>
      <h3>Favoritos</h3>
      {props.userObj.favorite.map((eachVinyl) => {
        console.log("buscando el objeto vinilo", eachVinyl);
        return (
          <Link to={`/vinylDetails/${eachVinyl._id}`}>
            <div className="album-card">
              <img src={eachVinyl.image} alt="" style={{ width: 200 }} />
              <h2>{eachVinyl.title}</h2>
              <h3>{eachVinyl.artist}</h3>
              <p>{eachVinyl.price}€</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default favoritos;
