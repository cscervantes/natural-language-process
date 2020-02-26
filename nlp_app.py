from flask import Flask, render_template, request, jsonify
import os
from ip import my_ipv4

app = Flask(__name__)
app.config['ALLOWED_VIDEO_FORMATS'] = [
    '.mpg', '.mpeg', '.avi', '.wmv', '.mov',
    '.rm', '.ram', '.swf', '.flv', '.ogg',
    '.webm', '.mp4'
]


@app.route('/')
def index():
    return render_template('pages/home.html', title='Home', path=request.path)

@app.route('/contact')
def contact():
    return render_template('pages/contact.html', title='Contact', path=request.path)

@app.route('/languages')
def languages():
    f = open(os.getcwd()+'/static/languages/lists.txt', 'r')
    contents = f.read()
    return jsonify(contents.split('\n'))

@app.route('/upload_video', methods=['POST'])
def upload_file():
    response = {}
    files = request.files['file']
    filename = files.filename
    file_type = files.content_type
    file_ext = '.'+filename.rsplit('.')[1]

    if file_ext in app.config['ALLOWED_VIDEO_FORMATS']:
        response['message'] = 'Success'
        response['filename'] = filename
        response['file_type'] = file_type
        response['upload_location'] = '/static/uploads/'+filename
        files.save(os.getcwd()+'/static/uploads/'+filename)
    else:
        response['message'] = 'Error'
        response['error_message'] = 'Sorry video format is not supported.'
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, host=my_ipv4(), port='8000')