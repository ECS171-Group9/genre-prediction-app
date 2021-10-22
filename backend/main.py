from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='dist', template_folder='dist')
CORS(app)


@app.route("/", methods=['GET'])
def hello():
    return jsonify({'text': 'Hello World!'})


@app.route("/prediction/", methods=['GET'])
def get_prediction():
    genre = prediction()
    return jsonify({'data': genre})


def prediction() -> str:
    # Need to implement predictive model here
    genre = 'Fiction'
    return genre


if __name__ == '__main__':
    app.run(debug=True)
