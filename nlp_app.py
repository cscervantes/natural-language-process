from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('pages/home.html', title='Home', path=request.path)

@app.route('/languages')
def languages():
    f = open(os.getcwd()+'/static/languages/lists.txt', 'r')
    contents = f.read()
    return jsonify(contents.split('\n'))


if __name__ == "__main__":
    app.run(debug=True, host='192.168.2.46', port='8000')