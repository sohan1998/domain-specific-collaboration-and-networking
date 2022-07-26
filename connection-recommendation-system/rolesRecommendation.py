from bson import ObjectId
from flask import jsonify
import nltk
import emoji
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import io
import os
import re
import string
import matplotlib.pyplot as plt
from scipy.sparse import csr_matrix
from warnings import filterwarnings
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import preprocessing
from sklearn.metrics.pairwise import cosine_similarity
from warnings import filterwarnings
filterwarnings(action="ignore")
np.set_printoptions(suppress=True)
# nltk.download('all')


stop = stopwords.words('english')
stop_words_ = set(stopwords.words('english'))
wn = WordNetLemmatizer()
tfidf_vectorizer = TfidfVectorizer()


def black_txt(token):
    return  token not in stop_words_ and token not in list(string.punctuation)  and len(token)>2   

def clean_txt(text):
  clean_text = []
  clean_text2 = []
#   print("PRINTING TEXT =>",text)
  text = re.sub("'", "",text)
  text = re.sub("(\\d|\\W)+"," ",text) 
  text = text.replace("nbsp", "")
  clean_text = [ wn.lemmatize(word, pos="v") for word in word_tokenize(text.lower()) if black_txt(word)]
  clean_text2 = [word for word in clean_text if black_txt(word)]
  return " ".join(clean_text2)


def preprocess_job_data(job_df):
    job_processed_df = job_df.fillna(str(np.NAN))
    job_processed_df["tags"] = job_processed_df["tags"].apply(lambda x: ", ".join(map(str, x)))
    for value in job_processed_df.columns:
        if value != "_id" and value != 'projectId':
            job_processed_df[value] = job_processed_df[value].apply(clean_txt)
    job_processed_df['text'] = job_processed_df['title'].map(str) + " " + job_processed_df['description'].map(str) + " " +job_processed_df['tags'].map(str)
    job_processed_df = job_processed_df.drop(["projectId","title","description","tags"], axis = 1)
    return job_processed_df


def preprocess_user_data(user_df):
    user_processed_df = user_df.fillna(str(np.NAN))
    user_processed_df["skills"] = user_processed_df["skills"].apply(lambda x: ", ".join(map(str, x)))
    temp = []
    for i in range(len(user_processed_df.professionalExperience)):
        for key,val in user_processed_df.professionalExperience[i].items():
            if key == 'position':
                temp.append(val)
    user_processed_df["previousTitle"] = " ".join(map(str,temp))
    interests = []
    for key,value in user_processed_df.interests[0].items():
        if int(value) >= 3:
            interests.append(key)
    user_processed_df["modifiedInterests"] = " ".join(map(str,interests))
    for value in user_processed_df.columns:
        if value != "_id" and value != "professionalExperience" and value != "interests":
            user_processed_df[value] = user_processed_df[value].apply(clean_txt)
    user_processed_df['text'] = user_processed_df['skills'].map(str) + " " + user_processed_df['about_me'].map(str) + " " + user_processed_df['previousTitle'].map(str) + " " + user_processed_df['modifiedInterests'].map(str)
    user_processed_df = user_processed_df.drop(["professionalExperience","interests","skills","about_me","previousTitle","modifiedInterests"], axis = 1)
    return user_processed_df

def get_recommendation(top, df_all, scores,user_data):
  recommendation = pd.DataFrame(columns = ['user_id', 'job_id', 'project_id' ,'title', 'description' ,'score'])
  count = 0
  for i in top:
      recommendation.at[count, 'user_id'] = user_data['_id'][0]['$oid']
      recommendation.at[count, 'job_id'] = df_all['_id'][i]['$oid']
      recommendation.at[count, 'project_id'] = df_all['projectId'][i]['$oid']
      recommendation.at[count, 'title'] = df_all['title'][i]
      recommendation.at[count, 'description'] = df_all['description'][i]
      recommendation.at[count, 'score'] =  scores[count]
      count += 1
  return recommendation


def findSimilarRoles(user_data,job_data,job_data_copy):
    tfidf_jobs = tfidf_vectorizer.fit_transform((job_data['text']))
    user_tfidf = tfidf_vectorizer.transform(user_data['text'])
    cos_similarity_tfidf = map(lambda x: cosine_similarity(user_tfidf, x),tfidf_jobs)
    # print(cos_similarity_tfidf)
    output_ = list(cos_similarity_tfidf)
    # print(output_)
    top = sorted(range(len(output_)), key=lambda i: output_[i], reverse=True)[:]
    # print(output_[0][0][0])
    list_scores = [output_[i][0][0] for i in top]
    return get_recommendation(top, job_data_copy, list_scores,user_data)



def result(user_data, job_data):
    # print(user_data.columns,job_data)
    user_data_copy = user_data
    job_data_copy = job_data
    job_data_copy_preprocessed = preprocess_job_data(job_data_copy)
    user_data_copy_preprocessed = preprocess_user_data(user_data_copy)
    # print(type(job_data_copy_preprocessed),"\n",type(user_data_copy_preprocessed))
    result = findSimilarRoles(user_data_copy_preprocessed,job_data_copy_preprocessed,job_data_copy)
    return result