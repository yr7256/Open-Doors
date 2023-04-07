import requests
import json
import os
import pandas as pd
import ast

excel_file = 'pre_processing_complete_data.xlsx'
df = pd.read_excel(excel_file)

def get_image_files(row):
    related_pk = eval(row['related_pk'])
    img_files = []
    img_folder_path = './imgs/'

    if related_pk == []:
        pk = row['pk']
        index = 0
        while True:
            file_name = f'img_spotSeq_{pk}_{index}.jpg'
            file_path = os.path.join(img_folder_path, file_name)
            if os.path.exists(file_path):
                with open(file_path, 'rb') as img_file:
                    # img_files.append(('spotImages', img_file.read(), file_name))
                    img_files.append(('spotImages', (file_name, img_file.read(), 'image/jpeg')))

                index += 1
            else:
                break
    else:
        for pk in related_pk:
            index = 0
            while True:
                file_name = f'img_spotSeq_{pk}_{index}.jpg'
                file_path = os.path.join(img_folder_path, file_name)
                if os.path.exists(file_path):
                    with open(file_path, 'rb') as img_file:
                        # img_files.append(('spotImages', img_file.read(), file_name))
                        img_files.append(('spotImages', (file_name, img_file.read(), 'image/jpeg')))

                    index += 1
                else:
                    break
    return img_files

def handleSubmit():
    # try:
        for i, row in df.iterrows():
            # if i > 10:
                # break

            sfInfos = eval(row['sfiInfo'])


            menu = row['menu']
            if pd.isna(menu) or menu == "":
                menu = []
            else:
                menu = ast.literal_eval(menu)
                menu = [{"title": k, "price": v} for k, v in menu.items()]

            body_dict = {
                'spot': {
                    'spotName': row['spotName'] if not pd.isna(row['spotName']) else "",
                    'spotRate': 'bf' if row['spotRate'] == 'bf' else 'pf',
                    'spotAddress': row['spotAddress'] if not pd.isna(row['spotAddress']) else "",
                    'spotBuildingName': row['spotBuildingName'] if not pd.isna(row['spotBuildingName']) else "",
                    'spotCategory': row['New_cat'] if not pd.isna(row['New_cat']) else 9,
                    'spotTelNumber': row['spotTel'] if not pd.isna(row['spotTel']) else "",
                    'spotLat': row['spotLat'] if not pd.isna(row['spotLat']) else 0.0,
                    'spotLng': row['spotLng'] if not pd.isna(row['spotLng']) else 0.0,
                    'reviewScore': row['naver_rating_score'] if not pd.isna(row['naver_rating_score']) else 0,
                    'reviewCount': row['naver_rating_count'] if not pd.isna(row['naver_rating_count']) else 0,
                    'menus': menu,
                    'zipcode': row['zipcode'] if not pd.isna(row['zipcode']) else 0,
                    # zipcode 추가
                    'spotrate': row['spotRate'] if not pd.isna(row['spotRate']) else "",
                    # ready정보 추가
                    'state': 'access'
                },
                'sfInfos': sfInfos
            }

            

            img_files = get_image_files(row)

            form_data = [
                ("spotDto", (None, json.dumps(body_dict, ensure_ascii=False), "application/json")),
                *img_files
                # img_files[0],
                # ("spotImages", (img_files[0][0], img_files[0][1], "image/jpeg"))
            ]
            # form_data = [
            #     ("spotDto", (None, json.dumps(body_dict, ensure_ascii=False), "application/json")),
            #     ("spotImages", (None, *img_files, "image/jpeg"))
            # ]
            
            # url = 'http://172.20.10.2:8080/api/spot/save'
            # url = 'http://192.168.31.134:8080/api/spot/save'
            url = 'http://j8b205.p.ssafy.io:8080/api/spot/save' # 배포
            # url = 'http://192.168.31.27:8080/api/spot/save' #진섭이

            print(form_data[0])

            res2 = requests.post(url, files=form_data)

        print(res2)

    # except Exception as e:
    #     print(e)

handleSubmit()
