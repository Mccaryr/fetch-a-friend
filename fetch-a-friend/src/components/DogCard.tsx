import React from "react";

type DogCardProps = {
    dog: {
        name: string,
        id: string,
        age: number,
        breed: string,
        img: string
    },
    handleFavorite: (id: string) => void,
}
const DogCard:React.FC<DogCardProps> = ({dog, handleFavorite}) => {
    return (
        <div style={{borderRadius:"10px"}} className="flex flex-col border-white border-2  p-4 w-[250px] h-1/4 flex-shrink-0">
            <div>
                <img className="w-full h-[200px] object-cover" src={dog.img} alt={`${dog.name} image`}/>
            </div>
            <div className="flex flex-row justify-evenly">
                <p>Name:{dog.name}</p>
                <p>Age:{dog.age}</p>
            </div>
            <div className="text-center">
                <p>Breed:{dog.breed}</p>
            </div>
            <button onClick={() => handleFavorite(dog.id)}>Favorite</button>
        </div>
    )
}
export default DogCard
