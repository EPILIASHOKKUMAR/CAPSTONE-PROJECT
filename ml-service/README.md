# ML Service (Flask)

A standalone Flask microservice that connects to the Roboflow hosted model for municipal issue detection. This service is optional and does not modify existing project files.

## Endpoints
- GET /health → service status
- POST /predict → body can be:
  - { "imageUrl": "https://...jpg" }
  - { "image": "<base64 image data>" }

Response (success):
```json
{
  "success": true,
  "data": {
    "predictions": [
      { "x": ..., "y": ..., "width": ..., "height": ..., "class": "garbage", "confidence": 0.87 },
      ...
    ],
    "raw": {}
  }
}
```

## Setup
1. Create a Python venv
```powershell
Set-Location "c:\Users\eppil\Downloads\capstone-main\capstone-main\ml-service"
python -m venv .venv
. .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Set environment variables
```powershell
$env:ROBOFLOW_API_KEY = "<your_roboflow_api_key>"
# Optional overrides
# $env:ROBOFLOW_MODEL = "objectdetection-xf7fl/muncipal-issue"
# $env:ROBOFLOW_VERSION = "1"
# $env:PORT = "5001"
```

3. Run service
```powershell
python app.py
```

4. Test
```powershell
# Health
Invoke-WebRequest -Uri http://localhost:5001/health -UseBasicParsing

# Predict with image URL
$body = @{ imageUrl = "https://example.com/test.jpg" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:5001/predict -Body $body -ContentType 'application/json'
```

Notes:
- This service is separate from the Node backend. No existing files were changed.
- Use the Roboflow Universe project you provided. Ensure the API key has access.