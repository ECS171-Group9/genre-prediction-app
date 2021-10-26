from flask import Flask, jsonify, send_from_directory, request


app = Flask(__name__)


@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('../dist', path)


@app.route('/')
def root():
    return send_from_directory('../dist', 'index.html')


@app.route('/prediction', methods=['POST'])
def get_prediction():
    request_data = request.get_json()
    summary = request_data.get('data')
    try:
        genre = prediction(summary)
        return jsonify({'data': genre})

    except Exception as e:
        app.logger.error(f'Exception occurred retrieving summary. {e}')


def prediction(summary: str) -> str:
    # Need to implement predictive model here
    app.logger.debug(summary)

    # testing summary value
    genre = summary
    return genre


if __name__ == '__main__':
    app.run(debug=True)
