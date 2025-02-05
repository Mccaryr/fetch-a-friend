
import React from "react";
import DogCard from "../DogCard/DogCard.tsx";
import './DogList.scss'


type DogListProps = {
    data: {breed: string, age: number, name: string, id: string, zip_code: string, img:string}[],
    handleFavorite: (id: string) => void,
    favorites: string[],
    setFilters: (filters: any) => void,
    filters: {breed: string | null, sorted: string, from: number, size: number},
}

export const DogList:React.FC<DogListProps> = ({data, handleFavorite, favorites, setFilters, filters}) => {

    const handlePagination = (type: "back" | "forward") => {
        if(type === "back") {
            setFilters((prevFilters: any) => ({...prevFilters, from: Math.max(0, filters.from - filters.size)}))
        } else {
            setFilters((prevFilters: any) => ({...prevFilters, from: filters.from + filters.size}))
        }
    }

    return (
        <>
        <div style={{gap:'1rem', marginTop:'2rem'}} className="flex flex-wrap justify-evenly">
            {data && data.length > 0 && data.map((dog) => (
                <DogCard dog={dog} handleFavorite={handleFavorite} favorites={favorites}/>
            ))}
        </div>
            {data && data.length > 0 ?
                <div className={"nav-arrows-container"}>
                    {filters.from !== 0 &&
                        <button onClick={() => handlePagination("back")}>
                            <i className="fa-regular fa-circle-left"></i>
                        </button>
                    }
                    {filters.from !== 1000 &&
                        <button onClick={() => handlePagination("forward")}>
                            <i className="fa-regular fa-circle-right"></i>
                        </button>
                    }
                </div>
                :
                <p>No doggos found that matched your search criteria</p>
            }
        </>
    )
}

export default DogList;