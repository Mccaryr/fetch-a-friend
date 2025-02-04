import {DogList} from "@/components/DogList.tsx";
import {useAuth} from "@/auth/AuthContext.tsx";
import PetFilter from "@/components/PetFilter.tsx";
import {useEffect, useState} from "react";
import {getDogs, getDogsSearch, getMatch} from "@/api/api.ts";
import DogOfDestiny from "@/components/DogOfDestiny.tsx";

const Dashboard = () => {
    const {logout} = useAuth()
    const [filters, setFilters] = useState<{breed: string | null; maxAge: number | null; minAge: number | null}>({
        breed: null, maxAge: null, minAge: null
    });
    const [dogData, setDogData] = useState([])
    const [renderMatch, setRenderMatch] = useState(false)
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
        <div className="w-full h-full relative p-4">
            <div className="pt-8">
            {renderMatch &&  <DogOfDestiny />}
            {!renderMatch &&
                <>
                    <PetFilter filters={filters} setFilters={setFilters}/>
                    <DogList data={dogData} handleFavorite={handleFavorite} />
                    <button type="button" onClick={() => {
                        getMatch(favorites).then(() => {
                            setRenderMatch(true)
                        })
                    }}>
                        Find Fur-ever friend!
                    </button>
                </>
            }
            </div>

            <button style={{position: "absolute", top: 0, right: 0}} type="button" onClick={() => logout()}>Logout
            </button>
        </div>
    )
}
export default Dashboard
