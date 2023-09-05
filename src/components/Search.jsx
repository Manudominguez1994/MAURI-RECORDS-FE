import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [allVinyls, setAllVinyls] = useState([]);
  const [queryVinyl, setQueryVinyl] = useState("");
  //   const [vinylFilter, setVinylFilter] = useState([])
  const navigate = useNavigate();

  
  const handleSheach = async (event) => {
      setQueryVinyl(event.target.value);
      const vinylfilter = allVinyls.filter((eachVinyl) => {
      if (eachVinyl.title.includes(event.target.value) === true) {
          return true;
        } else {
            return false;
        }
    });
    setAllVinyls(vinylfilter);
};

useEffect(() => {
  getAllVinyls();
}, []);

const getAllVinyls = async () => {
  try {
    const response = await service.get("/vinyl/allVinyls");
    setAllVinyls(response.data);
    // console.log(response.data);
    navigate("/filteredVinyl")
  } catch (error) {
    navigate("/error");
  }
};
  return (
    <div>
      <form>
        <label htmlFor="query"></label>
        <input
          type="text"
          name="query"
          value={queryVinyl}
          onChange={handleSheach}
        />
        <button>Buscar</button>
      </form>
      <div>
        {allVinyls.map((eachvinyl) => {
          return <div>{eachvinyl.title}</div>;
        })}
      </div>
    </div>
  );
}

export default Search;
