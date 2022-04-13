export async function get<T> (path: string): Promise<undefined | T> {
  let response: Response

  try {
    response = await fetch(path)
  } catch (err) {
    console.log(err)
    return
  }

  if (!response?.ok) {
    console.log(`An error has occured: ${response?.status}`)
    return
  }

  return response.json()
}
