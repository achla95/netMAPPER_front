import { Field } from "formik"

const CheckBoxField = ({ label, ...props }) => {
  return (
    <div className="mt-2 flex items-center">
      <Field name={props.name}>
        {({ field }) => (
          <>
            <div className="mx-auto flex w-full items-center rounded border border-gray-200 p-3">
              <input
                {...field}
                id={props.value}
                type="checkbox"
                value={props.value}
                checked={field.value.includes(props.value)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500"
              ></input>
              <label
                htmlFor={props.value}
                className="ml-2 w-full cursor-pointer py-4 text-sm font-medium "
              >
                {label}
              </label>
            </div>
          </>
        )}
      </Field>
    </div>
  )
}

export default CheckBoxField
