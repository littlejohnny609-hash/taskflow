package main
import (
	"bufio"
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"github.com/gin-gonic/gin"
)
type ChatRequest struct {
	Message string `json:"message"`
}
type OllamaRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
}
func chatHandler(c *gin.Context) {
	var req ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}
	ollamaReq := OllamaRequest{
		Model:  "phi",
		Prompt: req.Message,
		Stream: true, // IMPORTANT for real responses
	}
	jsonData, _ := json.Marshal(ollamaReq)
	resp, err := http.Post(
		"http://localhost:11434/api/generate",
		"application/json",
		bytes.NewBuffer(jsonData),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Ollama not running",
		})
		return
	}
	defer resp.Body.Close()
	reader := bufio.NewReader(resp.Body)
	var fullResponse string
	for {
		line, err := reader.ReadBytes('\n')
		if err != nil && err != io.EOF {
			break
		}
		var data map[string]interface{}
		if json.Unmarshal(line, &data) == nil {
			if respText, ok := data["response"].(string); ok {
				fullResponse += respText
			}
			if done, ok := data["done"].(bool); ok && done {
				break
			}
		}
		if err == io.EOF {
			break
		}
	}
	c.JSON(http.StatusOK, gin.H{
		"reply": fullResponse,
	})
}