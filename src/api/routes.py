"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rol, Interviewer, Category, Question
from api.models import db, User, Rol, Interviewer, Category, Question
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    if body_email and body_password:
        user = User.query.filter_by (email=body_email).filter_by(password=body_password).first ()
        if user:
            token = create_access_token(identity= user.id)
            return jsonify({"logged": True, "user": user.serialize(), "token": token }), 200 # serialize es para pasar del lenguaje normal al lenguaje json """
        else: 
            return jsonify({"logged": False, "msg": "Revise el email o contraseña"}), 400
    else:
     
        return jsonify({"logged":False, "msg": "Revisa la información"}), 400


@api.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    user_id=get_jwt_identity()
    user=User.query.get(user_id)
    if user:
        return jsonify ({"logged": True, "user":user.serialize()}), 200
    else:
        return jsonify ({"logged": False, "msg": "Por favor, inicia sesión."}), 400


@api.route('/register', methods=['POST'])
def register():
    body_username = request.json.get("username")   
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    body_rol_id = request.json.get("rol_id")

    if body_email and body_password and body_username and body_rol_id:
        user = User(email=body_email, password=body_password, username=body_username, rol_id=body_rol_id)
        if user:
            token = create_access_token(identity= user.id)
            db.session.add(user)
            db.session.commit()
            return jsonify({"logged": True, "user": user.serialize(), "token": token }), 200 # serialize es para pasar del lenguaje normal al lenguaje json """
        else: 
            return jsonify({"logged": False, "msg": "Usuario no encontrado"}), 400
    else:
        return jsonify({"logged":False, "msg": "Revisa la información"}), 400

@api.route('/roles', methods=['GET'])
def getroles():
    roles = Rol.query.all()
    return jsonify ({"Roles": list(map(lambda x:x.serialize(), roles))}), 200

@api.route('/entrevistados', methods=['GET'])
def getEntrevistados():
    entrevistados = Interviewer.query.all()
    return jsonify ({"Entrevistados": list(map(lambda x:x.serialize(), entrevistados))}), 200

@api.route('/entrevistados/<int:id>', methods=['GET'])
def getEntrevistado(id): 
    entrevistado = Interviewer.query.filter_by(id=id).first()
    return jsonify ({"Entrevistado": entrevistado.serialize()}), 200

@api.route('/preguntas', methods=['POST'])
@jwt_required()
def preguntas():
    user_id = get_jwt_identity ()
    body_text = request.json.get("text")
    body_interviewer_id = request.json.get("interviewer_id")
    body_category_id = request.json.get("category_id")
    if body_text and body_category_id:
        question = Question (text=body_text, interviewer_id = body_interviewer_id, category_id = body_category_id, user_id = user_id)
        db.session.add(question)
        db.session.commit()
        return jsonify ({"message":"Pregunta enviada", "question": question.serialize()}), 200
    else:
        return jsonify({"message": "Campo obligatorio no rellenado"}), 400

@api.route('/category', methods=['GET'])
def getcategory():
    categories = Category.query.all()
    return jsonify ({"Categories": list(map(lambda x:x.serialize(), categories))}), 200


@api.route('/edituser', methods=['PUT'])
@jwt_required()
def editprofile():
    user_id = get_jwt_identity ()
    user = User.query.get (user_id) #Esto trae el usuario que está logueado
    if user: 
        body_username = request.json.get("username") #lo que pilla el valor del input del username
        if body_username == "" or body_username == None:
            body_username = user.username
        body_email = request.json.get("email")
        if body_email == "" or body_email == None:
            body_email = user.email
        body_password = request.json.get("password")
        if body_password == "" or body_password == None:
            body_password = user.password
        user.username = body_username
        user.email = body_email
        user.password = body_password
        db.session.commit() #esto es para subirlo a la base de datos
        return jsonify ({"message":"Cambios guardados", "user": user.serialize()}), 200
    else:
        return jsonify({"message": "Inicie sesión"}), 400


