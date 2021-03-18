from . import app
from .routes import *
import os

if __name__ == '__main__':
    if os.getenv('FLASK_ENV') == 'production':
        app.run(port=4000, host='0.0.0.0')
    else:
        app.run(port=4000, debug=True)
