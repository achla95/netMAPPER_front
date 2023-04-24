import { useAppContext } from "@/web/components/AppContext.jsx"
import Page from "@/web/components/Page.jsx"
import api from "@/web/services/api.js"
import { useState } from "react"
import { Formik, Form } from "formik"
import Button from "@/web/components/Button.jsx"
import Link from "@/web/components/Link.jsx"
import * as yup from "yup"
import CheckBoxField from "@/web/components/CheckBoxField.jsx"
import SimpleFormField from "@/web/components/SimpleFormField.jsx"

const initialValues = {
  ipAddress: "",
  options: [],
}

const validationSchema = yup.object().shape({
  ipAddress: yup
    .string()
    .matches(
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      "IPv4 address invalid"
    )
    .required()
    .label("IP address"),
})

const IndexPage = () => {
  const [loading, setLoading] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanId, setScanId] = useState("")

  const {
    state: { session },
  } = useAppContext()

  const handleSubmit = async (values, { resetForm }) => {
    const { ipAddress, options } = values
    setLoading(true)
    const command = ["nmap", ipAddress, ...options].join(" ")
    await api.post("/scan", { ipAddress, options, command }).then(
      ({
        data: {
          result: { _id },
        },
      }) => {
        setScanId(_id)
        setScanComplete(true)
      }
    )
    setLoading(false)

    resetForm()
  }

  return (
    <Page className="gap-8">
      <>
        {session ? (
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form className="flex flex-col">
                <SimpleFormField
                  name="ipAddress"
                  label="IP address"
                  type="text"
                  placeholder="ex: 10.10.14.65"
                />
                <CheckBoxField
                  name="options"
                  value="-sV"
                  label="Scan version of a service"
                />
                <CheckBoxField
                  name="options"
                  value="-sC"
                  label="Script scan using default scripts"
                />
                <Button
                  type="submit"
                  className="mx-auto mt-2 inline-flex items-center rounded-full border border-transparent bg-green-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 animate-spin"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  ) : (
                    "SUBMIT"
                  )}
                </Button>
              </Form>
            </Formik>
            {scanComplete && (
              <p>
                Scan complete! Click{" "}
                <Link href={`/scans/${scanId}`} className="text-blue-400">
                  here
                </Link>{" "}
                to view result.
              </p>
            )}
          </>
        ) : (
          <>
            <p>
              Please{" "}
              <Link href="/sign-in" className="text-blue-400">
                sign-in
              </Link>{" "}
              before process queryies
            </p>
          </>
        )}
      </>
    </Page>
  )
}

export default IndexPage

/*

IMPORTANT NE PAS OUBLIER DE RESET LE FORM UNE FOIS ENVOYÉ
*/
