export default interface GameInstruction<T> {
  type: string,
  value: T
}