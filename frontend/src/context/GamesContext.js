import { createContext, useReducer } from "react"

export const GamesContext = createContext()

export const gamesReducer = (state, action) => {
    switch (action.type){
        case 'SET_GAMES':
            return {
                game: action.payload
            }
        case 'CREATE_GAMES':
            return {
                game: [action.payload, ...state.game]
            }
        default:
            return state
    }
}

export const GamesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gamesReducer, {
        game: null
    })


    return (
        <GamesContext.Provider value={{...state, dispatch}}>
            { children }
        </GamesContext.Provider>
    )
}