import Select from 'react-select'
import {useEffect, useState} from "react";
import {getDogBreeds} from "@/api/api.ts";

type PetFilterProps = {
    filters: {breed: string | null},
    setFilters: (filters: any) => void;
}
const PetFilter:React.FC<PetFilterProps> = ({filters, setFilters}) => {

    const [dogBreedOptions, setDogBreedOptions] = useState<{label: string, value: string}[]>([]);

    // useEffect(() => {
    //     getDogBreeds().then((data) => {
    //         console.log(data)
    //         let options = data.map((dataObj: any) =>  {
    //             return {label: dataObj, value: dataObj}
    //         })
    //         setDogBreedOptions(options)
    //     })
    // }, []);

    return (
        <div>
            <p>Please use the filters below to find your forever friend.</p>
            <div className="flex flex-row flex-wrap justify-evenly">
            <input
                className="w-[100px] h-[40px] text-center"
                type="text"
                onChange={(e) => console.log(e)}
                placeholder={"zipcode"}
            />
            <Select
                onChange={(e) => {
                    if (e) setFilters({...filters, breed: e.value})
                }}
                className="w-[100px] h-[40px]"
                placeholder={"breed"}
                options={dogBreedOptions}
                value={dogBreedOptions.find((option) => option.value === filters.breed) || null}
            />
            <label className="block text-sm font-medium text-gray-700">Min Age
                <input
                    className="w-[100px] h-[40px] text-center"
                    type="number"
                    placeholder={"minimum age"}
                    min={0} max={25}
                    onChange={(e) => setFilters({...filters, minAge: parseInt(e.target.value)})}
                />
            </label>
            <label  className="block text-sm font-medium text-gray-700">Max Age
                <input
                    aria-label={"max age"}
                    className="w-[100px] h-[40px] text-center"
                    type="number"
                    placeholder={"maximum age"}
                    min={0} max={25}
                    onChange={(e) => setFilters({...filters, maxAge: parseInt(e.target.value)})}
                />
            </label>
            </div>
        </div>
    )
}
export default PetFilter
