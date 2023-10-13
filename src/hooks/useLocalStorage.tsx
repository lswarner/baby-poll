import { useState, useEffect } from 'react'

export const useLocalStorage = <T,>(key: string, fallbackState?: T) : [T, (v: T) => void] => {
    const [value, setValue]= useState<T>(
        localStorage.getItem(key) 
            ? JSON.parse(localStorage.getItem(key) ?? '') 
            : fallbackState ?? ''
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue]
}