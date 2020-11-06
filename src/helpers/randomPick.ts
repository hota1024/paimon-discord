/**
 * Pick random element.
 */
export const randomPick = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}
