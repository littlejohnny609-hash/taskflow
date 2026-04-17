package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Portfolio struct {
	Name    string   `json:"name"`
	Title   string   `json:"title"`
	Summary string   `json:"summary"`
	Skills  []string `json:"skills"`
}

func main() {

	// Load .env
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET"},
		AllowHeaders: []string{"Content-Type"},
	}))

	// Health check
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Backend running"})
	})

	// Portfolio API
	r.GET("/portfolio", func(c *gin.Context) {
		portfolio, err := fetchPortfolio()
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, portfolio)
	})

	// PDF API
	r.GET("/generate-pdf", func(c *gin.Context) {
		portfolio, err := fetchPortfolio()
		if err != nil {
			c.String(500, "Failed to fetch data")
			return
		}
		generatePDF(c, portfolio)
	})

	// PORT (for deployment)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}