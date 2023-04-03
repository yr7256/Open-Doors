import json
from content_filtering import *
from views_module import *


data_arr_json = json.dumps({'spot': '[SpotForDjangoDto(spotSfInfos=[1], spotId=1, spotLat=36.396659269055, spotLng=127.40273836514, reviewRating=4.49, reviewCount=244)]'})
data_matrix_json = json.dumps({'spot': '[SpotForDjangoDto(spotSfInfos=[1], spotId=1, spotLat=36.396659269055, spotLng=127.40273836514, reviewRating=4.49, reviewCount=244), SpotForDjangoDto(spotSfInfos=[2, 3, 4], spotId=2, spotLat=3.3, spotLng=3.3, reviewRating=0.0, reviewCount=0), SpotForDjangoDto(spotSfInfos=[5, 6, 7], spotId=3, spotLat=3.3, spotLng=3.3, reviewRating=0.0, reviewCount=0), SpotForDjangoDto(spotSfInfos=[8, 9, 10], spotId=4, spotLat=3.3, spotLng=3.3, reviewRating=0.0, reviewCount=0), SpotForDjangoDto(spotSfInfos=[11, 12, 13], spotId=5, spotLat=3.3, spotLng=3.3, reviewRating=0.0, reviewCount=0), SpotForDjangoDto(spotSfInfos=[14, 15, 16], spotId=6, spotLat=3.3, spotLng=3.3, reviewRating=0.0, reviewCount=0)]'})

data_arr = json.loads(data_arr_json)['spot'][0]
print(data_arr)
data_matrix = json.loads(data_matrix_json)['spot']
print(data_matrix)

data_arr_json = data_arr['spot'][0]
data_matrix_json = data_matrix['spot']

ref_arr = transform_dto_to_spot_arr(data_arr_json)
spot_matrix = transform_dto_to_spot_matrix(data_matrix_json)

# def content_based_recom(ref_arr, spot_matrix, category=None):

print(content_based_recom(ref_arr, spot_matrix, category=None))

