import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "../../services/service.config"


function AllVinyls() {

    const navigate = useNavigate()
    
    const [allVinyls, setAllVinyls] = useState([])
    

    useEffect (()=>{
        getAllVinyls()
    },[])

    const getAllVinyls = async () => {
        try {
        const response =    await service.get("/vinyl/allVinyls")
            setAllVinyls(response.data)
            // console.log(response.data);
        } catch (error) {
            navigate("/error")
        }
    }
  
    
  return (
    <div>
       
        {allVinyls.map((eachVinyl)=>{
            return (
                <div key={eachVinyl._id}>
                    <h2>{eachVinyl.title}</h2>
                    <h4>{eachVinyl.artist}</h4>
                    <img src={eachVinyl.image} alt="image" />                    
                    <p>{eachVinyl.price}</p>                 
                    <p>{eachVinyl.genre}</p>
                    <Link to={`/vinylDetails/${eachVinyl._id}`}><button>Destalles</button></Link>                   
                </div>
            )
        })}

    </div>
  )
}

export default AllVinyls