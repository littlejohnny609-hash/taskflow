package main
import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)
func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()
	// safer proxy setup
	_ = r.SetTrustedProxies(nil)
	// CORS config (frontend Vite)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))
	// =========================
	// HEALTH CHECK
	// =========================
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Backend running 🚀",
		})
	})
	// =========================
	// API ROUTES
	// =========================
	r.POST("/scrape", scrapeHandler)
	r.POST("/autoapply", autoApplyHandler)
	r.POST("/chat", chatHandler) // from chat.go
	// =========================
	// SERVER START
	// =========================
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("🚀 Server running on port:", port)
	r.Run(":" + port)
}
//
// ============================
// SCRAPER HANDLER
// ============================
//
func scrapeHandler(c *gin.Context) {
	log.Println("🔥 SCRAPER RUNNING: scraper.cjs")
	cmd := exec.Command("node", "scraper.cjs")
	cmd.Dir = "."
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		log.Println("❌ Scraper crashed:", err)
		log.Println("STDERR:", stderr.String())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "Scraper failed",
			"detail": stderr.String(),
		})
		return
	}
	// validate JSON
	var jsonCheck interface{}
	if json.Unmarshal(stdout.Bytes(), &jsonCheck) != nil {
		log.Println("❌ Invalid JSON from scraper")
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "Invalid JSON from scraper",
			"detail": stdout.String(),
		})
		return
	}
	log.Println("✅ Scraper completed successfully")
	c.Data(http.StatusOK, "application/json", stdout.Bytes())
}
//
// ============================
// AUTO APPLY HANDLER
// ============================
//
func autoApplyHandler(c *gin.Context) {
\
	log.Println("🤖 AUTO APPLY RUNNING: autoapply.cjs")
	cmd := exec.Command("node", "autoapply.cjs")
	cmd.Dir = "."
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		log.Println("❌ AutoApply crashed:", err)
		log.Println("STDERR:", stderr.String())

		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "AutoApply failed",
			"detail": stderr.String(),
		})
		return
	}
	c.Data(http.StatusOK, "application/json", stdout.Bytes())
}