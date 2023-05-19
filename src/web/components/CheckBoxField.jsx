import { useField } from "formik"

//attention g modifier ici
const CheckBoxField = (props) => {
  const { label, onClick, value, name } = props
  const [field] = useField({ name })

  return (
    <div className="mt-2 flex items-center">
      <div className="mx-auto flex w-full items-center rounded border border-gray-200 p-3">
        <input
          {...field}
          id={value}
          type="checkbox"
          value={value}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-2 focus:ring-green-500"
          onClick={onClick}
        />
        <label
          htmlFor={value}
          className="ml-2 w-full cursor-pointer py-4 text-sm font-medium "
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default CheckBoxField
