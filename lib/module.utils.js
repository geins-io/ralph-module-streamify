const moduleOptions = `<%= JSON.stringify(options) %>`;
const logStyle =
  'background-color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold; border: 1px solid #1643C9; color: #1643C9;';
export function log(...args) {
  const options = JSON.parse(moduleOptions);
  // eslint-disable-next-line no-console
  if (!options.debug) return;
  console.log('%c' + options.nameShort ?? options.name, logStyle, ...args);
}
export async function getFutureStream(...args) {
  const options = JSON.parse(moduleOptions);

  // Check if token and API URL are set in module settings
  if (!options.apiToken || options.apiToken === '') {
    log(
      'No Streamify Token present in settings, please consult documentation.'
    );
    return '';
  }
  if (!options.apiBaseUrl || options.apiBaseUrl === '') {
    log(
      'No Streamify API URL present in settings, please consult documentation.'
    );
    return '';
  }

  const apiUrl = `${options.apiBaseUrl}${options.apiEndpointGetStreams}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${options.apiToken}`
      }
    });

    if (!res.ok) {
      log(
        `Response from Streamify API was not ok, please consult documentation. Status code: ${res.status}`
      );
      return '';
    }

    const data = await res.json();

    // Check if data is valid
    if (!data || data.length === 0 || !data[0].id) {
      log('No data received from Streamify API');
      return '';
    }

    return data[0].id;
  } catch (error) {
    log(`Error while fetching data from Streamify API: ${error}`);
    return '';
  }
}
