import CheckBoxFieldWithInput from "@/web/components/CheckBoxFieldWithInput.jsx"
import { useAppContext } from "@/web/components/AppContext.jsx"
import CheckBoxField from "@/web/components/CheckBoxField.jsx"
import LoaderIcon from "@/web/components/LoaderIcon.jsx"
import Button from "@/web/components/Button.jsx"
import Link from "@/web/components/Link.jsx"
import Page from "@/web/components/Page.jsx"
import { Formik, Form } from "formik"
import { useState } from "react"
import * as yup from "yup"
import FormField from "@/web/components/FormField.jsx"
import PopUpAlert from "@/web/components/PopUpAlert.jsx"
import useApi from "@/web/hooks/useApi"

const initialValues = {
  ipAddress: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
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
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false)
  const api = useApi()

  const {
    state: { session },
  } = useAppContext()

  const handleSubmit = async (values, { resetForm }) => {
    const { ipAddress } = values
    setLoading(true)

    // Handle options
    delete values.options
    let options = []

    for (const [key, value] of Object.entries(values)) {
      if (!key.includes("option")) {
        continue
      }

      if (value) {
        if (Array.isArray(value) && value.length === 0) {
          delete values[key]

          continue
        }

        options.push(Array.isArray(value) ? value[0] : value)
      }

      delete values[key]
    }

    values.options = options

    // Handle command
    const command = ["nmap", ipAddress, ...options].join(" ")
    const {
      data: {
        result: { _id },
      },
    } = await api.post("/scan", { ipAddress, options, command })

    setScanId(_id)
    setScanComplete(true)
    setLoading(false)

    resetForm()
  }

  const handleClick = () => {
    setShowAdditionalOptions(!showAdditionalOptions)
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
                <FormField
                  name="ipAddress"
                  label="IP address"
                  type="text"
                  placeholder="ex: 10.10.14.65"
                />
                <h3 className="text-center underline">Scan options</h3>
                <CheckBoxFieldWithInput
                  name="option1"
                  type="text"
                  optionName="-p"
                  label="Only scan specified port"
                  placeholder="ex: 22,80 or only 80"
                  id="1"
                />
                <CheckBoxField
                  name="option2"
                  value="-sV"
                  label="Scan version of a service"
                  onClick={handleClick}
                />

                <CheckBoxField
                  name="option4"
                  value="-sC"
                  label="Script scan using default scripts"
                />
                <h3 className="text-center underline">Options</h3>
                {showAdditionalOptions && (
                  <>
                    <CheckBoxField
                      name="option3"
                      value="--version-all"
                      label="Attempt to determine the version of all services"
                    />
                  </>
                )}
                <CheckBoxFieldWithInput
                  name="option5"
                  optionName="--max-retries"
                  label="Caps number of port scan probe retransmissions."
                  placeholder="Number of retries"
                  id="2"
                />
                <CheckBoxFieldWithInput
                  name="option6"
                  optionName="--host-timeout"
                  label="Give up on target after this long"
                  placeholder="Time (in seconds)"
                  id="3"
                />
                <CheckBoxFieldWithInput
                  name="option7"
                  optionName="--scan-delay"
                  label="Adjust delay between probes (very slow)"
                  placeholder="Time (in seconds)"
                  id="4"
                />
                <Button
                  type="submit"
                  className="mx-auto mt-2 inline-flex items-center rounded-full border border-transparent bg-green-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? <LoaderIcon /> : "SUBMIT"}
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
          <PopUpAlert
            className="bg-yellow-50"
            textColor="text-yellow-500"
            content="Please sign-in before process queryies"
            linkRef="/sign-in"
          />
        )}
      </>
    </Page>
  )
}

export default IndexPage
