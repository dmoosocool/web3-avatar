export const getNS = (text: string) => {
  const supportedNS = ['.eth', '.lens', '.csb']
  let result = ''
  supportedNS.some((ns) => {
    if (text.endsWith(ns)) {
      result = ns
      return true
    }
  })
  return result
}
