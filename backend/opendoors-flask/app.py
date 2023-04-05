'''
예상 추천 시나리오
1. 세부정보 눌러서 자동으로 나오는 item 기반 유사도 추천 (시설 정보는 근데.. 유저가 필요하다고 한거랑 유사도 맞춰주는게 맞지 않나? )
2. 카테고리를 눌러서 유저기반 추천을 받는 메인 추천기능
'''
from flask import Flask, request, redirect, jsonify, Blueprint, abort
import json
from haversine import haversine

import numpy as np
import pandas as pd


from content_filtering import content_based_recom
from colab_filtering import colab_filtering, calc_expected_rating, filtering_by_cat_list
from views_module import transform_dto_to_spot_arr, transform_dto_to_spot_matrix, transform_dto_to_ref_user_arrs, transform_dto_to_user_matrixes, verify_recom_reason, transform_dto_to_review_count_arr
from bus_info import reformat_arrival_data

app = Flask(__name__)
recom_bp = Blueprint('recom', __name__, url_prefix='/recom')
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def index():
    try:
        return 'test_hello?'

    except Exception as e1:
        print(e1)
        return e1



@recom_bp.route('/post_test', methods=['POST'])
def post_test():
    try:
        data = request.json
        print(request)
        print(data)
        return data
    except Exception as e2:
        print(e2)
        return e2


# 기준이 되는 장소의 pk
# 해당 장소와 같은 카테고리의 비슷한 장소 추천해주는 함수.
@recom_bp.route('/content_based', methods=['POST'])
def content_recom():
    try:
        data = request.json
        
        ref_spot_dict_str = data['userSpot']
        
        ref_spot_dict = json.loads(ref_spot_dict_str)
        
        cat_num = ref_spot_dict.get('category')
        
        spot_info_matrix_dto = data['spots']
        
        # print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        # print(f'ref_spot_dict_str: {ref_spot_dict_str}')
        # print(f'cat_num: {cat_num}')
        # print(f'spot_info_matrix_dto: {spot_info_matrix_dto[:20]}')
        
        
        ref_arr = transform_dto_to_spot_arr(ref_spot_dict)
        
        spot_info_matrix = transform_dto_to_spot_matrix(spot_info_matrix_dto)
        
        
        # 추천 메인로직 모듈화
        res_ordered_by_spotId, manhattan_distances, facility_scores = content_based_recom(ref_arr, spot_info_matrix, cat_num)
        
        # hybrid filtering 위해 필요없는 해당 로직에서는 필요없는 변수 생성.
        
        res_sorted_by_score = sorted(res_ordered_by_spotId, reverse=True)
        top10_res = res_sorted_by_score[:10]
        top10_res_formatted = [(item[1], round(item[2]*1000,-2)) for item in top10_res]
        return jsonify(top10_res_formatted)
    
    except ValueError as e:
        print('value error')
        print(e)
        abort(400, str(e))
    except KeyError as e:
        print('key error')
        print(e)
        abort(400, f'Missing key: {str(e)}')
    except Exception as e:
        print(e)
        abort(500, str(e))



