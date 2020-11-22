from config import *
from flask import Flask, render_template

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # no cache
app.secret_key = 'networkalertdashboard' # has to be set to use session, which is a client side session

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(SERVER, PORT, DEBUG)
