package controllers

import (
	"content_generation_platform/config"
	"content_generation_platform/models"
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func GenerateContent(c *gin.Context) {
	apiKey := c.MustGet("apiKey").(models.APIKey)

	var input struct {
		Question string `json:"question" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate content using AI
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize AI client"})
		return
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(input.Question))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate content"})
		return
	}

	if resp == nil || len(resp.Candidates) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No content generated"})
		return
	}

	generatedContent := resp.Candidates[0].Content.Parts[0].(genai.Text)

	// Create and save the content
	content := models.Content{
		Title:  input.Question,
		Body:   string(generatedContent),
		UserID: apiKey.UserID,
	}

	if err := config.DB.Create(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save content"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"content": content})
}

func GetUserContents(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	var contents []models.Content
	if err := config.DB.Where("user_id = ?", userID).Find(&contents).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve contents"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"contents": contents})
}

func GetContent(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	contentID := c.Param("id")

	var content models.Content
	if err := config.DB.Where("id = ? AND user_id = ?", contentID, userID).First(&content).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"content": content})
}

func DeleteContent(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	contentID := c.Param("id")

	result := config.DB.Where("id = ? AND user_id = ?", contentID, userID).Delete(&models.Content{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete content"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content deleted successfully"})
}
