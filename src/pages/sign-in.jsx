import { useAppContext } from "@/web/components/AppContext.jsx"
import Button from "@/web/components/Button.jsx"
import Form from "@/web/components/Form.jsx"
import Link from "@/web/components/Link.jsx"
import Page from "@/web/components/Page.jsx"
import SimpleFormField from "@/web/components/SimpleFormField.jsx"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Password"),
})

const SignInPage = () => {
  const [areCredsIncorrect, setCredsIncorret] = useState(false)

  const {
    actions: { signIn },
  } = useAppContext()
  const router = useRouter()
  const handleSubmit = async (values) => {
    try {
      await signIn(values)
      router.push("/")
    } catch (err) {
      // eslint-disable-next-line no-warning-comments
      // TODO handle error
      setCredsIncorret(true)
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
                Sign in to your account
              </p>
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
              <p className="text-center text-sm text-gray-500">
                No account?
                <Link href="/sign-up" className="text-indigo-600">
                  Sign up
                </Link>
              </p>
              {areCredsIncorrect && (
                <p className="animate-pulse rounded bg-red-500 p-2 text-center text-red-100">
                  E-mail or password incorrect
                </p>
              )}
            </div>
          </div>
        </div>
      </Form>
    </Page>
  )
}

export default SignInPage
