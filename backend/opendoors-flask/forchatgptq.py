@recom_bp.route('/hybrid', methods=['POST'])
def hybrid_filtering():
    try:
        topK = 10
        data = request.json # json 객체를 일단 통째로 가져옴.

        # 😀여기서부터 아래로 다시 파싱하는 로직.
        ref_user_str = data['user']
        user_dto_str = data['users']
        spot_dto_str = data['spots']

        ref_user_dict = json.loads(ref_user_str)
        users_dict = json.loads(user_dto_str)
        spots_dict = json.loads(spot_dto_str)
        spot_info_matrix = transform_dto_to_spot_matrix(user_dto_str) # json.loads가 필요?
        spot_review_count_arr = transform_dto_to_review_count_arr(user_dto_str)
        

        spot_len = len(spots_matrix)


        spots_matrix = transform_dto_to_spot_matrix(spots_dict)
        spot_cat_arr = [spots_matrix[idx][-1] for idx in range(len(spot_info_matrix))] # 카테고리만 모아놓은 arr
        
        user_id, user_category_ids, user_facility_vector, user_coor, rating_vector, like_vector = transform_dto_to_ref_user_arrs(ref_user_dict, spot_len)
        
        
        user_id_arr, user_facility_matrix, rating_matrix, like_matrix = transform_dto_to_user_matrixes(users_dict, spot_len) # 완료.
        
        
        ref_facility_arr = [0] + user_facility_vector + user_coor + [0, 0] # 맨앞, 맨뒤 두개는 postional argument 위해 0으로 둠.
        

        # 계산부
        content_based_arr, manhattan_distances, facility_scores = content_based_recom(ref_facility_arr, spot_info_matrix, category=None) # [(score/30, spotId, manhattan_dist) ... id순서대로 반환]
        user_sim_arr = colab_filtering(rating_vector, rating_matrix, like_vector, like_matrix, user_id_arr) # [(유저간 유사도가 들어옴.) (userpk, 유사도), (userpk, 유사도)... ]
        expected_rating_arr = calc_expected_rating(user_sim_arr, rating_matrix) # [(예상점수, pk), (예상점수, pk)...] user_sim_arr는 0.3정도로 반영된다.
        score_spotpk_category_arr = [[content_based_arr[idx][0]*3 + expected_rating_arr[idx][0], expected_rating_arr[idx][1], spot_cat_arr[idx]] for idx in range(len(expected_rating_arr))]
        filtered_spots = filtering_by_cat_list(score_spotpk_category_arr, user_category_ids)
        top10_spots = sorted(filtered_spots, reverse=True)[:topK] # pk-1이 index가 됨.
        res_with_recom_reason = verify_recom_reason(top10_spots, manhattan_distances, facility_scores, expected_rating_arr, spot_review_count_arr)

        return jsonify(res_with_recom_reason)

    except ValueError as e:
        abort(400, str(e))
    except KeyError as e:
        abort(400, f'Missing key: {str(e)}')
    except Exception as e:
        abort(500, str(e))


def transform_dto_to_spot_arr(spot_dict):
    spotSfInfos = spot_dict['sfInfoIds']   # ->[1]
    spotId = spot_dict['spotId'] #-> 1
    spotLat = spot_dict['spotLat'] #-> 36.39665
    spotLng = spot_dict['spotLng'] #-> 127.4027
    reviewRating = spot_dict['reviewScore'] #-> 4.49
    reviewCount = spot_dict['reviewCount'] #-> 244
    category = spot_dict['spotCategory'] # 식당 1, 도서관 31, 32 ... 😀
    

    sfvector = binary_vectorize(spotSfInfos)
    
    return [spotId] + sfvector + [spotLat, spotLng, reviewRating, reviewCount, category]

    
    

def transform_dto_to_spot_matrix(dto_matrix):
    dto_matrix = json.loads(dto_matrix)
    return [transform_dto_to_spot_arr(spot_dict) for spot_dict in dto_matrix]




def transform_dto_to_ref_user_arrs(dto_dict, spot_matrix_length):
    user_id = dto_dict['userId']
    spotSfInfos = dto_dict['sfInfoIds']
    
    spotLat = dto_dict['userLat']
    spotLng = dto_dict['userLng']
    user_coor = [spotLat, spotLng]

    reviews_arr = dto_dict['reviews']
    like_arr = dto_dict['likeList']
    dislike_arr = dto_dict['disLikeList']
    
    category_ids = dto_dict.get('categoryIds') # 선택한 카테고리들. 마지막에 걸러줘야함. (다른 모든 유저들의 정보들은 null 들어옴.)
    

    rating_vector = create_rating_vector(reviews_arr, spot_matrix_length) # [] idx No는 pk를 의미. value는 평점을 의미. 0은 미평가.
    like_vector = create_like_vector(like_arr, dislike_arr, spot_matrix_length) # [] idx No는 pk를 의미. value는 1/-1 좋아요 싫어요를 의미. 0은 미평가.

    user_facility_vector = binary_vectorize(spotSfInfos)

    
    return user_id, category_ids, user_facility_vector, user_coor, rating_vector, like_vector
        

