export function asApiResponse<T>(data: T): { data: T } {
  return { data };
}
