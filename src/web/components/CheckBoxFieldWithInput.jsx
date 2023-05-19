import { useState, useEffect } from "react"
import { useField } from "formik"

const CheckBoxFieldWithInput = (props) => {
  const [showInput, setShowInput] = useState(false)
  const { label, name, optionName, placeholder, onKeyUp, type, id } = props
  // eslint-disable-next-line no-unused-vars
  const [field, _, { setValue }] = useField({ name })

  const handleClick = () => {
    setShowInput(!showInput)
  }

  const handleChange = (e) => {
    setValue(`${optionName} ${e.target.value}`)
  }

  useEffect(() => {
    if (!showInput) {
      setValue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showInput])

  return (
    <div className="mt-2 flex items-center">
      <div className="mx-auto flex w-full items-center rounded border border-gray-200 p-3">
        <input
          {...field}
          id={id}
          type="checkbox"
          value={`${optionName} 1`}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-2 focus:ring-green-500"
          onClick={handleClick}
        />
        <label
          htmlFor={id}
          className="ml-2 w-full cursor-pointer py-4 text-sm font-medium "
        >
          {label}
          {showInput && (
            <input
              type={type ? type : "number"}
              className="m-auto ml-2 h-8 rounded-md border border-purple-500 px-2"
              placeholder={placeholder}
              min={1}
              max={optionName == "-p" ? 65535 : 100}
              defaultValue={1}
              onKeyUp={onKeyUp}
              onBlur={handleChange}
            />
          )}
        </label>
      </div>
    </div>
  )
}

export default CheckBoxFieldWithInput
//handle le fait que ca coche quand on clique sur le label
