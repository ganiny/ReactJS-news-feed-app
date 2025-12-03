export default async function handler(req, res) {
  try {
    const { category = "general", q = "", page = 1, max = 5 } = req.query;

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&q=${q}&page=${page}&max=${max}&country=us&apikey=${process.env.VITE_NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Fix CORS for browser
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
