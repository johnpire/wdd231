const url = 'https://hri.fi/api/v1/dataset/linked-events-tapahtumarajapinta/resource/07490a01-5215-4068-bc20-df91845bf5b2?';

async function fetchEvents() {
  // You can add filters, e.g. date_from, date_to, location etc.
  // Example: ?date_from=2025-09-20&location=Helsinki etc.

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP error ' + resp.status);
    const data = await resp.json();
    // data should have events in some property, check the schema
    // Example: data.results or data.events etc.

    // then map to what you need:
    const upcoming = data.data.filter(ev => {
      const now = new Date();
      return new Date(ev.start_time) >= now;
    })
    .slice(0,5);  // e.g. get next 5

    return upcoming.map(ev => ({
      title: ev.name,
      start: ev.start_time,
      end: ev.end_time,
      location: ev.location_name,
      description: ev.description
    }));
  } catch(e) {
    console.error('Error fetching events:', e);
    return [];
  }
}