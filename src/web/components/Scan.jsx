import Button from "@/web/components/Button"
import {
  extractHostState,
  extractPorts,
  extractServices,
  selectColorForHostState,
} from "@/web/utils/parseOutputNmap"
import { useState } from "react"

const Scan = (props) => {
  const { scans, handleDelete } = props
  const [fullScan, setFullScan] = useState(null)

  const handleClick = (content) => {
    setFullScan(content)
  }

  return (
    <>
      <>
        {fullScan && (
          <div className=" absolute top-1/2 left-1/2 z-10 my-10 h-[50rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-md bg-white bg-opacity-80 p-4">
            <button
              className="absolute top-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setFullScan(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <pre className="p-2">{fullScan}</pre>
          </div>
        )}
      </>
      <div className="h-[50rem] w-auto overflow-y-scroll px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        IP address
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Ports
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Services
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Host State
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Command
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Full scan
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {scans.map((scan) => {
                      return (
                        <tr key={scan._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {scan.ipAddress}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {extractPorts(scan.result)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {extractServices(scan.result)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                            <Button
                              className={`md w-auto rounded px-2 py-2 text-white ${selectColorForHostState(
                                scan.result
                              )}`}
                            >
                              {extractHostState(scan.result)}
                            </Button>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {scan.command}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Button
                              className="md rounded border border-gray-400 bg-white py-1 px-1 font-semibold text-gray-800 shadow hover:bg-gray-100"
                              onClick={() => handleClick(scan.result)}
                            >
                              Full scan
                            </Button>
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <p
                              onClick={() => handleDelete(scan._id)}
                              className="cursor-pointer text-red-600 hover:text-red-900"
                            >
                              Delete
                            </p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Scan

//remove raw scan component
