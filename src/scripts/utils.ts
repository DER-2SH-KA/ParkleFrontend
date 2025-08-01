import type { WebsiteResponseDto } from './declaration'

export function chooseRandomStringItemFromList(list: string[]): string {
  const randomIndex = Math.floor((Math.random() * 100) % list.length)
  console.info(randomIndex)

  return list[randomIndex]
}

export function sortWebsiteByName(websites: WebsiteResponseDto[]): WebsiteResponseDto[] {
  if (websites == undefined) {
    console.info('list is null')
    return websites
  }
  return websites.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
}
