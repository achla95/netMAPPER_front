import { useField } from "formik"
const SimpleFormField = (props) => {
  const { name, label, placeholder, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })

  return (
    <div>
      <div>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>

        <div className="relative">
          <input
            {...field}
            {...otherProps}
            className=" w-full rounded-lg border-gray-200 py-3 px-4 text-sm shadow-sm"
            placeholder={placeholder || label}
          />
        </div>
      </div>
      {touched && error && (
        <span className="text-sm font-semibold text-red-500">{error}</span>
      )}
    </div>
  )
}

export default SimpleFormField
