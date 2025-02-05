import Select from 'react-select'
import React, {useEffect, useState} from "react";
import {getDogBreeds, getMatch} from "../../api/api.ts";
import "./PetFilter.scss"
import Button from "../Button/Button.tsx";
import US_STATES from "../../constants/constants.ts";

type PetFilterProps = {
    filters: {breed: string | null, sorted: string},
    setFilters: (filters: any) => void;
    favorites: string[],
    setRenderMatch: (value: string | null) => void,
    setLocation: (value: any) => void,
    location: {state: string, city: string} | null
}
const PetFilter:React.FC<PetFilterProps> = ({filters, setFilters, favorites, setRenderMatch, setLocation, location}) => {

    const [dogBreedOptions, setDogBreedOptions] = useState<{label: string, value: string}[]>([]);
    const [cityVal, setCityVal] = useState<string | null>(null);

    useEffect(() => {
        getDogBreeds().then((data) => {
            let options = data.map((dataObj: any) =>  {
                return {label: dataObj, value: dataObj}
            })
            setDogBreedOptions(options)
        })
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if(cityVal?.trim() !== location?.city) {
                setLocation((prevFilters: any) => ({...prevFilters, city: cityVal}))
            }
        }, 500)
        return () => clearTimeout(handler)
    }, [cityVal])


    const handleMatch = () => {
        getMatch(favorites).then((data) => {
            setRenderMatch(data.match)
        })
    }

    return (
        <div>
            <div style={{display:"flex", gap:"1rem"}} className="flex flex-row flex-wrap justify-evenly">
                <div style={{gap:'1rem'}} className={"flex flex-row"}>
                    <label>City
                        <input
                            type="text"
                            onChange={(e) => setCityVal(e.target.value.trim())}
                            placeholder={"Enter City"}
                        />
                    </label>
                    <label>State
                    <Select
                        onChange={(e) => {
                            if (e) setLocation((prevFilters: any) => ({...prevFilters, state: e.value}))
                        }}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                height: 55,
                                fontSize: 16,
                                width: 120,
                                color: "black"
                            }),
                            option: (provided) => ({
                                ...provided,
                                color: 'black'
                            }),
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                padding: 0,
                                margin:0
                            }),
                        }}
                        placeholder={"state"}
                        options={US_STATES}
                        value={location?.state ? {label: `${location.state}`, value: location.state} : null}
                    />
                    </label>
                </div>
                <label>Age Range
                    <div style={{display: 'flex', gap: '10px'}}>
                        <input
                            style={{width: "100px"}}
                            aria-label={"max age"}
                            type="number"
                            placeholder={"minimum age"}
                            min={0} max={25}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value)) {
                                    setFilters((prevFilters: any) => ({
                                        ...prevFilters,
                                        minAge: parseInt(e.target.value)
                                    }))
                                }
                            }
                            }
                        />
                        <input
                            style={{width: "100px"}}
                            type="number"
                            placeholder={"maximum age"}
                            min={0} max={25}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if(!isNaN(value)) {
                                    setFilters((prevFilters: any) => ({...prevFilters, maxAge: parseInt(e.target.value)}))}
                                }
                            }
                        />
                    </div>
                </label>
                <div style={{display: 'flex'}}>
                    <label>Breed
                    <Select
                        onChange={(e) => {
                            if (e) setFilters((prevFilters: any) =>({...prevFilters, breed: e.value}))
                        }}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                height: 55,
                                fontSize: 16,
                                width: 150,
                                color: "black",
                            }),
                            option: (provided) => ({
                                ...provided,
                                color: 'black'
                            }),
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                padding: 0,
                                margin:0
                            }),
                        }}
                        placeholder={"breed"}
                        options={dogBreedOptions}
                        value={dogBreedOptions.find((option) => option.value === filters.breed) || null}
                    />
                    </label>
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
