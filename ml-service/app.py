import os
import base64
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# Flask app
app = Flask(__name__)
CORS(app)

# Config
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY", "IgtHBvG6NpnoVSZBZ5or")
ROBOFLOW_MODEL = os.getenv("ROBOFLOW_MODEL", "muncipal-issue")  # ✅ Correct model name
ROBOFLOW_VERSION = os.getenv("ROBOFLOW_VERSION", "1")
ROBOFLOW_BASE = os.getenv("ROBOFLOW_BASE", "https://detect.roboflow.com")


# Health checks
@app.get("/health")
def health():
    return jsonify({"success": True, "service": "ml-service", "status": "ok"})


@app.get("/")
def root():
    return jsonify({"success": True, "service": "ml-service is running...", "status": "ok"})


def _predict_image_bytes(image_bytes: bytes):
    if not ROBOFLOW_API_KEY:
        return {"error": "Missing ROBOFLOW_API_KEY"}, 400

    # ✅ Fixed URL
    url = f"{ROBOFLOW_BASE}/{ROBOFLOW_MODEL}/{ROBOFLOW_VERSION}"
    params = {"api_key": ROBOFLOW_API_KEY}

    try:
        files = {"file": ("image.jpg", image_bytes, "application/octet-stream")}
        resp = requests.post(url, params=params, files=files, timeout=30)

        if resp.status_code != 200:
            return {
                "error": "Roboflow request failed",
                "status": resp.status_code,
                "details": resp.text
            }, 502

        data = resp.json()
        return {"predictions": data.get("predictions", []), "raw": data}, 200
    except Exception as e:
        return {"error": str(e)}, 500


@app.post("/predict")
def predict():
    body = request.get_json(silent=True) or {}

    # Case 1: imageUrl
    image_url = body.get("imageUrl")
    if image_url:
        try:
            headers = {"User-Agent": "Mozilla/5.0"}
            r = requests.get(image_url, headers=headers, timeout=20)
            if r.status_code != 200:
                return jsonify({
                    "success": False,
                    "message": "Failed to fetch image URL",
                    "status": r.status_code
                }), 400

            result, code = _predict_image_bytes(r.content)
            return jsonify({"success": code == 200, "data": result}), code
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 500

    # Case 2: base64
    b64 = body.get("image")
    if b64:
        try:
            if b64.startswith("data:"):
                b64 = b64.split(",", 1)[1]
            image_bytes = base64.b64decode(b64)
            result, code = _predict_image_bytes(image_bytes)
            return jsonify({"success": code == 200, "data": result}), code
        except Exception as e:
            return jsonify({
                "success": False,
                "message": f"Invalid base64: {e}"
            }), 400

    return jsonify({"success": False, "message": "Provide imageUrl or base64 'image'"}), 400


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
