import {Dog} from "../../types.ts";

type DogOfDestinyProps =  {match:Dog; setRenderMatch: (value: null | Dog) => void };

const DogOfDestiny = ({match, setRenderMatch}: DogOfDestinyProps) => {
    const {name, img, age, zip_code, breed} = match;
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <h1>{`Your soulmate is ${name}!`}</h1>
            <button style={{marginLeft: '17rem', borderRadius: '1rem', backgroundColor:'transparent'}} onClick={() => setRenderMatch(null)}>
                <i style={{fontSize: '40px'}} className="fa-solid fa-xmark" />
            </button>
            <div style={{borderRadius: "10px"}} className="dog-card">
                <div>
                    <img src={img} alt={`${name} image`}/>
                </div>
                <div className="flex flex-row justify-evenly">
                    <p>Name:{name}</p>
                    <p>Age:{age}</p>
                </div>
                <div className="flex flex-row justify-evenly">
                    <p>Breed:{breed}</p>
                    <p>Zip:{zip_code}</p>
                </div>
            </div>
        </div>
    )
}
export default DogOfDestiny
