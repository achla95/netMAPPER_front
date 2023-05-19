const extractPorts = (content) => {
  const formatRaw = content.replace(/\n/g, " ")
  const regex = /(\d+)\/tcp\s+open\s+\w+/g

  const matches = formatRaw.match(regex)

  return matches !== null
    ? matches.map((match) => match.split("/")[0]).join(",")
    : "unknown"
}

const extractServices = (content) => {
  const formatRaw = content.replace(/\n/g, " ")
  const regex = /(\d+)\/tcp\s+open\s+\w+/g

  const matches = formatRaw.match(regex)

  return matches !== null
    ? matches
        .map((match) => match.split("/")[1].split(" ").filter(Boolean)[2])
        .join(",")
    : "unknown"
}

const extractHostState = (content) => {
  const formatRaw = content.replace(/\n/g, " ")
  const regex = /\d+ host(s)? up/g

  const hostState = formatRaw.match(regex).map((match) => match.split(" ")[0])

  return hostState[0] === "1" ? "up" : "down"
}

const selectColorForHostState = (state) => {
  return extractHostState(state) === "up" ? "bg-green-400" : "bg-red-400"
}

export {
  extractPorts,
  extractServices,
  extractHostState,
  selectColorForHostState,
}

//faire row scan et delete
