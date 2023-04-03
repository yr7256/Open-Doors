from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
'''
Main category를 내가 걸러서 행렬계산하나? 이거 상의하자.

들어올 수 있는 예상 input
1-1. 유사도 구하는 기준 user의 가게별 평점 arr ( 1 x 총 가게 숫자  - sparse matrix ) 이거는 0 쳐내면 안되나?
user가 매긴 평점 matrix ( user No )
1-2. 다른 모든 유저들의 가게별 평점 matrix (이래서 별점이 0점이 없구나. 평가 안한거랑 최저점으로 평가한걸 Implicit하게 구분하려고.)

2-1. 기준 user의 따봉, 싫어요 먹인 arr (좋아요1, 싫어요-1, 평가안함 NaN이나 0)
2-2. 다른 모든 User들의 가게별 평점 matrix


고려할 점 
- 평점을 먹인거는 평가를 했다는거니까 이미 갔다는뜻임. (재추천이 안나오느게 맞음.)
- 좋아요/싫어요는 기존 추천에 대한 적합도를 바로 보기 위한 장치인거지 거기를 갔다는 뜻은 아님. 그래서 재추천이 나올 수 있음.

- 단순히 예상 적합도를 구해서 item을 봐주는거면.. 점수를 구하고나서, "기존평가" item들의 적합도점수를 0으로 만들고 정렬을 해서 10개정도 뽑아주면 되는거 아니야?
    이러면 겹칠 일 없다. 깔끔함.



완전 콜드스타트면 어떻게 하지?
'''

# rating 유사도 arr, like 유사도 arr 합해서 최종 유사도 구하기 (0-1 유사도만 나옴. 예상평점은 필요 없어서 일부러 안구했음.)
# 예외처리 시나리오 - 전체 유저의 숫자가 K명 미만, 평가한 항목이 K개 미만 (colab filtering 반영 안하는게 맞음.)
def colab_filtering(user_rating_arr, rating_matrix, user_like_arr, like_matrix, user_id_arr):
    '''
    pk를 명시하는 이유는 기준유저가 빠져있기 때문.
    [(유저간 유사도가 들어옴.) (userpk, 유사도), (userpk, 유사도)... ]
    '''
    # print('colab시작')
    # print(1)
    rating_sim_arr = rating_cos_sim(user_rating_arr, rating_matrix) # npArr
    # print(2999999999999999999999999)
    # print(user_like_arr)
    # print(like_matrix)
    like_sim_arr = like_cos_sim(user_like_arr, like_matrix) # npArr 이거 수정 필요.
    # print(399999999999999999999999999999)
    res_sim = rating_sim_arr + like_sim_arr
    res_sim /= 2
    # print(res_sim[0][0])
    # print('res_sim1')
    # print(res_sim)
    res_sim = res_sim.tolist()
    res_sim = [ item[0] for item in res_sim ]
    # print('res_sim2')
    # print(res_sim)
    # print(4)
    res_id_sim = list(zip(user_id_arr, res_sim))
    # print(5)
    # print(type(res_id_sim[0]))
    # print(type(res_id_sim[0][1]))
    # print(res_id_sim)
    return res_id_sim


# rating 기준으로 한 유사도 구하기 0-1
def rating_cos_sim(user_rating_arr, rating_matrix): # 둘중 하나가 0이면, 유사도 분모에 안들어감.
    # print('평점으로 유사도 시작!')
    user_rating_arr = np.array(user_rating_arr).reshape(1,-1)
    res = cosine_similarity(user_rating_arr, rating_matrix)
    res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
    # print('평점으로 유사도')
    # print(res)
    return res


