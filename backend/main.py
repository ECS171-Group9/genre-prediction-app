from flask import Flask, jsonify, send_from_directory


app = Flask(__name__)


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('../dist', path)


@app.route('/')
def root():
    return send_from_directory('../dist', 'index.html')


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
