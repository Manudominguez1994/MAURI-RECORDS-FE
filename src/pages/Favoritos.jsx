

function favoritos(props) {
  console.log(props,"imrpime props");
  return (
    <div>
      <h3>Favoritos</h3>
      {props.userObj.favorite.map((eachVinyl) => {
          console.log("buscando el objeto vinilo", eachVinyl);
          return (
            <>
              <h2>{eachVinyl.title}</h2>
              <h3>{eachVinyl.artist}</h3>
              {/* <img src="" alt="" /> */}
              <p>{eachVinyl.price}</p>
            </>
          );
        })}
    </div>
  )
}

export default favoritos