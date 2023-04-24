import Loader from "@/web/components/Loader.jsx"
import Page from "@/web/components/Page.jsx"
/* import Post from "@/web/components/Post.jsx" */
import api from "@/web/services/api.js"
import { useEffect, useState } from "react"
import RawScan from "@/web/components/RawScan"

// ici ya du boulot a faire
// nn en vrai faut juste design mais grosse flemme
//il me reste ca et scan history apres on est good
const extractPortStateAndService = (content) => {
  const formatRaw = content.replace(/\n/g, " ")
  const regex = /(\d+)\/tcp\s+(\w+)\s+(\w+) /g
  const portStateService = formatRaw.match(regex)

  const [port, state] = portStateService

  return [port, state]
}

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      scanId: params.scanId,
    },
  },
})

const ScanPage = (props) => {
  const [scan, setScan] = useState(null)
  const { scanId } = props.params

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api(`/scans/${scanId}`)

      setScan(result)
    })()
  }, [scanId])

  const filteredPortStateAndService = scan
    ? extractPortStateAndService(scan.result)
    : []

  return (
    <Page>
      {scan ? (
        <>
          <div className="flex h-screen items-center justify-center">
            <div className="rounded-lg bg-green-200 p-6 font-mono">
              <p className="text-center text-lg">Command : {scan.command}</p>
              {filteredPortStateAndService.map((element) => {
                return (
                  <div key={element}>
                    <p className="p-2">{element}</p>
                  </div>
                )
              })}
              <br />
              <RawScan content={scan.result.replace("\\n")} />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Page>
  )
}

export default ScanPage

// eslint-disable-next-line no-warning-comments
//TODO implémenter si ya des options genre -sC -sV (au niveau de l'affichage) et mettre le tout dans un composant
