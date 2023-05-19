import config from "@/web/config.js"
import jsonwebtoken from "jsonwebtoken"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router.js"
import useApi from "@/web/hooks/useApi"

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const api = useApi()
  const router = useRouter()
  const signIn = async ({ email, password }) => {
    const {
      data: { result: jwt },
    } = await api.post("/sign-in", { email, password })

    localStorage.setItem(config.security.jwt.storageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }
  const signUp = async ({ firstName, lastName, email, password }) => {
    await api.post("/sign-up", { firstName, lastName, email, password })
  }
  const signOut = () => {
    localStorage.removeItem(config.security.jwt.storageKey)
    setSession(false)

    router.push("/")
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.jwt.storageKey)

    if (!jwt) {
      setSession(false)

      return
    }

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{
        state: { session },
        actions: {
          signIn,
          signUp,
          signOut,
        },
      }}
    />
  )
}

export default AppContext
