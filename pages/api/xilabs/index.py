from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.datastructures import FileStorage
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ.get('XI_API_KEY')
app = Flask(__name__)
CORS(app)


@app.route('/api/xilabs/tts', methods=['POST'])
def text_to_speech():
    xi_api_key = api_key

    text = request.json.get('script')
    voice_id = request.json.get('voice_id')

    model_id = 'eleven_monolingual_v1'

    voice_settings = {
        "similarity_boost": 0.8,  # provide appropriate value
        "stability": 0.7,  # provide appropriate value
    }

    url = f'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}'
    headers = {
        'accept': 'audio/mpeg',
        'xi-api-key': xi_api_key,
        'Content-Type': 'application/json'
    }
    data = {
        'model_id': model_id,
        'text': text,
        'voice_settings': voice_settings,
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))

    return response.content, response.status_code

@app.route('/api/xilabs/create_new_voice', methods=['POST'])
def create_new_voice():
    xi_api_key = api_key

    name = request.form.get('name')
    labels = request.form.get('labels')
    description = request.form.get('description')

    # Get the uploaded files. The keys ('file1', 'file2') need to match the names used in the form submission
    voice_sample1 = request.files.get('file1')  # returns a werkzeug.datastructures.FileStorage object, or None if 'file1' is not present
    voice_sample2 = request.files.get('file2')  # similarly for 'file2'

    url = "https://api.elevenlabs.io/v1/voices/add"

    headers = {
        "Accept": "application/json",
        "xi-api-key": xi_api_key
    }

    data = {
        'name': name,
        'labels': labels,
        'description': description
    }

    # Build the files parameter for the requests.post call
    files = []
    if isinstance(voice_sample1, FileStorage):
        files.append(('files', (voice_sample1.filename, voice_sample1.read(), 'audio/mpeg')))
    if isinstance(voice_sample2, FileStorage):
        files.append(('files', (voice_sample2.filename, voice_sample2.read(), 'audio/mpeg')))

    response = requests.post(url, headers=headers, data=data, files=files)
    return jsonify(response.json())

@app.route('/api/xilabs/get_voices', methods=['GET'])
def get_voices():
    xi_api_key = api_key

    url = 'https://api.elevenlabs.io/v1/voices'

    headers = {
        'accept': 'application/json',  # Fixed the quotation marks here
        'xi-api-key': xi_api_key,
    }

    response = requests.get(url, headers=headers)
    voices = response.json()
    return jsonify(voices)

@app.route('/api/xilabs/get_history', methods=['GET'])
def get_history():
    xi_api_key = api_key  # Replace this with your actual key

    PAGE_SIZE = 100
    url = "https://api.elevenlabs.io/v1/history"

    headers = {
        "Accept": "application/json",
        "xi-api-key": xi_api_key
    }

    history = []
    last_history_item_id = None

    while True:
        params = {
            "page_size": PAGE_SIZE,
            "start_after_history_item_id": last_history_item_id
        }
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            # Log error and break if API call fails
            print(f"API call failed with status code {response.status_code}")
            break
        data = response.json()
        if "history" in data:
            history.extend(data["history"])
            if not data["has_more"]:
                break
            last_history_item_id = data["last_history_item_id"]
        else:
            # Log error and break if "history" key is not in response
            print("Response does not contain 'history' key")
            break

    return jsonify(history)

@app.route('/api/xilabs/download_voiceover/', methods=['POST'])
def download_history_items(history_item_ids):
    url = "https://api.elevenlabs.io/v1/history/download"
    
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    
    data = {
        "history_item_ids": history_item_ids
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        # Save the downloaded file or process the response as needed
        content = response.content
        # ... your code to save the content or handle the response
    else:
        print("Download failed with status code:", response.status_code)
        print(response.text)


@app.route('/api/xilabs/delete_voiceover/', methods=['DELETE'])
def delete_voiceover(voiceover_id):
    voiceover_id = request.json.get("voiceover_id")
    url = f'https://api.elevenlabs.io/v1/history/{voiceover_id}'

    headers = {
        "Accept": "audio/json",
        "xi-api-key": xi_api_key
    }

    response = requests.delete(url, headers=headers)


if __name__ == '__main__':
    app.run(debug=True)

