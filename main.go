package main

import (
	"content_generation_platform/config"
	"content_generation_platform/models"
	"content_generation_platform/routers"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()
	models.Migrate(config.DB)

	r := gin.Default()

	store := cookie.NewStore([]byte("secret"))
	r.Use(sessions.Sessions("mysession", store))

	routers.SetupRouter(r)

	r.Run(":8080")
}
