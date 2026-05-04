package main
import (
	"bytes"
	"log"
	"net/http"
	"os"
	"os/exec"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)
type Portfolio struct {
	Name        string   `json:"name"`
	Title       string   `json:"title"`
	Summary     string   `json:"summary"`
	Education   string   `json:"education"`
	Skills      []string `json:"skills"`
	StrongPoints []struct {
		Point       string `json:"point"`
		Description string `json:"description"`
	} `json:"strongPoints"`
	Contact struct {
		Email  string `json:"email"`
		Github string `json:"github"`
	} `json:"contact"`
}
func main() {
	// Load env
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}
	// Release mode
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()
	// Security proxy config
	r.SetTrustedProxies([]string{"127.0.0.1"})
	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	// Health check
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Backend running 🚀",
		})
	})
	// Portfolio
	r.GET("/portfolio", func(c *gin.Context) {
		portfolio, err := fetchPortfolio()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, portfolio)
	})
	// PDF
	r.GET("/generate-pdf", func(c *gin.Context) {
		portfolio, err := fetchPortfolio()
		if err != nil {
			c.String(http.StatusInternalServerError, "Failed to fetch data")
			return
		}
		generatePDF(c, portfolio)
	})
	// AI Chat
	r.POST("/chat", chatHandler)
	// SCRAPER ROUTE
	r.POST("/scrape", scrapeHandler)
	// Port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("🚀 Server running on port:", port)
	r.Run(":" + port)
}
//
// ============================
// SCRAPER HANDLER (FIXED)
// ============================
//
func scrapeHandler(c *gin.Context) {
	// Run Node scraper
	cmd := exec.Command("node", "scraper.js")
	cmd.Dir = "."
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &out
	err := cmd.Run()
	if err != nil {
		c.JSON(500, gin.H{
			"error":  "Scraper failed",
			"detail": out.String(),
		})
		return
	}
	c.Data(200, "application/json", out.Bytes())
}