# like/dislike 기준으로 한 유사도 구하기 0-1 # 가중치 좀 줄이는게 좋을거같음.
def like_cos_sim(user_like_arr, like_matrix):
    try:
        # print('좋아요/싫어요로 유사도 시작!')
        # print(9)
        # print('aaaaa')
        # print(len(user_like_arr))
        # print(user_like_arr)
        # print('bbbbb')
        user_like_arr = np.array(user_like_arr).reshape(1,-1)
        # print(99)
        # print(user_like_arr)
        # print(like_matrix)
        res = cosine_similarity(user_like_arr, like_matrix)
        # print(999)
        res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
        # print(9999)
        # print('좋아요,싫어요로 유사도')
        # print(res)

        return res
    except Exception as e:
        # print(user_like_arr)
        
        # print(like_matrix)

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
    print('시작! 예상평점 구하ㅣ!')
    
    # 행렬의 크기 계산
    num_users, num_spots = rating_matrix.shape
    # print('gffffffffffffffffffffffffffffff')
    # print(len(rating_matrix))
    # print('qhhhhhhhhhhhhhhhhhhhh')
    # print(num_users)
    # print(num_spots)
    # print(1)
    # 예상 평점을 저장할 배열 생성
    expected_ratings = np.zeros(num_spots)
    # print(2)
    # 기준 유저와 다른 유저들 간의 유사도를 이용하여 예상 평점 계산

    # rating_matrix.insert(key_user_id-1, np.zeros(num_spots))
    rating_matrix = np.insert(rating_matrix, key_user_id - 1, np.zeros(num_spots), axis=0)
    for user_pk, sim in user_sim_arr:
        # print(9)
        user_idx = user_pk - 1
        # print(99)
        # print(user_idx)
        # print(rating_matrix)
        ratings = rating_matrix[user_idx]
        # print(999)
        rated_spots = np.nonzero(ratings)[0]  # 평점을 매긴 시설의 인덱스들
        # print(9999)
        sim_matrix = np.ones(num_spots) * sim  # 유사도로 이루어진 행렬
        # print(99999)
        numerator = sim_matrix[rated_spots] @ ratings[rated_spots]  # 분자 계산
        print(999999)
        denominator = sim_matrix[rated_spots].sum()  # 분모 계산
        if denominator > 0:
            expected_ratings[rated_spots] += numerator / denominator
    # print(3)
    
    return expected_ratings.tolist()
    '''
    # 행렬의 크기 계산
    num_users, num_spots = rating_matrix.shape
    
    # 예상 평점을 저장할 배열 생성
    expected_ratings = np.zeros(num_spots)
    
    # 기준 유저와 다른 유저들 간의 유사도를 이용하여 예상 평점 계산
    for spot_idx in range(num_spots):
        numerator = 0
        denominator = 0
        for user_pk, sim in user_sim_arr:
            user_idx = user_pk - 1
            numerator += sim * rating_matrix[user_idx, spot_idx]
            denominator += sim
        expected_ratings[spot_idx] = numerator / denominator if denominator > 0 else 0
    
    return expected_ratings.tolist()
    '''


def filtering_by_cat_list(res_spots, cat_list):
    # 필터링 arr 이용해서 거르고 반환하는 로직
    # print('제발')
    # print(res_spots[:10])
    # print(cat_list)

    if not cat_list: # cat_list가 비어있을시 필터링을 안하고 그대로 반환
        return res_spots
    
    else:
        # print('시작입니다제발1')
        filtered_spots = []
        for spot in res_spots:
            if spot[2] in cat_list:
                filtered_spots.append(spot)
            else:
                pass
    # print('asd')
    return filtered_spots
'''
import numpy as np

# 유저별 평점 행렬
ratings = np.array([[0, 1, 5], [2, 2, 5], [0, 5, 2]])

# 유저간 유사도
similarity = np.array([0.998, 0.775, 0.6])

# 이미 평가한 아이템 제외하고 추천 아이템 추출
def recommend_items(user_id, ratings, similarity):
    # 해당 유저가 평가한 아이템 제외
    unrated_items = np.where(ratings[user_id] == 0)[0]
    # 다른 유저들의 해당 아이템 평점 가져오기
    item_ratings = ratings[:, unrated_items]
    # 다른 유저들의 해당 아이템에 대한 유사도 가져오기
    item_similarity = similarity[:, np.newaxis][:, unrated_items]
    # 예상 평점 계산
    pred_ratings = np.sum(item_ratings * item_similarity, axis=0) / np.sum(item_similarity, axis=0)
    # 예상 평점이 가장 높은 아이템 추천
    top_items = unrated_items[np.argsort(pred_ratings)[::-1]]
    return top_items

# 예시로 첫번째 유저가 어떤 아이템을 추천받아야 하는지 확인해보기
recommended_items = recommend_items(0, ratings, similarity)
print("Recommended items for user 0:", recommended_items)
'''