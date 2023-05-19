import Loader from "@/web/components/Loader.jsx"
import Page from "@/web/components/Page.jsx"
import Scan from "@/web/components/Scan.jsx"
import { useState, useEffect } from "react"
import PopUpAlert from "@/web/components/PopUpAlert.jsx"
import useApi from "@/web/hooks/useApi"

const History = () => {
  const [scans, setScans] = useState([])
  const [error, setError] = useState(false)
  const api = useApi()
  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api("/scans")

        setScans(result)
        setError(false)
      } catch (error) {
        setError(true)
      }
    })()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/scans/${id}`)
      setScans(scans.filter((scan) => scan._id !== id))
    } catch (error) {
      //handle error
    }
  }

  return (
    <Page>
      <div>
        {error ? (
          <p>Error 403 Forbidden</p>
        ) : scans ? (
          scans.length > 0 ? (
            <Scan scans={scans} handleDelete={handleDelete} />
          ) : (
            <PopUpAlert content="There are no scans! Please do some scan before" />
          )
        ) : (
          <Loader />
        )}
      </div>
    </Page>
  )
}

export default History
