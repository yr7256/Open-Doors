'''
작성 목록
1. 거리계산 맨하탄거리. 하버사인거리는 라이브러리로 대체 (km로 나옴)

2. 시설 코사인 유사도 (0-1 사이 유사도로 나옴)
2-1. 시설 코사인 유사도 계산 최적화 위한 유저정보배열 0값 제거 로직

3. 
'''

from sklearn.metrics.pairwise import cosine_similarity
from haversine import haversine
from math import radians, log10

import numpy as np
import pandas as pd


# 통합된 matrix가 들어오니까 쪼개고, 분류해서 기능제공. 😀 pk매핑 유지 해야됨.
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
    

    # 기준 좌표정보로부터 각 시설의 맨하탄거리를 구한 list
    manhattan_distances = [manhattan_distance(ref_coor, coor_item) for coor_item in coor_df.itertuples(index=False)]
    manhattan_scores = convert_manhattan_distances(manhattan_distances) # 0-10의 스코어가 나온다.
    
    # rating_scores = [rating_score(rating_df[idx][0], rating[idx][1]) for idx in range(matrix_size)]
    rating_scores = [rating_score(*rating) for rating in rating_df.itertuples(index=False)] # 0-10의 스코어가 나온다.
    
    # 위의 시설유사도, 맨하탄거리, rating_score 반영된걸 취합 후, 상위 10개 반환.
    scores_sum = sum_scores(facility_scores, manhattan_scores, rating_scores) # 0-30의 스코어가 나온다.

    score_id_mapped_list = [(score/30, spotId, manhattan_dist) for score, spotId, manhattan_dist in zip(scores_sum, facility_spotIds, manhattan_distances)] # 
    # print('최종변환리스트')
    
    # res = sorted(score_id_mapped_list, reverse=True)
    # [(환산합산점수0-1, pk, 맨하탄거리)...] 로 되어있는 모든 장소의의 배열이 나옴. top10개로 추리는 과정 필요.
    return score_id_mapped_list, manhattan_distances, facility_scores
    



def binary_vectorize(arr):
    # 8개짜리 vector 배열만듬
    bin_vector = np.zeros(8)
    bin_vector[np.array(arr)-1] = 1
    return bin_vector


# 거리계산 1 - 맨하탄거리
def manhattan_distance(coor_A, coor_B):
    """
    두 지점의 위도와 경도를 입력받아 맨하탄 거리를 계산하여 반환합니다.
    기본 단위는 km인데 추후 scale 조절.
    """
    a_lng, a_lat = coor_A
    b_lng, b_lat = coor_B
    coor_midpoint = [b_lng, a_lat]

    lng_dist = haversine(coor_A, coor_midpoint)
    lat_dist = haversine(coor_B, coor_midpoint)
    
    # 맨하탄 거리를 계산합니다.
    sum_distance = lng_dist + lat_dist
    return sum_distance


# 맨하탄거리 스코어로 변환. 500m미만 만점. 10km초과 0점. 사이는 거리에 반비례
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
    return res[0]


# 가중치 조절 추후에 진행
def rating_score(avg_score, count):
    score_weight = 1
    count_weight = 1

    return (avg_score*score_weight + log10(count)*count_weight)


def sum_scores(facility_scores, manhattan_scores, rating_scores):
    return [sum(score_tuple) for score_tuple in zip(facility_scores, manhattan_scores, rating_scores)]


# 시설유사도 - 속도개선1 (field 축소)
def valid_field(ref_facility_arr):
    '''
    user_pref_arr에서 0인 idx를 싹 날려버림.
    유효한 field idx만 묶어서 반환
    '''
    pass

# 시설유사도 - 속도개선1 (축소된 field 반영)
def apply_valid_field(facility_matrix):
    '''
    valid_field에서 0으로 날아간 idx를 제거한 matrix 반환
    '''
    pass


# weighted_score