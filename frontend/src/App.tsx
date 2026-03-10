import { useEffect, useState } from 'react'
import { Food } from './types/Food'
import './App.css'

function App() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/MarriottFood')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch food data')
        }
        return response.json()
      })
      .then((data: Food[]) => {
        setFoods(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  if (error) {
    return <div className="container"><p className="error">Error: {error}</p></div>
  }

  return (
    <div className="container">
      <h1>Marriott Food Tracker</h1>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Vendor</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.foodId}>
              <td>{food.eventName}</td>
              <td>{food.vendor}</td>
              <td>{food.foodRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
