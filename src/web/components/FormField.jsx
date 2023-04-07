import { useField } from "formik"
const FormField = (props) => {
  const {
    name,
    label,
    placeholder,
    Icon = null,
    ...otherProps
  } = props
  const [field, { error, touched }] = useField({ name })

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
      >
        {label && (
        <span>{label}</span>
      )}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {Icon && <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
        </div>
        <input
          {...field}
          {...otherProps}
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder || label }
        />
      </div>
        {touched && error && (
        <span className="text-sm font-semibold text-red-500">{error}</span>
      )}
    </div>
  )
}

export default FormField
