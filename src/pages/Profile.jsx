import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getProfileService } from "../services/profile.services"


function Private() {

  const [ user, setUser ] = useState(null)

  const navigate = useNavigate()
  
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const response = await getProfileService()
      setUser(response.data)
    } catch(err) {
      navigate("/login")
    }
  }

  if (!user) {
    return <h3>...Loading</h3>
  }

  return (
    <div>
      <h1>Welcome: {user.name}</h1>
    </div>
  )
}

export default Private