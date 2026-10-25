import type { WebsiteResponseDto, WebsiteTagResponseDto } from './declaration'

export function chooseRandomStringItemFromList(list: string[]): string {
  const randomIndex = Math.floor((Math.random() * 100) % list.length)
  console.info(randomIndex)

  return list[randomIndex]
}

export function sortWebsiteByName(websites: WebsiteResponseDto[]): WebsiteResponseDto[] {
  if (websites == undefined) {
    console.info('websites list is null')

    return []
  }

  return websites.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
}

export function sortWebsiteTagsByName(tags: WebsiteTagResponseDto[]): WebsiteTagResponseDto[] {
  if (tags == undefined) {
    console.info('tags list is null')

    return []
  }

  return tags.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
}
