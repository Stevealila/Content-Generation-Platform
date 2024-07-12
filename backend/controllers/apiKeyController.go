package controllers

import (
	"content_generation_platform/config"
	"content_generation_platform/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateAPIKey(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	key := uuid.New().String()
	apiKey := models.APIKey{Key: key, UserID: userID}

	if err := config.DB.Create(&apiKey).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create API key"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"key": key})
}

func GetAPIKeys(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	var keys []models.APIKey
	if err := config.DB.Where("user_id = ?", userID).Find(&keys).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve API keys"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"keys": keys})
}

func DeleteAPIKey(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	key := c.Param("key")

	result := config.DB.Where("user_id = ? AND key = ?", userID, key).Delete(&models.APIKey{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete API key"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "API key not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "API key deleted successfully"})
}