@api.route('/deletequestion', methods=['DELETE'])
@jwt_required()
def deletequestion():
  
    user_id = get_jwt_identity ()
    body_question_id = request.json.get("id")
    
    getquestion = Question.query.get(body_question_id)
    
    
    if getquestion:

        db.session.delete(getquestion)

        db.session.commit() #esto es para subirlo a la base de datos
        
   
    
        return jsonify ({"message": "Pregunta eliminada"}), 200
    else: 
        return jsonify ({"message": "Pregunta no eliminada"}), 400


@api.route('/likes', methods=['POST'])
@jwt_required()
def likes():
    user_id = request.json.get("user_id")
    print ("@@@@@user_id", user_id)
    body_question_id = request.json.get("id")   
    print ("@@@@@body_question_id", body_question_id)
    user = User.query.get (user_id)
    print ("@@@@@user", user)
    if body_question_id:
        question = Question.query.get(body_question_id)
        print ("@@@@@question", question)
        if user not in question.likes:
            question.likes.append (user)
            db.session.commit()
            return jsonify ({"Liked":True, "Dislike": False, "Troll": False}), 200
        else:
            question.likes = list(filter(lambda x:x.id != user.id, question.likes))
            db.session.commit(),
            return jsonify({"Liked": False, "Message": "ya le ha dado like"}), 400
    else:
        return jsonify({"Liked": False, "Message": "Falta ID de pregunta"}), 400


@api.route('/dislikes', methods=['POST'])
@jwt_required()
def dislike():
    user_id = request.json.get("user_id")
    print ("@@@@@user_id", user_id)
    body_question_id = request.json.get("id")   
    print ("@@@@@body_question_id", body_question_id)
    user = User.query.get (user_id)
    print ("@@@@@user", user)
    if body_question_id:
        question = Question.query.get(body_question_id)
        print ("@@@@@question", question)
        if user not in question.dislikes:
            question.dislikes.append (user)
            db.session.commit()
            return jsonify ({"Liked":False, "Dislike": True, "Troll": False}), 200
        else:
            question.dislikes = list(filter(lambda x:x.id != user.id, question.dislikes))
            db.session.commit(),
            return jsonify({"Dislike": False, "Message": "ya le ha dado dislike"}), 400
    else:
        return jsonify({"Dislike": False, "Message": "Falta ID de pregunta"}), 400



@api.route('/trolls', methods=['POST'])
@jwt_required()
def trolls():
    user_id = request.json.get("user_id")
    print ("@@@@@user_id", user_id)
    body_question_id = request.json.get("id")   
    print ("@@@@@body_question_id", body_question_id)
    user = User.query.get (user_id)
    print ("@@@@@user", user)
    if body_question_id:
        question = Question.query.get(body_question_id)
        print ("@@@@@question", question)
        if user not in question.trolls:
            question.trolls.append (user)
            db.session.commit()
            return jsonify ({"Liked":False, "Dislike": False, "Troll": True}), 200
        else:
            question.trolls = list(filter(lambda x:x.id != user.id, question.trolls))
            db.session.commit(),
            return jsonify({"Troll": False, "Message": "ya le ha dado troll"}), 400
    else:
        return jsonify({"Troll": False, "Message": "Falta ID de pregunta"}), 400


@api.route('/getpreguntas', methods=['GET'])
@jwt_required()
def getpreguntas():
    user_id = get_jwt_identity ()
    preguntas = Question.query.filter_by(user_id = user_id).all()
    #return jsonify ({"Question": preguntas.serialize()}), 200
    return jsonify ({"Question": list(map(lambda x:x.serialize(), preguntas))}), 200


@api.route('/done', methods=['PUT'])
@jwt_required()
def done():
    body_question_id = request.json.get("id") #pillar el ID del front
    question = Question.query.get (body_question_id) #esto me busca la pregunta en si
    body_done = request.json.get("done")
    question.done = body_done
    db.session.commit() 
    return jsonify ({"message":"Cambios guardados", "Question": question.serialize()}), 200
    