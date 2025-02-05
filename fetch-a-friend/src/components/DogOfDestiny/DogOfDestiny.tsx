import {Dog} from "../../types.ts";
import './DogOfDestiny.scss'
import {useEffect, useState} from "react";
import {getDogs} from "../../api/api.ts";

type DogOfDestinyProps =  {match: string; setRenderMatch: (value: null | string) => void };

const DogOfDestiny = ({match, setRenderMatch}: DogOfDestinyProps) => {
    const [destinyDog, setDestinyDog] = useState<Dog | null>(null);

    useEffect(() => {
        getDogs([match]).then((data) => {
            setDestinyDog(data[0]);
        })
    }, [match]);

    return (
        <div className={"background"}>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <h1>{`Your soulmate is ${destinyDog?.name}!`}</h1>
            <button style={{marginLeft: '17rem', borderRadius: '1rem', backgroundColor:'transparent'}} onClick={() => setRenderMatch(null)}>
                <i style={{fontSize: '40px'}} className="fa-solid fa-xmark" />
            </button>
            <div style={{borderRadius: "10px"}} className="dog-card">
                <div>
                    <img src={destinyDog?.img} alt={`${destinyDog?.name} image`}/>
                </div>
                <div className="flex flex-row justify-evenly">
                    <p>Name:{destinyDog?.name}</p>
                    <p>Age:{destinyDog?.age}</p>
                </div>
                <div className="flex flex-row justify-evenly">
                    <p>Breed:{destinyDog?.breed}</p>
                    <p>Zip:{destinyDog?.zip_code}</p>
                </div>
            </div>
        </div>
        </div>
    )
}
export default DogOfDestiny
