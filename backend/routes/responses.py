from flask import Flask, Blueprint, request, jsonify, Response, make_response

def good_response(data):
    response = make_response(jsonify(data))
    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def good_creation_response(data):
    response = make_response(jsonify(data))
    response.status_code = 201
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def bad_response(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 400
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def unauthorized_response(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 401
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def bad_db_connection(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 500
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


