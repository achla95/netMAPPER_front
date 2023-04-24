import Page from "@/web/components/Page.jsx"
import api from "@/web/services/api.js"
import { useState, useEffect } from "react"
import Loader from "@/web/components/Loader.jsx"
import RawScan from "@/web/components/RawScan.jsx"
import extractPortStateAndService from "@/web/utils/extractPortStateAndService.js"
const History = () => {
  const [scans, setScans] = useState(null)

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api("/scans")

      setScans(result)
    })()
  }, [])

  return (
    <Page>
      {/* fix le h-screen pcq ya un mini scroll */}
      <div className=" h-screen overflow-y-scroll">
        {scans ? (
          scans.map((scan) => {
            return (
              <>
                <div className="m-2 rounded-lg bg-green-200 p-6 font-mono">
                  <p className="text-center text-lg">
                    Command : {scan.command}
                  </p>
                  {extractPortStateAndService(scan.result).map((element) => {
                    return (
                      <div key={element}>
                        <p className="p-2">{element}</p>
                      </div>
                    )
                  })}
                  <br />
                  <RawScan content={scan.result.replace("\\n")} />
                </div>
              </>
            )
          })
        ) : (
          <Loader />
        )}
      </div>
    </Page>
  )
}

export default History

//handle le fait qu'il n'y a pas de scans
//handle au moins le -Sc -sV affichage
//mettre dans un ptn de container
// ajouter une sorte de pop up pour dire que le scan est fini quand on quitte la page
//fix le probleme de heroicon v1 et v2
