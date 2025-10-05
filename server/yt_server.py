from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from linkinstall import YtStaller

app = Flask(__name__)
CORS(app)


@app.route("/download", methods=["POST"])
def download_video():
    data = request.json
    url = data.get("url")
    yt = YtStaller()

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        yt.download_video(url)
        # Customize yt-dlp command as needed
        #     subprocess.run(["yt-dlp", url], check=True)
        return jsonify({"status": "Download successful"})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8080)
