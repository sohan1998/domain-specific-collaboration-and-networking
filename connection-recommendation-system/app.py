from crypt import methods
import json
from turtle import clear
from flask import Flask,request,jsonify,Response
from flask_pymongo import PyMongo
from flask_cors import CORS
from numpy import equal
from pyparsing import And
import recommendation
import rolesRecommendation
from bson.json_util import dumps
import pandas as pd
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app)

mongodb_client = PyMongo(app, uri="mongodb+srv://circles:Rtgtgu8XguBLPK8Q@cluster0.k22ni.mongodb.net/circles?retryWrites=true&w=majority")
db = mongodb_client.db

@app.route("/")
def home():
    return "Hello, Flask!"

def drop_column(df):
    revised_df = df
    l = df.columns
    c = 0
    for i in l:
        if i != "_id" and i != "interests":
            revised_df = revised_df.drop([i], axis = 1)
            c += 1
    return revised_df

def get_data():
    users = db.users.find()
    list_cur = list(users)
    json_data = dumps(list_cur, indent = 2) 
    # with open('data.json', 'w') as file:
    #     file.write(json_data)
    df = pd.read_json(json_data, orient ='records')
    new_df = drop_column(df)
    final_df = pd.concat([new_df.drop('interests', axis=1), pd.DataFrame(new_df['interests'].apply(pd.Series))], axis=1)
    return final_df


def fetch_user_data(userId):
    x = db.users.find_one({"_id": ObjectId(userId)})
    return x


@app.route('/recommend/',methods=['GET'])
def recommend_connections():
    user_id = request.args.get("_id")
    alt = "Connect With Me"
    data = get_data()
    result = recommendation.results(user_id,data)
    res = dict()
    for i,v in enumerate(result):
        res[i] = fetch_user_data(v)
    # return res
    return Response(json.dumps(res,default=str),mimetype="application/json")

def drop_column_roles(df):
    revised_df = df
    l = df.columns
    c = 0
    for i in l:
        if i != "_id" and i != "interests" and i != "skills" and i!= "about_me" and i != "professionalExperience":
            revised_df = revised_df.drop([i], axis = 1)
            c += 1
    return revised_df


def get_user_data_roles(userId):
    users = db.users.find({"_id": ObjectId(userId)})
    list_cur = list(users)
    json_data = dumps(list_cur, indent = 2)
    df = pd.read_json(json_data, orient ='records')
    new_df = drop_column_roles(df)
    return new_df 
###
def drop_jobs_column_roles(df):
    revised_df = df
    l = df.columns
    c = 0
    for i in l:
        if i != "_id" and i != "title" and i != "description" and i != "tags":
            revised_df = revised_df.drop([i], axis = 1)
            c += 1
    return revised_df

def get_job_data_roles():
    jobs = db.jobs.find()
    list_jobs = list(jobs)
    json_data_jobs = dumps(list_jobs, indent = 2)
    jobs_df = pd.read_json(json_data_jobs, orient ='records')
    new_jobs_df = drop_jobs_column_roles(jobs_df)
    return new_jobs_df
###

def checkAppliedOrNot(job_id_list,user_id):
    final = list()
    for i in job_id_list:
        application = db.applications.find_one({"$and":[{"jobId":ObjectId(i)},{"userId": ObjectId(user_id)}]})
        if application:
            final.append(i)
    return final


@app.route('/recommendRoles/',methods=['GET'])
def recommend_roles():
    user_id = request.args.get("_id")
    # user_id = "62d7d9d1f69bb0703cb3f919"
    user_data = get_user_data_roles(user_id)
    job_data = get_job_data_roles()
    # print(user_data, "\n", job_data)
    result = rolesRecommendation.result(user_data, job_data)
    # print(result.info())
    a = result['job_id'].to_list()
    checkedJobLists = checkAppliedOrNot(a,user_id)
    # print("Result=>", result)
    # print("checkedJobLists=>",checkedJobLists)
    for id_ in checkedJobLists:
        print(type(id_))
        result.drop(result[(result['job_id'] == id_)].index, inplace = True)
    
    # res = pd.DataFrame(result)
    final = result.to_json(orient = 'records')
    return final
    # return Response(json.dumps(result,default=str),mimetype="application/json")


if __name__ == '__main__':
    app.run(port=5000,debug=True)