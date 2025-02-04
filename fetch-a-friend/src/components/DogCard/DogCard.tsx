import React from "react";
import "./DogCard.scss"

type DogCardProps = {
    dog: {
        name: string,
        id: string,
        age: number,
        breed: string,
        img: string,
        zip_code: string,
    },
    handleFavorite: (id: string) => void,
}
const DogCard:React.FC<DogCardProps> = ({dog, handleFavorite}) => {
    return (
        <div style={{borderRadius: "10px"}} className="dog-card">
            <div>
                <img src={dog.img} alt={`${dog.name} image`}/>
            </div>
            <div className="flex flex-row justify-evenly">
                <p>Name:{dog.name}</p>
                <p>Age:{dog.age}</p>
            </div>
            <div className="flex flex-row justify-evenly">
                <p>Breed:{dog.breed}</p>
                <p>Zip:{dog.zip_code}</p>
            </div>
            <button className={"fav-btn"} onClick={() => handleFavorite(dog.id)}><i className="fa-solid fa-heart"/>
            </button>
        </div>
    )
}
export default DogCard
