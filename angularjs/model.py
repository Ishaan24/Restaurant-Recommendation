
# coding: utf-8

# ### Import Libraries

# In[ ]:

import sys
import pandas as pd
import numpy as np
import pymysql
import matplotlib.pyplot as plt
import numpy as np
from operator import itemgetter


# ### Functions 

# In[ ]:


def list_sim(list1, list2):
    i = 0
    for val in list1:
        if val in list2:
            i+=1
    return i

def remove_dupe(myList):
    cleanlist = []
    [cleanlist.append(x) for x in myList if x not in cleanlist]
    return cleanlist

def Data_load_Preprocess(data_df): # Loads restaurant data from csv and returns preprocessed DataFrame
    
    # Generate an alphabetically sorted list of Indian Cities in Database
    city_list = []
    for index, row in data_df.iterrows():
        if row['Country Code'] == 1:
            city_list.append(str(row['City']))
    city_list = list(set(city_list))
    city_list = sorted(city_list) 

    # Data Preprocessing - Dropping restaurant data not in India, Encoding values

    # Generating List of values to drop
    drop_list = []
    i = 0
    for index, row in data_df.iterrows():
        if row['Country Code'] != 1:
            drop_list.append(i)
        i += 1  

    for city in city_list:
        data_df['City'].replace(
            to_replace= [city],
            value=city_list.index(city),
            inplace=True
        )

    data_df['Has Table booking'].replace(
        to_replace = ['No'],
        value = 0,
        inplace = True
    )

    data_df['Has Table booking'].replace(
        to_replace = ['Yes'],
        value = 1,
        inplace = True
    )

    data_df['Has Online delivery'].replace(
        to_replace = ['No'],
        value = 0,
        inplace = True
    )

    data_df['Has Online delivery'].replace(
        to_replace = ['Yes'],
        value = 1,
        inplace = True
    )

    # Scaling Average Cost for Two value
    data_df['Average Cost for two'] = (data_df['Average Cost for two'])/1000 

    # Select Columns in dataframe for computing cosine similarity between user and restaurant dataframe values
    data_df_select = data_df.drop(drop_list)[['Restaurant ID', 'City', 'Has Table booking', 'Has Online delivery', 'Average Cost for two']]
    return data_df_select, city_list


# ### Open Db connection

# In[ ]:


#DB Connection

try:
    hostname = 'restaurant.cj3bln36gwtc.us-west-1.rds.amazonaws.com'
    username = 'master'
    password = 'master123'
    dbname = 'master'
    conn = pymysql.connect(host = hostname, user = username, passwd = password, db = dbname)
    cursor = conn.cursor()

except:
    print ("Error connecting DB")


# ### Load User Data and Run Rec Model

# In[ ]:


data_df = pd.read_csv('/Users/Tirath/Downloads/zomato.csv', encoding='latin-1') 

data_df_select, city_list = Data_load_Preprocess(data_df)

user_email = sys.argv[1] 
cursor.execute("SELECT * FROM user where email = %s",(user_email))
conn.commit()

user_rec_list = []
user_data = cursor.fetchall()
user_data = np.array(user_data)
user_cuisines = user_data[0][5].split(',')
user_city = city_list.index(user_data[0][3]) 
user_HOD = int(user_data[0][9])
user_HTB = int(user_data[0][10])
user_avgCost = float(user_data[0][6])/1000
user_data_select = [user_city, user_HTB, user_HOD, user_avgCost]
user_ID = user_data[0][0]

cursor.execute("SELECT user_ID FROM user_rec where user_ID = %s",(str(user_ID)))
conn.commit()
user_rec_data = cursor.fetchall()
user_rec_data = np.array(user_rec_data)
user_rec_data = list(user_rec_data)

# rec_list_100 = Return_Top_100_Rec_List(data_df_select, user_data_select)

for index, row in data_df.iterrows():
    if user_city == row['City']:
        for user_cuisine in user_cuisines:
            if user_cuisine in row['Cuisines']:
                cuisine_sim = -list_sim(user_cuisines, row['Cuisines'].split(", "))
                avgCost_Diff = abs(row['Average Cost for two'] - user_avgCost)
                rec_list = [user_ID, row['Restaurant ID'], cuisine_sim, avgCost_Diff]
                user_rec_list.append(rec_list)

user_rec_list = remove_dupe(user_rec_list)

rec_count = len(user_rec_list)

if rec_count < 10:
    # print("Less recs triggered!")
    user_rec_list = []
    for index, row in data_df.iterrows():
        if user_city == row['City']:
            cuisine_sim = -list_sim(user_cuisines, row['Cuisines'].split(", "))
            avgCost_Diff = abs(row['Average Cost for two'] - user_avgCost)
            rec_list = [user_ID, row['Restaurant ID'], cuisine_sim, avgCost_Diff]
            user_rec_list.append(rec_list)
    user_rec_list = remove_dupe(user_rec_list)
    
user_rec_list = sorted(user_rec_list, key = itemgetter(2,3))[:15]
res_list = []
for val in user_rec_list:
    res_list.append(val[1])

city_data_df = data_df[data_df['City'] == user_city]

print(user_data_select)
if not user_rec_data:
    for res in res_list:
        for index, row in city_data_df.iterrows():
            if (row['Restaurant ID'] == res):
                cursor.execute("INSERT INTO user_rec(user_ID, restaurant_ID) VALUES(%s, %s)", (str(user_ID), str(row['Restaurant ID'])))  
conn.commit()


# ### Db Close 

# In[ ]:


cursor.close()
conn.close()

