export function chooseRandomStringItemFromList(list: string[]): string {
  const randomIndex = Math.floor((Math.random() * 100) % list.length)
  console.info(randomIndex)

  return list[randomIndex]
}
