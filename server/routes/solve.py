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
        if equation.count('=') == 1:
            equation = equation.replace('=', '-')
        elif equation.count('=') > 1:
            raise EquationError
        
        x = symbols('x')
        answers = s_solve(equation, x)
        print(answers)
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
