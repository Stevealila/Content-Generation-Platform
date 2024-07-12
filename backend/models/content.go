package models

import (
	"gorm.io/gorm"
)

type Content struct {
	gorm.Model
	Title  string `json:"title"`
	Body   string `json:"body"`
	UserID uint   `json:"user_id"`
	User   User   `json:"user" gorm:"foreignKey:UserID"`
}
