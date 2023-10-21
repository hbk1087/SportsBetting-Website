import { GamesContext } from "../context/GamesContext"
import { useContext } from "react"

export const useGamesContext = () => {
    const context = useContext(GamesContext)

    if (!context) {
        throw Error('useGamesContext must be used inside a GamesContextProvider.')
    }

    return context

}


