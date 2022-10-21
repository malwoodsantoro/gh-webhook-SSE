export async function getStars() {
  try {
    const res = await fetch("/api/stars");
    return await res.json();
  } catch (err) {
    console.error("Fetching failed");
    throw err;
  }
}
