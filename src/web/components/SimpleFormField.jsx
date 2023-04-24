import { useField } from "formik"
const SimpleFormField = (props) => {
  const { name, label, placeholder, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          {...field}
          {...otherProps}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder || label}
        />
      </div>
      {touched && error && (
        <span className="text-sm font-semibold text-red-500">{error}</span>
      )}
    </div>
  )
}

export default SimpleFormField
