import { useAppContext } from "@/web/components/AppContext.jsx"
import Button from "@/web/components/Button.jsx"
import Link from "@/web/components/Link.jsx"
import clsx from "clsx"

const Page = (props) => {
  const { children, className, title } = props
  const {
    state: { session },
    actions: { signOut },
  } = useAppContext()

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 border-b border-neutral-300 bg-white shadow-xl">
        <div className="mx-auto flex max-w-3xl justify-between p-2">
          <Link href="/" className="self-center">
            NETMAPPER
          </Link>
          <nav>
            <ul className="flex items-center gap-4">
              {session ? (
                <>
                  <li>
                    <Button
                      onClick={signOut}
                      className="inline-flex items-center rounded border border-transparent bg-blue-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Sign out
                    </Button>
                  </li>
                  <li>
                    <Link href="/scans/history">Scan history</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/sign-in">Sign in</Link>
                  </li>
                  <li>
                    <Link href="/sign-up">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <section className="grow">
        <div className={clsx("mx-auto flex max-w-3xl flex-col p-2", className)}>
          {title && <h1 className="py-4 text-2xl font-semibold">{title}</h1>}
          {children}
        </div>
      </section>
    </main>
  )
}

export default Page
