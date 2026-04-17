export async function getPortfolio() {
  const response = await fetch("http://localhost:8080/portfolio");

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return response.json();
}