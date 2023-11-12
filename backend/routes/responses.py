from flask import Flask, Blueprint, request, jsonify, Response, make_response

def good_response(data):
    response = make_response(jsonify(data))
    response.status_code = 200
    return response

def good_creation_response(data):
    response = make_response(jsonify(data))
    response.status_code = 201
    #response.headers.set('Access-Control-Allow-Origin', '*')
    return response

def bad_response(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 400
    #response.headers.set('Access-Control-Allow-Origin', '*')
    return response

def unauthorized_response(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 401
    #response.headers.set('Access-Control-Allow-Origin', '*')
    return response

def bad_db_connection(data):
    response = make_response(jsonify({'error': str(data)}))
    response.status_code = 500
    #response.headers.set('Access-Control-Allow-Origin', '*')
    return response


