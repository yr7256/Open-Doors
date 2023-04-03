# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np

# arr1 = np.array([0,0,0,0,0,0,0,0,0]).reshape(1,-1)
# arr2 = np.array([1,1,1,1,1,1,1,1,1]).reshape(-1,1)
# print(arr1)
# print(arr2)
# print(cosine_similarity(arr1, arr2))



from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import time

arr1 = [0,0,0,0,1,1,1,1,1]
arr2 = [1,1,1,1,1,1,1,1,1]

arr3 = [1,0,0,0,0,0,0,1]
arr4 = [1,1,1,1,1,1,1,1]

def cos_sim_by_arr(arr1, arr2):
    np_arr1 = np.array(arr1)
    np_arr2 = np.array(arr2)
    cos_sim = np.dot(np_arr1, np_arr2)/(np.linalg.norm(np_arr1)*np.linalg.norm(np_arr2))

    return(cos_sim)

cos_sim_by_arr(arr1, arr2)


print(time.time())
for _ in range(10000):
    cos_sim_by_arr(arr3, arr4)

print(time.time())




user_rating_arr = 


# rating 기준으로 한 유사도 구하기 0-1
def rating_cos_sim(user_rating_arr, rating_matrix): # 둘중 하나가 0이면, 유사도 분모에 안들어감.
    user_rating_arr = np.array(user_rating_arr).reshape(1,-1)
    res = cosine_similarity(user_rating_arr, rating_matrix)
    return res


