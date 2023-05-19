import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"

const RawScan = (props) => {
  let { content } = props

  content = content.replace(/\n/g, "\r\n")

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
            <span>Raw scan available below</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform " : ""
              } h-5 w-5 text-blue-700`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 font-mono text-sm text-black">
            <pre>{content}</pre>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default RawScan
