import { useState } from "react"

export const useSessionStorage = (key, defValue) => {
    const [value, setValue] = useState(() => {
        const searchedStorage = sessionStorage.getItem(key)

        return searchedStorage? JSON.parse(searchedStorage) : defValue
        
    })


    const setSessionStorage = (data) => {
        sessionStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [
        value,
        setSessionStorage
    ]
}