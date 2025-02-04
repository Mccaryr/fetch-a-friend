
import {getMatch} from "../../api/api.ts";
import {useState} from "react";
import DogCard from "../DogCard/DogCard.tsx";
import './DogList.scss'

const dogTestData = [
    {
        "img": "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg",
        "name": "Emory",
        "age": 10,
        "breed": "Chihuahua",
        "zip_code": "48333",
        "id": "VXGFTIcBOvEgQ5OCx40W"
    },
    {
        "img": "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg",
        "name": "Jena",
        "age": 8,
        "breed": "Chihuahua",
        "zip_code": "25275",
        "id": "V3GFTIcBOvEgQ5OCx40W"
    },
    {
        "img": "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg",
        "name": "Jenifer",
        "age": 14,
        "breed": "Chihuahua",
        "zip_code": "11962",
        "id": "WHGFTIcBOvEgQ5OCx40W"
    },
    {
        "img": "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1152.jpg",
        "name": "Carolyne",
        "age": 3,
        "breed": "Chihuahua",
        "zip_code": "17089",
        "id": "W3GFTIcBOvEgQ5OCx40W"
    }
]

type TableDemoProps = {
    data: {breed: string, age: number, name: string, id: string, zip_code: string, img:string}[],
    handleFavorite: (id: string) => void
}

export const DogList:React.FC<TableDemoProps> = ({data, handleFavorite}) => {


    return (
        <>
        <div style={{gap:'1rem'}} className="flex flex-wrap justify-evenly">
            {dogTestData.map((dog) => (
                <DogCard dog={dog} handleFavorite={handleFavorite} />
            ))}
        </div>
            <div className={"nav-arrows-container"}>
                <button><i className="fa-regular fa-circle-left"></i></button>
                <button><i className="fa-regular fa-circle-right"></i></button>
            </div>
        </>
    )
}

export default DogList;