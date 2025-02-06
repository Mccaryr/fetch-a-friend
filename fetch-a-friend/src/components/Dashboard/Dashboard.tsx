import DogList from "../DogList/DogList.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import PetFilter from "../PetFilter/PetFilter.tsx";
import {useEffect, useState} from "react";
import {getDogs, getDogsSearch, getLocationSearch} from "../../api/api.ts";
import DogOfDestiny from "../DogOfDestiny/DogOfDestiny.tsx";
import Instructions from "../Instructions/Instructions.tsx";
import "./Dashboard.scss"
import {Dog} from "../../types.ts";

const Dashboard = () => {
    const {logout} = useAuth()
    const [filters, setFilters] = useState<
        {
            maxAge: number | null; minAge: number | null;
            sorted: string; size: number;
            breed: string | null; zipCodes: string[] | null
        }
        >
    ({
        breed: null, maxAge: null, minAge: null, sorted: "asc", size:25, zipCodes: null
    });
    const [dogData, setDogData] = useState<Dog[]>([])
    const [renderMatch, setRenderMatch] = useState<string | null>(null)
    const [favorites, setFavorites] = useState<string[]>([]);
    const [location, setLocation] = useState<{state: string, city: string} | null>(null)
    const [totalResults, setTotalResults] = useState<number>(0);
    const [from, setFrom] = useState<number>(0);

    const handleFavorite = (value: string) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(value) ? prevFavorites.filter((fav) => fav !== value) : [...prevFavorites, value]);
    }

    useEffect(() => {
        const mergedFilters = {...filters, from: 0}
        getDogsSearch(mergedFilters).then((data) => {
            setTotalResults(data.total)
            getDogs(data.resultIds).then((getDogsData) => setDogData(getDogsData))
        })
    }, [filters])

    useEffect(() => {
        const mergedFilters = {...filters, from: from}
        getDogsSearch(mergedFilters).then((data) => {
            setTotalResults(data.total)
            getDogs(data.resultIds).then((getDogsData) => setDogData(getDogsData))
        })
    }, [from])

    useEffect(() => {
        if(!location) return
        const fetchZipCodes = async() => {
            /**
             * We fetch location objects(locationData), then format data into zip array,
             * Then we update state filters with zip array which should fetch results in useEffect
             */
            try {
                let zipCodes: string[] = []
                if(location.city || location.state) {
                    let locationData = await getLocationSearch(location)
                    zipCodes = locationData.results.map((loc: any) => loc.zip_code).filter((zip: any) => typeof zip === "string");
                }
                setFilters((prevFilters: any) => ({...prevFilters, zipCodes: zipCodes}))
            } catch(e) {
                console.log(e)
            }
        }

        fetchZipCodes()

    }, [location])

    return (
        <div className="w-full h-full relative">
            <div>
            {renderMatch &&  <DogOfDestiny match={renderMatch} setRenderMatch={setRenderMatch} />}
            {!renderMatch &&
                <div style={{display:"flex", flexDirection:"column", gap:"1rem", padding:'2rem'}}>
                    <Instructions />
                    <PetFilter
                        filters={filters} setFilters={setFilters}
                        favorites={favorites}
                        setRenderMatch={setRenderMatch}
                        setLocation={setLocation}
                        location={location}
                    />
                    <DogList
                        data={dogData}
                         handleFavorite={handleFavorite}
                        favorites={favorites}
                        filters={filters}
                        totalResults={totalResults}
                        setFrom={setFrom} from={from}
                    />
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
