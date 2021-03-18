from . import app
from .routes import *

if __name__ == '__main__':
    app.run(port=4000, debug=True)