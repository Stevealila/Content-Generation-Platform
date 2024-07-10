package routers

import (
	"content_generation_platform/controllers"
	"content_generation_platform/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)
		api.POST("/logout", middleware.AuthRequired(), controllers.Logout)

		api.POST("/keys", middleware.AuthRequired(), controllers.CreateAPIKey)
		api.GET("/keys", middleware.AuthRequired(), controllers.GetAPIKeys)
		api.DELETE("/keys/:id", middleware.AuthRequired(), controllers.DeleteAPIKey)

		api.POST("/content", middleware.APIKeyAuthRequired(), controllers.GenerateContent)
		api.GET("/content", middleware.AuthRequired(), controllers.GetUserContents)
		api.GET("/content/:id", middleware.AuthRequired(), controllers.GetContent)
		api.DELETE("/content/:id", middleware.AuthRequired(), controllers.DeleteContent)
	}
}
