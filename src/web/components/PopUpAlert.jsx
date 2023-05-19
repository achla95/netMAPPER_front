import Link from "@/web/components/Link"
import clsx from "clsx"

const PopUpAlert = (props) => {
  const { className, content, linkRef, textColor } = props

  return (
    <div
      className={clsx(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-blue-50 p-4 text-center",
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx("h-6 w-6 text-blue-700", textColor)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={clsx("text-sm text-blue-700", textColor)}>{content}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <Link
              href={linkRef || "/"}
              className={clsx("text-blue-700 underline", textColor)}
            >
              here <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PopUpAlert

//fix color not handled for textColor
