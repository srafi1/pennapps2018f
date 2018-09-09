from flask import Flask, render_template, request
from algoliasearch import algoliasearch
import requests
import unirest
import json

app = Flask(__name__)

client = algoliasearch.Client("EKBPNS72VM", 'f9c93e7e2ca6d13410b38757e0aec21e')

submissions = dict()
with open('data.json') as f:
    submissions = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search')
def search():
    text = request.args.get('jsdata')

    res = unirest.post("https://twinword-topic-tagging.p.mashape.com/generate/",
                            headers={
                                    "X-Mashape-Key": "yl3VcenMlfmshPcSaR0A21BJS82Sp1Mvq8LjsnkzSXBXvwXfVg",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept": "application/json"

                            },
                            params={
                                    "text": text
                            }
    )

    keywords = res.body['keyword']

    synonyms = []

    for keyword in keywords:
        synRes = unirest.get("https://wordsapiv1.p.mashape.com/words/" + keyword + "/synonyms",
                             headers={
                                 "X-Mashape-Key": "yl3VcenMlfmshPcSaR0A21BJS82Sp1Mvq8LjsnkzSXBXvwXfVg",
                                 "Accept": "application/json"
                             }
        )

        synList = synRes.body['synonyms']
        synonyms += synList[:3] if len(synList) >= 3 else synList

    if False: #if text
        similar = []

        for submission in submissions:
            if submission['info'] != '':
                response = unirest.post("https://twinword-text-similarity-v1.p.mashape.com/similarity/",
                                        headers={
                                            "X-Mashape-Key": "yl3VcenMlfmshPcSaR0A21BJS82Sp1Mvq8LjsnkzSXBXvwXfVg",
                                            "Content-Type": "application/x-www-form-urlencoded",
                                            "Accept": "application/json"
                                        },
                                        params={
                                            "text1": text,
                                            "text2": submission['info']
                                        }
                )


                if response.body['similarity'] > 0.3:
                    similar.append(submission['info'])

    return json.dumps({'keywords':keywords, 'synonyms':synonyms})

@app.route('/getTitles')
def getTitles():
    return json.dumps([submission['title'] for submission in submissions if submission['title']])

if __name__ == '__main__':
    app.run(debug=True)
