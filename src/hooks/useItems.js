import { useEffect, useState } from 'react'
import axios from 'axios'

function useItems() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://wshedule.herokuapp.com/shedule')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result)
          setIsLoaded(true)
        },
        (error) => {
          setError(error)
          setIsLoaded(true)
        }
      )
  }, [])

  // useEffect(() => {
  //   axios
  //     .get("https://wshedule.herokuapp.com/shedule")
  //     .then(res => {
  //       setIsLoaded(true)
  //       setItems(res.data)
  //     })
  //     .catch(err => {
  //       setIsLoaded(true)
  //       setError(err)
  //     })
  // }, [])

  return [items, setItems, isLoaded, error]
}
export default useItems
