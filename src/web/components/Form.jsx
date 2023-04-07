import clsx from "clsx"
import { Formik, Form as FormikForm } from "formik"

const Form = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <Formik {...otherProps}>
      <FormikForm noValidate className={clsx("flex flex-col gap-4", className)}>
        {children}
      </FormikForm>
    </Formik>
  )
}

export default Form
