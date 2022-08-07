import { useState } from "react"

export const useLocalStorage = (key, defValue) => {
    const [value, setValue] = useState(() => {
        const searchedStorage = localStorage.getItem(key)

        return searchedStorage? JSON.parse(searchedStorage) : defValue
        
    })


    const setLocalStorage = (data) => {
        localStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [
        value,
        setLocalStorage
    ]
}