def transform_dto_to_review_count_arr(dto_matrix):
    dto_matrix = json.loads(dto_matrix)
    return [spot_dict['reviewCount'] for spot_dict in dto_matrix]



def create_rating_vector(arr, spot_matrix_length):
    rating_dict = dict()
    rating_vector = np.zeros(spot_matrix_length)

    for review_item in arr:
        spotId = review_item.get('spotId')
        review_score = review_item.get('reviewScore')
        rating_dict[spotId] = review_score

    for k,v in rating_dict:
        rating_vector[k-1] = v

    return rating_vector.tolist()


def create_like_vector(like_arr, dislike_arr, spot_matrix_length):
    like_vector = np.zeros(spot_matrix_length)
    like_vector[np.array(like_arr)-1] = 1
    like_vector[np.array(dislike_arr)-1] = -1
        
    return like_vector.tolist()



def transform_dto_to_user_matrixes(user_dict_list, spot_matrix_length):
    # 
    user_facility_matrix = []
    rating_matrix = []
    like_matrix = []
    user_id_arr= []

    for idx, spot_dict in enumerate(user_dict_list):
        user_id, category_ids, user_facility_vector, user_coor, rating_vector, like_vector = transform_dto_to_ref_user_arrs(spot_dict, spot_matrix_length)
        # category_ids, user_coor은 null, (0.0, 0.0)
        user_facility_matrix.append(user_facility_vector)
        rating_matrix.append(rating_vector)
        like_matrix.append(like_vector)
        user_id_arr.append(user_id)
    
    return user_id_arr, np.array(user_facility_matrix), np.array(rating_matrix), np.array(like_matrix)


def verify_recom_reason(recom_arr, manhattan_distances, facility_scores, expected_rating_arr, spot_review_count_arr):
    '''
    top10_spots/recom_arr -> [[최종점수, pk, 카테고리], [최종점수, pk, 카테고리], [최종점수, pk, 카테고리] ... ] 1부터 시작
    
    manhattan_distances, facility_scores, expected_rating_arr, spot_review_count_arr  idx가 pk를 대체. 0부터 시작.
    '''
    result = []

    for recom_item in recom_arr:
        pk = recom_item[1]
        idx = pk - 1
        
        if facility_scores[idx] > 0.7:
            result.append([recom_item, round(manhattan_distances[idx]*1000,-2), '배려시설유사도가 높아요!'])
        elif manhattan_distances[idx] < 0.5:
            result.append([recom_item, round(manhattan_distances[idx]*1000,-2), '방문하기 좋은 위치에 있어요!'])
        elif expected_rating_arr[idx] > 3.5:
            result.append([recom_item, round(manhattan_distances[idx]*1000,-2), '비슷한 취향의 사용자들이 추천한 장소에요!'])
        elif spot_review_count_arr[idx] > 500:
            result.append([recom_item, round(manhattan_distances[idx]*1000,-2), '우리동네 핫 플레이스!'])
        else:
            result.append([recom_item, round(manhattan_distances[idx]*1000,-2), '주변 사용자들의 평가가 좋은 장소에요!'])

    return result


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



def colab_filtering(user_rating_arr, rating_matrix, user_like_arr, like_matrix, user_id_arr):
    rating_sim_arr = rating_cos_sim(user_rating_arr, rating_matrix) # npArr
    like_sim_arr = like_cos_sim(user_like_arr, like_matrix) # npArr 이거 수정 필요.

    res_sim = rating_sim_arr + like_sim_arr
    res_sim /= 2
    res_sim = res_sim.tolist()
    
    res_id_sim = list(zip(user_id_arr, res_sim))

    return res_id_sim


# rating 기준으로 한 유사도 구하기 0-1
def rating_cos_sim(user_rating_arr, rating_matrix): # 둘중 하나가 0이면, 유사도 분모에 안들어감.
    print('평점으로 유사도 시작!')
    user_rating_arr = np.array(user_rating_arr).reshape(1,-1)
    res = cosine_similarity(user_rating_arr, rating_matrix)
    res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
    print('평점으로 유사도')
    print(res)
    return res


