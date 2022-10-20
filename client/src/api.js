export async function getStars() {
  try {
    const res = await fetch("/stars");
    return await res.json();
  } catch (err) {
    console.error("Fetching shipments from API failed!");
    throw err;
  }
}
