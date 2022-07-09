from flask import jsonify
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.metrics.pairwise import cosine_similarity
from warnings import filterwarnings
filterwarnings(action="ignore")
np.set_printoptions(suppress=True)

def preprocessing_data(interest_data):
    # if interest_data.duplicated().sum() > 0:
    #     interest_data.drop_duplicates(inplace = True)
    interest_data = interest_data.fillna(0)
    mm_scaler = preprocessing.MinMaxScaler()
    interest_data_normalized = mm_scaler.fit_transform(interest_data)
    return interest_data_normalized


def findSimilarUsers(user, test_df_new):
    similarity = []
    for i,row in enumerate(test_df_new.values):
        cos = cosine_similarity(user, row.reshape(1, -1))[0][0]
        similarity.append([i, cos])
    temp = pd.DataFrame(similarity, columns=['userId', 'similarity'])
    temp = temp.sort_values(by=['similarity'], ascending=False).copy()
    similar_users = list(temp['userId'].values)
    similarities = list(temp['similarity'].values)
    return (similar_users, similarities)

def results(user_id,data):
    interest_data = data
    interest_data = pd.concat([interest_data.drop('_id', axis=1), pd.DataFrame(interest_data['_id'].apply(pd.Series))], axis=1)
    user_id_df = interest_data["$oid"].to_numpy().reshape(-1, 1)
    interest_data = interest_data.drop(["$oid"], axis = 1)
    interest_data_final = preprocessing_data(interest_data)
    interest_data_final_ = np.concatenate((user_id_df,interest_data_final), axis = 1)
    interest_data_final_df = pd.DataFrame(interest_data_final_)
    a = str(user_id)
    user = interest_data_final_df.loc[interest_data_final_df[0] == a]
    interest_df = interest_data_final_df.drop([0], axis = 1)
    user_arr = user.to_numpy().reshape(1,-1)
    user_arr_final = np.delete(user_arr,0,1)
    result_matrix = findSimilarUsers(user_arr_final, interest_df)
    user_id_list = []
    for i in result_matrix[0][0:3]:
        user_id_list.append(interest_data_final_df.loc[i][0])
    return user_id_list

