import requests
import pandas as pd
import json  # 추가


excel_file = 'bus_stop.xlsx'
df = pd.read_excel(excel_file)

# url = 'http://192.168.31.134:8080/api/bus/stationInfo/save'
url = 'http://j8b205.p.ssafy.io:8080/api/bus/stationInfo/save'


def handleSubmit():
    for i, row in df.iterrows():
        # CAR_REG_NO = row['CAR_REG_NO']
        ARO_BUSSTOP_ID = row['ARO_BUSSTOP_ID']
        BUSSTOP_NM = row['BUSSTOP_NM']
        GPS_LATI = row['GPS_LATI']
        GPS_LONG = row['GPS_LONG']

        # 딕셔너리에 필드 추가
        body_dict = {
            'busId': ARO_BUSSTOP_ID,
            'busName': BUSSTOP_NM,
            'busLat': GPS_LATI,
            'busLng': GPS_LONG
        }

        # print(body_dict)
        # json_data = json.dumps(body_dict, ensure_ascii=False)

        headers = {'Content-type': 'application/json',
                #    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeSIsImlhdCI6MTY4MDYyMjA4MCwiZXhwIjoxNjgwNjI1NjgwfQ.IqOY2yNyTtWRnYL0vZNHB9ARnCAVhOnSmtV-hLp-uAw'
                   }
        
        # res = requests.post(url, data=json_data, headers=headers)
        # res = requests.post(url, data=body_dict, headers=headers)
        res = requests.post(url, json=body_dict, headers=headers) # 이게 마지막.
        print(res)


handleSubmit()