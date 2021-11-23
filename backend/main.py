"""
Created for Group 9's group project in ECS 171 Fall 2021
"""
import re
import pickle
import logging
from .configs import *
import tempfile

import numpy as np
from google.cloud import storage
from flask import Flask, jsonify, send_from_directory, request
from tensorflow.keras.models import load_model


app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)


def download_model(bucket_name=gc_bucket_name, source_blob_name=gc_source_blob_name) -> any:
    """
    Retrieve NN model from Google Cloud Storage
    :param bucket_name:
    :param source_blob_name:
    :return:
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    with tempfile.NamedTemporaryFile() as temp:
        blob = bucket.blob(source_blob_name)
        blob.download_to_filename(temp.name)
        logging.debug("Download Successful!")
        return load_model(temp.name)


# load needed assets into memory
model = download_model()
vocabulary = pickle.load(open('backend/vocab_dict.pkl', 'rb'))
mlb = pickle.load(open('backend/mlb.pkl', 'rb'))

summary_length = summary_size


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


def prediction(summary: str) -> list:
    """
    Run cleaning processes and return a list of the predicted genres for the summary
    :param summary: text description of a book
    :return: list of possible predicted genres
    """

    tokenized_summary = summary_preprocessing(summary)

    # logging.debug(f'tokenized_summary: {tokenized_summary}')
    # logging.debug(f'Type: {type(tokenized_summary)}, Shape: {np.asarray(tokenized_summary).shape} ')

    prediction_summary = np.reshape(tokenized_summary, (1, summary_length))
    # logging.debug(f'prediction_summary: {prediction_summary}')

    output = model.predict(prediction_summary).tolist()
    logging.debug(f'output: {output}')

    score = [[(value > 0.2)*1 for value in element] for element in output]
    logging.debug(f'score: {score}')

    genre = mlb.inverse_transform(np.asarray(score))
    logging.debug(f'genre: {genre}')
    return genre


def summary_preprocessing(summary: str) -> list:
    """
    Function takes a submitted summary and performs the preprocessing necessary for our prediction model

    :param summary: str of words summarizing a book
    :return:
    """
    clean_summary = clean_text(summary)

    logging.debug(f'clean_summary: {clean_summary}')

    tokenized_summary = tokenizer(summary=clean_summary, vocab_dict=vocabulary, summary_length=summary_length)
    return tokenized_summary


def tokenizer(summary, vocab_dict, summary_length) -> list:
    """
    Function that tokenizes a book summary to use on a genre prediction model

    :param summary: Summary to convert to tokens
    :param vocab_dict: Vocabulary used to train the model, dictionary mapping words to tokens
    :param summary_length: Length of the summary
    :return:  List of length summary_length, pre-padded with zeroes if the desc length was less than max_desc_length
    """

    token_list = [vocab_dict[i] if i in vocab_dict else 0 for i in summary.split()]

    logging.debug(f'token_list: {token_list}')
    padding = [0] * summary_length
    if len(token_list) < summary_length:
        return np.asarray(padding[:summary_length - len(token_list)] + token_list).squeeze()
    else:
        return np.asarray(token_list[:summary_length]).squeeze()


def clean_text(text: str) -> str:
    """
    Clean contractions from the text
    :param text: summary to clean up
    :return: summary with contractions converted
    """
    text = text.lower()
    text = re.sub(r"what's", "what is ", text)
    text = text.replace('(ap)', '')
    text = re.sub(r"\'s", " is ", text)
    text = re.sub(r"\'ve", " have ", text)
    text = re.sub(r"can't", "cannot ", text)
    text = re.sub(r"n't", " not ", text)
    text = re.sub(r"i'm", "i am ", text)
    text = re.sub(r"\'re", " are ", text)
    text = re.sub(r"\'d", " would ", text)
    text = re.sub(r"\'ll", " will ", text)
    text = re.sub(r'\W+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r"\\", "", text)
    text = re.sub(r"\'", "", text)
    text = re.sub(r"\"", "", text)
    text = re.sub('[^a-zA-Z ?!]+', '', text)
    text = _remove_non_ascii(text)
    text = text.strip()
    return text


def _remove_non_ascii(summary: str) -> str:
    return "".join(i for i in summary if ord(i) < 128)


if __name__ == '__main__':
    app.run(debug=True)
