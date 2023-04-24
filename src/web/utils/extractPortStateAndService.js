const extractPortStateAndService = (content) => {
  const formatRaw = content.replace(/\n/g, " ")
  const regex = /(\d+)\/tcp\s+(\w+)\s+(\w+) /g
  const portStateService = formatRaw.match(regex)

  const [port, state] = portStateService

  return [port, state]
}

export default extractPortStateAndService
