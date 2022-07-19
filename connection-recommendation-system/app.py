from crypt import methods
import json
from flask import Flask, Response,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from numpy import equal
import recommendation
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

if __name__ == '__main__':
    app.run(port=5000,debug=True)