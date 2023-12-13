async function fetchPage(url: string) {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`HTTP error! Status: ${result.status}`);
  }
  return result.json();
}

async function fetchAll(initial: string) {
  const completeData = [];
  let next = initial;
  try {
    while (next) {
      console.log('fetching page', next);
      if (!next.startsWith(initial)) {
        // sanity check
        console.error('Invalid next page');
        return completeData;
      }
      const nextData = await fetchPage(next);
      completeData.push(...nextData.results);
      next = nextData.next;
    }
    return completeData;
  } catch (e) {
    console.error('Error fetching:', e);
  }
}

export async function planets(): Promise<Record<string, string>[] | undefined> {
  const initial = process.env.SWAPI_PLANETS_URL;
  return fetchAll(initial);
}

export async function people(): Promise<Record<string, string>[] | undefined> {
  const initial = process.env.SWAPI_PEOPLE_URL;
  return fetchAll(initial);
}

export async function species(): Promise<Record<string, string>[] | undefined> {
  const initial = process.env.SWAPI_SPECIES_URL;
  return fetchAll(initial);
}

export async function vehicles(): Promise<
  Record<string, string>[] | undefined
> {
  const initial = process.env.SWAPI_VEHICLES_URL;
  return fetchAll(initial);
}

export async function starships(): Promise<
  Record<string, string>[] | undefined
> {
  const initial = process.env.SWAPI_STARSHIPS_URL;
  return fetchAll(initial);
}

export async function films(): Promise<Record<string, string>[] | undefined> {
  const initial = process.env.SWAPI_FILMS_URL;
  return fetchAll(initial);
}
