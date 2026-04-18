package main

import (
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

type OllamaResponse struct {
	Response string `json:"response"`
}

func chatHandler(c *gin.Context) {
	var req ChatRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	ollamaReq := OllamaRequest{
		Model:  "mistral",
		Prompt: req.Message,
		Stream: false,
	}

	jsonData, _ := json.Marshal(ollamaReq)

	resp, err := http.Post(
		"http://localhost:11434/api/generate",
		"application/json",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "Ollama not running"})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var ollamaResp OllamaResponse
	json.Unmarshal(body, &ollamaResp)

	c.JSON(200, gin.H{
		"reply": ollamaResp.Response,
	})
}