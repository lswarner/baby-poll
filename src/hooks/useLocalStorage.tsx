import { useState } from 'react'

export const useLocalStorage = <T,>(key: string, fallbackState?: T) : [T, (v: T) => void] => {
    const [value, setValue]= useState<T>(
        localStorage.getItem(key) 
            ? JSON.parse(localStorage.getItem(key) ?? '') 
            : fallbackState ?? ''
    );

    const setLocalStoreValue = (v:T) => {
        setValue(v);
        console.log(`setting LOCAL STORAGE: ${v}`)
        localStorage.setItem(key, JSON.stringify(v));
    }

    return [value, setLocalStoreValue]
}