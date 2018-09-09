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
    print text
    if text:
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

    return render_template('suggestions.html', suggestions = similar)

@app.route('/getTitles')
def getTitles():
    return json.dumps([submission['title'] for submission in submissions if submission['title']])

if __name__ == '__main__':
    app.run(debug=True)
