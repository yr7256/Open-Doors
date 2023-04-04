from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# rating 유사도 arr, like 유사도 arr 합해서 최종 유사도 구하기 (0-1 유사도만 나옴. 예상평점은 필요 없어서 일부러 안구했음.)
# 예외처리 시나리오 - 전체 유저의 숫자가 K명 미만, 평가한 항목이 K개 미만 (colab filtering 반영 안하는게 맞음.)
def colab_filtering(user_rating_arr, rating_matrix, user_like_arr, like_matrix, user_id_arr):
    '''
    pk를 명시하는 이유는 기준유저가 빠져있기 때문.
    [(유저간 유사도가 들어옴.) (userpk, 유사도), (userpk, 유사도)... ]
    '''
    
    rating_sim_arr = rating_cos_sim(user_rating_arr, rating_matrix) # npArr
    
    like_sim_arr = like_cos_sim(user_like_arr, like_matrix) # npArr 이거 수정 필요.
    
    res_sim = rating_sim_arr + like_sim_arr
    res_sim /= 2
    
    res_sim = res_sim.tolist()
    res_sim = [ item[0] for item in res_sim ]
    res_id_sim = list(zip(user_id_arr, res_sim))
    
    return res_id_sim


# rating 기준으로 한 유사도 구하기 0-1
def rating_cos_sim(user_rating_arr, rating_matrix): # 둘중 하나가 0이면, 유사도 분모에 안들어감.
    
    user_rating_arr = np.array(user_rating_arr).reshape(1,-1)
    res = cosine_similarity(user_rating_arr, rating_matrix)
    res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
    return res


# like/dislike 기준으로 한 유사도 구하기 0-1 # 가중치 좀 줄이는게 좋을거같음.
def like_cos_sim(user_like_arr, like_matrix):
    try:
        user_like_arr = np.array(user_like_arr).reshape(1,-1)
        res = cosine_similarity(user_like_arr, like_matrix)        
        res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
        return res
    except Exception as e:
        print(e)



def calc_expected_rating(key_user_id, user_sim_arr, rating_matrix):
    '''
    matrix에 기준 유저의 것은 없네?

    user_sim_arr ->  [(userpk, 기준유저에 대한 pk번 user의 유사도), (userpk, 기준유저에 대한 pk번 user의 유사도), (userpk, 기준유저에 대한 pk번 user의 유사도)... ]
    rating_matrix -> rating_matrix - row가 user번호와 매칭. col이 spot번호와 매칭. cell의 값은 rating점수 - 기준user의 pk는 빠져있음.

    ###필요로직. 
    return 예상값 -> list를 반환. spot번호가 index가 되고, 값은 spot번호에 대한 예상 rating
     
    [(예상점수, pk), (예상점수, pk)...] user_sim_arr는 0.3정도로 반영된다.
    '''
    
    # 행렬의 크기 계산
    num_users, num_spots = rating_matrix.shape
    
    # 예상 평점을 저장할 배열 생성
    expected_ratings = np.zeros(num_spots)
    
    # 기준 유저와 다른 유저들 간의 유사도를 이용하여 예상 평점 계산
    # rating_matrix.insert(key_user_id-1, np.zeros(num_spots))
    rating_matrix = np.insert(rating_matrix, key_user_id - 1, np.zeros(num_spots), axis=0)
    for user_pk, sim in user_sim_arr:
        
        user_idx = user_pk - 1
        
        ratings = rating_matrix[user_idx]
        
        rated_spots = np.nonzero(ratings)[0]  # 평점을 매긴 시설의 인덱스들
        
        sim_matrix = np.ones(num_spots) * sim  # 유사도로 이루어진 행렬
        
        numerator = sim_matrix[rated_spots] @ ratings[rated_spots]  # 분자 계산
        
        denominator = sim_matrix[rated_spots].sum()  # 분모 계산
        if denominator > 0:
            expected_ratings[rated_spots] += numerator / denominator
    
    
    return expected_ratings.tolist()
    


def filtering_by_cat_list(res_spots, cat_list):
    # 필터링 arr 이용해서 거르고 반환하는 로직
    if not cat_list: # cat_list가 비어있을시 필터링을 안하고 그대로 반환
        return res_spots
    
    else:
        filtered_spots = []
        for spot in res_spots:
            if spot[2] in cat_list:
                filtered_spots.append(spot)
            else:
                pass
    return filtered_spots
