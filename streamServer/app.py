import requests
from json import jsonify
from flask import Flask
app = Flask(__name__)


@app.route('/send-data', methods=['POST'])
def send_data():
    # Extract data from the frontend request
    frontend_data = requests.json

    # Define the options for the API request
    options = {
        'method': 'POST',
        'headers': {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization': frontend_data.get('authorization')
        },
        'body': frontend_data.get('body')
    }

    # Send the request to the API
    response = requests.post('https://api.d-id.com/talks/streams', headers=options['headers'], json=options['body'])

    # Check if the request was successful
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Failed to fetch data from API"}), 500

if __name__ == '__main__':
    app.run(debug=True)
