from Admin import admin
from Main_ui import main_ui
from flask import Flask,render_template,redirect

__author__ = 'Chenge'

app = Flask(__name__)

app.secret_key = b'\x15$\xaa\x82\x9eB\xe2\xe7,0\xfbn\xf5\xa6f\xa4\x88\x12\x91\\\xd0\xc1\xcd*'


app.register_blueprint(admin,url_prefix='/admin/')
app.register_blueprint(main_ui)



@app.errorhandler(404)
def page_not_found(e):
    return render_template('Admin/404.html'),404

if __name__ == '__main__':
    app.run(port=8000,debug=True)