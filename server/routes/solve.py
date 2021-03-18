from server.errors import EquationError
from flask import jsonify
from flask import request
from sympy.solvers import solve as s_solve
from sympy import symbols, latex
from .. import app

@app.route('/solve', methods=['POST'])
def solve():
    body = request.json
    try:
        equation = body['equation']
        if '=' in equation:
            sections = equation.split('=')
            if len(sections) > 2:
                raise EquationError
            equation = f'{sections[0]} - ({sections[1]})'
        
        x = symbols('x')
        answers = s_solve(equation, x)
        return jsonify({
            'answers': [latex(answer) for answer in answers]
        })
    except KeyError:
        return jsonify({
            'error': 'missing field'
        })
    except:
        return jsonify({
            'error': 'Invalid equation'
        })