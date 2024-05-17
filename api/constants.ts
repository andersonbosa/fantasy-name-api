const pageFooter = `


______________________________________________________________

Author: Anderson Bosa < https://andersonbosa.vercel.app >
Source-code: https://github.com/andersonbosa/fantasy-name-api
License: CC-1.0 Public Domain
`


export const homeResponse = (originUrl: string): string => {
  return `
Hello, friend! 👾

This project aims to provide an API using the beautiful fantasy name generator
developed by "Edgar Alvarado (Pe1uca)". My thanks to him.

I just put it to a framework to make available through API to other people.
Check it out \`${originUrl}/docs\` for more details.

Have fun!

${pageFooter}`
}


export const docsResponse = (originUrl: string, snippet: string, currentOrigin: string,): string => {
  return `
# Documentation

> hack: use 'snippet' param on url to improve your experience :)
> example: ${originUrl}?snippet=curl


# Syntax

${snippet} ${currentOrigin}/api/generate/:pattern
${snippet} ${currentOrigin}/api/generate/:pattern?limit=1000
${snippet} ${currentOrigin}/api/generate/:pattern?limit=1000&pretty


# Usage examples

${snippet} ${currentOrigin}/api/generate/justAstrAsPattern
${snippet} ${currentOrigin}/api/generate/MIDDLE_EARTH?limit=1000&pretty
${snippet} ${currentOrigin}/api/generate/pOkEmOn
${snippet} ${currentOrigin}/api/generate/CHINESE_NAMES
${snippet} ${currentOrigin}/api/generate/FANTASY_S_E


# Existing patterns

> its usage is case-insesitive.

- MIDDLE_EARTH
- JAPANESE_NAMES_CONSTRAINED
- JAPANESE_NAMES_DIVERSE
- CHINESE_NAMES
- GREEK_NAMES
- HAWAIIAN_NAMES_1
- HAWAIIAN_NAMES_2
- OLD_LATIN_PLACE_NAMES
- DRAGONS_PERN
- DRAGON_RIDERS
- POKEMON
- FANTASY_VOWELS_R
- FANTASY_S_A
- FANTASY_H_L
- FANTASY_N_L
- FANTASY_K_N
- FANTASY_J_G_Z
- FANTASY_K_J_Y
- FANTASY_S_E

${pageFooter}`
}