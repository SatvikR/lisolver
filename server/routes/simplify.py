from flask import jsonify, request
from sympy import simplify as s_simplify, latex
from .. import app

@app.route('/simplify', methods=['POST'])
def simplify():
    body = request.json
    try:
        equation = body['equation']
        if '=' in equation:
            return jsonify({
                'error': 'cannot have \'=\' in simplify expression'
            })
        answer = s_simplify(equation)
        return jsonify({
            'answer': latex(answer)
        })
    except KeyError:
        return jsonify({
            'error': 'missing field'
        })
    except:
        return jsonify({
            'error': 'invalid equation'
        })