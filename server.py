from flask import Flask, jsonify, request, render_template

app = Flask(__name__)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/api")
def apiget():
    return jsonify({"message": "got things"})


@app.post("/api")
def apipost():
    return jsonify({"message": "posted", "data": request.json.get("data")})


@app.put("/api")
def apiput():
    return jsonify({"message": "put", "data": request.json.get("data")})


@app.delete("/api")
def apidelete():
    return jsonify({"message": "deleted"})


app.run(debug=True)
