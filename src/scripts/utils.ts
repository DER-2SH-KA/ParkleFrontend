import type { Website } from './declaration'

export function chooseRandomStringItemFromList(list: string[]): string {
  const randomIndex = Math.floor((Math.random() * 100) % list.length)
  console.info(randomIndex)

  return list[randomIndex]
}

export function sortWebsiteByName(list: Website[]): Website[] {
  return list.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
}
