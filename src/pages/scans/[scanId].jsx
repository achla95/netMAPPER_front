import Loader from "@/web/components/Loader.jsx"
import Page from "@/web/components/Page.jsx"
import { useEffect, useState } from "react"
import Link from "@/web/components/Link"
import useApi from "@/web/hooks/useApi"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      scanId: params.scanId,
    },
  },
})

const ScanPage = (props) => {
  const [scan, setScan] = useState(null)
  const api = useApi()
  const { scanId } = props.params

  useEffect(() => {
    ;(async () => {
      const {
        data: { result },
      } = await api(`/scans/${scanId}`)

      setScan(result)
    })()
  }, [])

  //Please don't mind the style :(

  return (
    <Page>
      {scan ? (
        <div className="mx-auto flex min-h-[50rem] max-w-screen-sm flex-col items-center justify-center overflow-y-scroll">
          <div className=" w-full rounded-md bg-gradient-to-r from-[#7928ca] to-[#ff0080] p-1">
            <div className="back flex h-full w-auto flex-col  bg-black p-3">
              <h1 className="text-center text-2xl font-black text-white">
                Command: {scan.command}
              </h1>
              <p className="font-bold text-white">
                IP address: {scan.ipAddress}
              </p>
              <pre className="py-2 text-white">{scan.result}</pre>
            </div>
          </div>
          <p>
            A fully detailed scan can be found{" "}
            <Link href="/scans/history" className="text-blue-400">
              here
            </Link>
          </p>
        </div>
      ) : (
        <Loader />
      )}
    </Page>
  )
}

export default ScanPage