# like/dislike 기준으로 한 유사도 구하기 0-1 # 가중치 좀 줄이는게 좋을거같음.
def like_cos_sim(user_like_arr, like_matrix):
    print('좋아요/싫어요로 유사도 시작!')
    user_like_arr = np.array(user_like_arr).reshape(1,-1)
    res = cosine_similarity(user_like_arr, like_matrix)
    res[np.isnan(res)] = 0  # 분모가 0인 경우 유사도를 0으로 설정 # 옵션입니다.
    print('좋아요,싫어요로 유사도')
    print(res)

    return res


def calc_expected_rating(user_sim_arr, rating_matrix):
    # 행렬의 크기 계산
    num_users, num_spots = rating_matrix.shape
    
    # 예상 평점을 저장할 배열 생성
    expected_ratings = np.zeros(num_spots)
    
    # 기준 유저와 다른 유저들 간의 유사도를 이용하여 예상 평점 계산
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


def content_based_recom(ref_arr, spot_matrix, category=None):
    # ref_arr = [1, 1,0,0,0,0,0,0,0, 36.3965, 127.4027, 4.49, 244]

    cat_col_num = 13 # 맨 마지막에 끼워넣을것임.
    # spot_matrix의 cat이 1(카페)인 곳들만 선택
    spot_df = pd.DataFrame(spot_matrix)

    ref_spotId = ref_arr[0]
    ref_facility_arr = ref_arr[1:9]
    ref_coor = ref_arr[9:11]
    ref_rating = ref_arr[11:13]

    # 카테고리의 정보가 일치하는 row만 살린 df
    if category != None: # 카테고리에 0도 있음.
        cat_filtered_df = spot_df.loc[spot_df.iloc[:, cat_col_num] == category, :]
    else:
        cat_filtered_df = spot_df

    facility_spotIds = cat_filtered_df.iloc[:, :1]
    facility_spotIds = [item[0] for item in facility_spotIds.values.tolist()] # nested list로 받아온걸 arr로 변환
    
    facility_df = cat_filtered_df.iloc[:, 1:9]
    coor_df = cat_filtered_df.iloc[:, 9:11]
    rating_df = cat_filtered_df.iloc[:, 11:13]
    matrix_size = len(facility_spotIds)
    
    # 1차 - 시설 유사도정보 구함. ndArr.
    facility_scores = facility_cos_sim(ref_facility_arr, facility_df) # 0-10의 스코어가 나온다.
    manhattan_distances = [manhattan_distance(ref_coor, coor_item) for coor_item in coor_df.itertuples(index=False)]
    manhattan_scores = convert_manhattan_distances(manhattan_distances) # 0-10의 스코어가 나온다.
    rating_scores = [rating_score(*rating) for rating in rating_df.itertuples(index=False)] # 0-10의 스코어가 나온다.
    scores_sum = sum_scores(facility_scores, manhattan_scores, rating_scores) # 0-30의 스코어가 나온다.
    score_id_mapped_list = [(score/30, spotId, manhattan_dist) for score, spotId, manhattan_dist in zip(scores_sum, facility_spotIds, manhattan_distances)] # 
    return score_id_mapped_list, manhattan_distances, facility_scores
    



def binary_vectorize(arr):
    # 8개짜리 vector 배열만듬
    bin_vector = np.zeros(8)
    bin_vector[np.array(arr)-1] = 1
    return bin_vector


# 거리계산 1 - 맨하탄거리
def manhattan_distance(coor_A, coor_B):
    a_lng, a_lat = coor_A
    b_lng, b_lat = coor_B
    coor_midpoint = [b_lng, a_lat]

    lng_dist = haversine(coor_A, coor_midpoint)
    lat_dist = haversine(coor_B, coor_midpoint)
    
    # 맨하탄 거리를 계산합니다.
    sum_distance = lng_dist + lat_dist
    return sum_distance



def convert_manhattan_distances(manhattan_distances):
    result = []

    for distance in manhattan_distances:
        if distance < 0.5:  # 0.5 km 미만인 경우
            single_score = 10
        elif distance > 10:  # 10 km 초과인 경우
            single_score = 0
        else:  # 0.5 km 이상 10 km 이하인 경우
            single_score = ((1 - (distance - 0.5) / 9.5)*10)
        
        result.append(single_score)
    return result


# 시설 유사도 arr로 반환, idx 유지
def facility_cos_sim(ref_facility_arr, facility_matrix):
    ref_facility_arr = np.array(ref_facility_arr).reshape(1,-1)
    res = cosine_similarity(ref_facility_arr, facility_matrix)
    # print(type(res))
    # print(res)
    return res[0]


# 가중치 조절 추후에 진행
def rating_score(avg_score, count):
    score_weight = 1
    count_weight = 1

    return (avg_score*score_weight + log10(count)*count_weight)


def sum_scores(facility_scores, manhattan_scores, rating_scores):
    return [sum(score_tuple) for score_tuple in zip(facility_scores, manhattan_scores, rating_scores)]
