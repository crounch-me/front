export async function get (path: string): Promise<undefined | unknown> {
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
