import Select from 'react-select'
import {useEffect, useState} from "react";
import {getDogBreeds, getMatch} from "../../api/api.ts";
import "./PetFilter.scss"
import Button from "../Button/Button.tsx";

type PetFilterProps = {
    filters: {breed: string | null, range: string | null, sorted: string},
    setFilters: (filters: any) => void;
    favorites: string[],
    setRenderMatch: (value: string | null) => void
}
const PetFilter:React.FC<PetFilterProps> = ({filters, setFilters, favorites, setRenderMatch}) => {

    const [dogBreedOptions, setDogBreedOptions] = useState<{label: string, value: string}[]>([]);

    useEffect(() => {
        getDogBreeds().then((data) => {
            let options = data.map((dataObj: any) =>  {
                return {label: dataObj, value: dataObj}
            })
            setDogBreedOptions(options)
        })
    }, []);

    const handleMatch = () => {
        getMatch(favorites).then((data) => {
            setRenderMatch(data.match)
        })
        // setRenderMatch({ "img": "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg",
        //     "name": "Emory",
        //     "age": 10,
        //     "breed": "Chihuahua",
        //     "zip_code": "48333",
        //     "id": "VXGFTIcBOvEgQ5OCx40W"})
    }

    return (
        <div>
            <div className="flex flex-row flex-wrap justify-evenly">
                <div className={"flex flex-row"}>
                    <label>Location
                        <input
                            type="text"
                            onChange={(e) => setFilters((prevFilters: any) => ({...prevFilters, location: e.target.value}))}
                            placeholder={"Enter City, State, or Zip"}
                        />
                    </label>
                    <Select
                        onChange={(e) => {
                            if (e) setFilters((prevFilters: any) => ({...prevFilters, range: e.value}))
                        }}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                height: 50,
                                fontSize: 16,
                                width: 120,
                                color: "black"
                            }),
                            option: (provided) => ({
                                ...provided,
                                color: 'black',
                            }),
                        }}
                        className={"dropdown"}
                        placeholder={"distance"}
                        options={[{label: "25 mi", value: "25"}, {label: "50 mi", value: "50"}, {
                            label: "75 mi",
                            value: "75"
                        }, {label: "100 mi", value: "100"}]}
                        value={filters.range ? {label: `${filters.range} mi`, value: filters.range} : null}
                    />
                </div>
                <label>Age Range
                    <div style={{display: 'flex', gap: '10px'}}>
                        <input
                            style={{width: "100px"}}
                            aria-label={"max age"}
                            type="number"
                            placeholder={"minimum age"}
                            min={0} max={25}
                            onChange={(e) => setFilters((prevFilters: any) => ({...prevFilters, maxAge: parseInt(e.target.value)}))}
                        />
                        <input
                            style={{width: "100px"}}
                            type="number"
                            placeholder={"maximum age"}
                            min={0} max={25}
                            onChange={(e) => setFilters((prevFilters: any) => ({...prevFilters, minAge: parseInt(e.target.value)}))}
                        />
                    </div>
                </label>
                <div style={{display: 'flex'}}>
                    <Select
                        onChange={(e) => {
                            if (e) setFilters((prevFilters: any) =>({...prevFilters, breed: e.value}))
                        }}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                height: 50,
                                fontSize: 16,
                                width: 150,
                                color: "black"
                            }),
                            option: (provided) => ({
                                ...provided,
                                color: 'black',
                            }),
                        }}
                        className={"dropdown"}
                        placeholder={"breed"}
                        options={dogBreedOptions}
                        value={dogBreedOptions.find((option) => option.value === filters.breed) || null}
                    />
                    <div className={"breed-sort-container"}>
                    <button onClick={() => setFilters((prevFilters: any) => ({...prevFilters, sorted: "asc"}))}>
                        <i className={`fa-solid fa-sort-up ${filters.sorted === "asc" ? "sorting" : ''}`} />
                    </button>
                    <button onClick={() => setFilters((prevFilters: any) => ({...prevFilters, sorted: "desc"}))}>
                        <i className={`fa-solid fa-sort-down ${filters.sorted === "desc" ? "sorting" : ''}`} />
                    </button>
                    </div>
                </div>
                {favorites.length > 0 &&
                    <div style={{marginTop: '15px', marginBottom: '15px'}}>
                        <Button type="button" action={() => handleMatch()} text={"Find Fur-ever friend!"}/>
                    </div>
                }
            </div>
        </div>
    )
}
export default PetFilter
