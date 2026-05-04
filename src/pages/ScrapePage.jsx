import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
export default function ScrapePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const scrape = async () => {
    setLoading(true)
    const res = await fetch("http://localhost:8080/scrape", {
      method: "POST"
    })
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">PS5 Price Comparison</h1>
      <Button onClick={scrape} disabled={loading}>
        {loading ? "Scraping..." : "Scrape Prices"}
      </Button>
      {products.map((p, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <p className="font-semibold">{p.title}</p>
            <p className="text-green-600">${p.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}