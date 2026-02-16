@echo off
echo.
echo ========================================
echo   CONTRA: GRAVITY SHIFT DEPLOYMENT
echo ========================================
echo.
echo This script will help you deploy to Google Cloud Run.
echo Prerequisite: You must have the Google Cloud SDK (gcloud) installed.
echo.

set /p PROJECT_ID="Enter your Google Cloud Project ID: "
set /p SERVICE_NAME="Enter your Service Name (default: contra-gravity-shift): "
if "%SERVICE_NAME%"=="" set SERVICE_NAME=contra-gravity-shift

echo.
echo 1. Enabling required services...
gcloud services enable artifactregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com --project %PROJECT_ID%

echo.
echo 2. Building and pushing container image...
gcloud builds submit --tag gcr.io/%PROJECT_ID%/%SERVICE_NAME% --project %PROJECT_ID%

echo.
echo 3. Deploying to Cloud Run...
gcloud run deploy %SERVICE_NAME% ^
  --image gcr.io/%PROJECT_ID%/%SERVICE_NAME% ^
  --platform managed ^
  --region us-central1 ^
  --allow-unauthenticated ^
  --project %PROJECT_ID%

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
pause
