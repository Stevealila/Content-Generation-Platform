# Content Generation Platform

Register, Log in, Generate API Keys, and Log Out. Through API Key authentication, generate content using AI.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Introduction

This platform allows users to register, log in, generate API keys, and log out. It uses API Key authentication to enable content generation using AI.

## Features

- User registration and login
- API key generation
- Authentication via API keys
- AI-based content generation

## Requirements

- Go 1.22.4+
- PostgreSQL
- Git

## Installation

1. **Clone the repository:**

   ```sh
   git clone git@github.com:Stevealila/content_generation_platform.git
   cd content_generation_platform
   ```

   1. **Initialize Go modules and get dependencies:**

      ```sh
      go mod init content_generation_platform
      go get -u gorm.io/gorm
      go get -u gorm.io/driver/postgres
      go get -u github.com/air-verse/air
      go get -u github.com/gin-contrib/sessions
      go get -u github.com/gin-contrib/sessions/cookie
      go get -u github.com/google/uuid
      go get -u github.com/joho/godotenv
      go get github.com/google/generative-ai-go
      go get github.com/gin-contrib/cors
      go mod tidy
      ```

   2. **Create and configure `.env` file:**

      ```sh
      cp .env.example .env
      ```

      Edit the `.env` file with your configuration details.

   3. **Run the database migrations:**

      ```sh
      go run models/migrate.go
      ```

   ## Running the Application

   1. Start the application:

      ```
      air
      ```

      The application should now be running, and you can access it at 

      ```
      http://localhost:8080
      ```

   ## Usage

   - **Register a new user:** Send a POST request to `/register` with the user's details.
   - **Log in:** Send a POST request to `/login` with the user's credentials.
   - **Generate API keys:** Once logged in, send a POST request to `/generate-api-key`.
   - **Generate content:** Use the generated API key to send a POST request to `/generate-content`.

   ## Project Structure

   ```
   content_generation_platform/
   | main.go
   | middleware/
   |   └── auth.go
   | config/
   |   └── config.go
   | models/
   |   └── migrate.go
   |   └── user.go
   |   └── apiKey.go
   | controllers/
   |   └── userController.go
   |   └── apiKeyController.go
   | routers/
   |   └── router.go 
   | .env
   ```

   ## Contributing

   Contributions are welcome! Please open an issue or submit a pull request.