# pk랑 매핑 필요.
@recom_bp.route('/hybrid', methods=['POST'])
def hybrid_recom():
    
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
        spot_info_matrix = transform_dto_to_spot_matrix(spot_dto_str) # json.loads가 필요?
        spot_len = len(spot_info_matrix)
        spot_review_count_arr = transform_dto_to_review_count_arr(spot_dto_str)


        spots_matrix = transform_dto_to_spot_matrix(spot_dto_str)
        
        spot_cat_arr = [spots_matrix[idx][-1] for idx in range(len(spot_info_matrix))] # 카테고리만 모아놓은 arr


        user_id, user_category_ids, user_facility_vector, user_coor, rating_vector, like_vector = transform_dto_to_ref_user_arrs(ref_user_dict, spot_len)
        # user_id - 기준유저id
        # category_ids -카테고리 id 들어있는 list 
        # user_facility_vector - 선호시설 vector [1, 0, 0, 0, 1, 1 ... ]
        # user_coor - [127.453, 36.9720]
        # rating_vector - [0,5,3,3,0,0,0,0,1 ...]      spot 개수만큼 들어옴.
        # like_vector - [1,1,1,1,-1,-1,-1,0,0,0,-1...] spot개수만큼 들어옴.
        
        
        user_id_arr, user_facility_matrix, rating_matrix, like_matrix = transform_dto_to_user_matrixes(users_dict, spot_len) # 완료.
        # user_id_arr - 전체 user아이디들의 arr(기준유저가 없는 idx)
        # user_facility_matrix -row가 user번호와 매칭. col이 시설정보 번호와 매칭
        # rating_matrix - row가 user번호와 매칭. col이 spot번호와 매칭
        # like_matrix - row가 user번호와 매칭. col이 spot번호와 매칭
    
        
        ref_facility_arr = [0] + user_facility_vector + user_coor + [0, 0] # 맨앞, 맨뒤 두개는 postional argument 위해 0으로 둠.
        # spotid, binvector-[0,0,0,0,0,0,0,0], user_coor, rating_score, rating_count 순서로 들어있음 ( idx형식 맞추기 위해서 빈값으로 0 둠.)
        

        # 계산부
        content_based_arr, manhattan_distances, facility_scores = content_based_recom(ref_facility_arr, spot_info_matrix, category=None) # [(score/30, spotId, manhattan_dist) ... id순서대로 반환]
        # [(0.2418561222123986, 1, 10.899476864300897), (0.2533676665221327, 2, 10.882014520230928), (변환 스코어0-1, pk, 맨하탄거리..) ... ] 다시 3 곱해야함.(비중줄이기위해 5만 곱했음.)
        # content_based_score_arr = [[item[0]*3, item[1]] for item in content_based_arr] # 모든 장소에 대해서 결과가 나온다.
        # [ (0-1에서 3를 곱한값, pk) ... ] 장소pk순서로 들어옴.
        

        user_sim_arr = colab_filtering(rating_vector, rating_matrix, like_vector, like_matrix, user_id_arr) # [(유저간 유사도가 들어옴.) (userpk, 유사도), (userpk, 유사도)... ]
        expected_rating_arr = calc_expected_rating(user_id, user_sim_arr, rating_matrix) # [(예상점수, pk), (예상점수, pk)...] user_sim_arr는 0.3정도로 반영된다.
        score_spotpk_category_arr = [[content_based_arr[idx][0]*3 + expected_rating_arr[idx], content_based_arr[idx][1], spot_cat_arr[idx]] for idx in range(len(content_based_arr))]
        filtered_spots = filtering_by_cat_list(score_spotpk_category_arr, user_category_ids)
        top10_spots = sorted(filtered_spots, reverse=True)[:topK] # pk-1이 index가 됨.
        res_with_recom_reason = verify_recom_reason(top10_spots, manhattan_distances, facility_scores, expected_rating_arr, spot_review_count_arr)
        
        return jsonify(res_with_recom_reason)

    except ValueError as e:
        print(e)
        abort(400, str(e))
    
    except KeyError as e:
        print(e)
        abort(400, f'Missing key: {str(e)}')
        
    except Exception as e:
        print(e)
        abort(500, str(e))



@recom_bp.route('/busInfo', methods=['POST'])
def fetch_bus_stop_info():
    '''
    json 형식 
    [
        {'stop_name': stop_name, 'dist': dist, 'arr_infos':[]},
        {'stop_name': stop_name, 'dist': dist, 'arr_infos':[]},
        {'stop_name': stop_name, 'dist': dist, 'arr_infos':[]},
        ...
    ]

    각 item안에 들어있는 arr_infos (도착정보 arrival infomations) 
    [
        {'route_no': route_no, 'expected_time_min':expected_time_min, 'bus_stop_position':bus_stop_position, 'destination':destination},
        {'route_no': route_no, 'expected_time_min':expected_time_min, 'bus_stop_position':bus_stop_position, 'destination':destination},
        {'route_no': route_no, 'expected_time_min':expected_time_min, 'bus_stop_position':bus_stop_position, 'destination':destination},
        ...
    ]
    '''
    data = request.json

    # print(data)
    
    buses = data.get('buses')
    busStations = data.get('busStations')
    spot_lat = data.get('lat') # 이름 보고 바꿔야함.
    spot_lng = data.get('lng') # 이름 보고 바꿔야함.

    bus_stop_datas = json.loads(busStations) # {'id': 5381, 'busId': 82190, 'busName': '군인아파트', 'busLat': 36.410587, 'busLng': 127.33727} busId가 정류장 이름.
    buses = json.loads(buses) # {'id': 2714, 'busNumPad': '충북70자7013'}
    spot_lat = json.loads(spot_lat) # 36.314535529385
    spot_lng = json.loads(spot_lng) # 127.38279265779

    bus_data_set = { item.get('busNumPad') for item in buses}
    arr_datas = []
    
    bus_stop_within_500m = []
    for bus_stop in bus_stop_datas:
        bus_stop_coor = (bus_stop['busLat'], bus_stop['busLng']) # 바뀔 수 있음.
        spot_coor = (spot_lat, spot_lng)
        
        haversine_dist = haversine(bus_stop_coor, spot_coor, unit='m')
        if haversine_dist <= 500: # 500m이내라면?
            bus_stop_within_500m_data = {'bus_stop_data' : bus_stop, 'distance' : haversine_dist}
            bus_stop_within_500m.append(bus_stop_within_500m_data)

    # bus_stop_within_500m 안쪽의 정류소 정보만 나옴.
    for bus_stop_data in bus_stop_within_500m:
        arrival_data = reformat_arrival_data(bus_stop_data, bus_data_set)
        arr_datas.append(arrival_data)
    
    # print(arr_datas)
    # result = json.dumps(arr_datas, ensure_ascii=False)

    return jsonify(arr_datas)

app.register_blueprint(recom_bp)


# 모든 host로부터의 요청 허용. 시스템 허용 옵션도 받는다.
# terminal에서 export FLASK_RUN_HOST=0.0.0.0 으로 해야 설정이 먹는거 수정해야함.
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


