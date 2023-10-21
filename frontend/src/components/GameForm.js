import { useState } from 'react'
import { useGamesContext } from "../hooks/useGameContext"

const CarForm = () => {
    const { dispatch } = useCarsContext()
    const [year, setYear] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [cylinders, setCylinders] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const car = {year, make, model, cylinders}

        const response = await fetch('/api/cars', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setYear('')
            setMake('')
            setModel('')
            setCylinders('')
            setError(null)
            console.log("New car added.", json)
            dispatch({type: 'CREATE_CAR', payload: json})
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new car!</h3>

            <label>Year:</label>
            <input
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
            />

            <label>Make:</label>
            <input
                type="text"
                onChange={(e) => setMake(e.target.value)}
                value={make}
            />

            <label>Model:</label>
            <input
                type="text"
                onChange={(e) => setModel(e.target.value)}
                value={model}
            />

            <label>Cyinders:</label>
            <input
                type="number"
                onChange={(e) => setCylinders(e.target.value)}
                value={cylinders}
            />

            <button>Add Car</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CarForm;