import DogList from "../DogList/DogList.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import PetFilter from "../PetFilter/PetFilter.tsx";
import {useEffect, useState} from "react";
import {getDogs, getMatch} from "../../api/api.ts";
import DogOfDestiny from "../DogOfDestiny/DogOfDestiny.tsx";
import Instructions from "../Instructions/Instructions.tsx";
import "./Dashboard.scss"
import {Dog} from "../../types.ts";

const Dashboard = () => {
    const {logout} = useAuth()
    const [filters, setFilters] = useState<{breed: string | null; maxAge: number | null; minAge: number | null, range: string | null}>({
        breed: null, maxAge: null, minAge: null, range: null
    });
    const [dogData, setDogData] = useState([])
    const [renderMatch, setRenderMatch] = useState<Dog | null>(null)
    const [favorites, setFavorites] = useState<string[]>([]);

    const handleFavorite = (value: string) => {
        if (!favorites.includes(value)) {
            setFavorites((prevFavorites) => [...prevFavorites, value])
        }
    }

    // useEffect(() => {
    //     getDogsSearch(filters).then((data) => {
    //         getDogs(data).then((getDogsData) => setDogData(getDogsData))
    //     })
    // }, [filters])

    return (
        <div className="w-full h-full relative">
            <div style={{padding:'2rem'}}>
            {renderMatch &&  <DogOfDestiny match={renderMatch} setRenderMatch={setRenderMatch} />}
            {!renderMatch &&
                <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                    <Instructions />
                    <PetFilter filters={filters} setFilters={setFilters} favorites={favorites} setRenderMatch={setRenderMatch} />
                    <DogList data={dogData} handleFavorite={handleFavorite} />
                </div>
            }
            </div>

            <button className={"logout-btn"} type="button" onClick={() => logout()}>
                <i style={{fontSize:'30px'}} className="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
    )
}
export default Dashboard
