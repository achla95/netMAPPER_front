import Navbar from "@/web/components/Navbar.jsx"

const Page = (props) => {
  const { children } = props

  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="mx-auto grow">{children}</section>
    </main>
  )
}

export default Page
