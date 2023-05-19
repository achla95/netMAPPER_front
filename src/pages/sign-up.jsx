import { useAppContext } from "@/web/components/AppContext.jsx"
import Button from "@/web/components/Button.jsx"
import Form from "@/web/components/Form.jsx"
import Page from "@/web/components/Page"
import { useRouter } from "next/router.js"
import * as yup from "yup"
import SimpleFormField from "@/web/components/SimpleFormField.jsx"

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required().label("First name"),
  lastName: yup.string().trim().required().label("Last name"),
  email: yup.string().email().required().label("E-mail"),
  password: yup
    .string()
    .min(8)
    .matches(/^.*(?=.*[0-9]+).*$/, "Password must contain a number")
    .matches(
      /^.*(?=.*\p{Ll}+).*$/u,
      "Password must contain a lower case letter"
    )
    .matches(
      /^.*(?=.*\p{Lu}+).*$/u,
      "Password must contain a upper case letter"
    )
    .matches(
      /^.*(?=.*[^0-9\p{L}]+).*$/u,
      "Password must contain a special character"
    )
    .required()
    .label("Password"),
})

const SignUpPage = () => {
  const {
    actions: { signUp },
  } = useAppContext()
  const router = useRouter()
  const handleSubmit = async (values) => {
    try {
      await signUp(values)

      router.push("/sign-in")
    } catch (err) {
      // eslint-disable-next-line no-warning-comments
      // TODO handle error
    }
  }

  return (
    <Page>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <p className="text-center text-lg font-medium">
                Create your account
              </p>

              <SimpleFormField
                name="firstName"
                label="First name"
                type="text"
              />
              <SimpleFormField name="lastName" label="Last name" type="text" />
              <SimpleFormField name="email" label="E-mail" type="email" />
              <SimpleFormField
                name="password"
                label="Password"
                type="password"
              />

              <Button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Page>
  )
}

export default SignUpPage
