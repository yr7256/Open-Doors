import requests
import pandas as pd
import json  # 추가

excel_file = 'low_floor_bus_dup_removed.xlsx'
df = pd.read_excel(excel_file)

# url = 'http://192.168.31.134:8080/api/spot/save'
# url = 'http://j8b205.p.ssafy.io:8080/api/spot/save'
# url = 'http://192.168.31.134:8080/api/bus/info/save'


# url = 'http://192.168.31.134:8080/api/bus/info/save'

def handleSubmit():

    for i, row in df.iterrows():
        # if i > 10:
            # break
        # url = 'http://j8b205.p.ssafy.io:8080/api/spot/save'
        
        CAR_REG_NO = row['CAR_REG_NO']

        # 'CAR_REG_NO' 키에 값을 추가한 딕셔너리 생성
        body_dict = {'busNumPad': CAR_REG_NO}
        json_data = json.dumps(body_dict, ensure_ascii=False)
        # .encode('utf-8')
        print(json_data)
        # print(type(body_dict))
        # print(type(json_data))
        # print(json_data)
        url = 'http://j8b205.p.ssafy.io:8080/api/bus/info/save'
        # url = 'http://192.168.31.27:8080/api/bus/info/save' # 진섭

        headers = {'Content-type': 'application/json',
                #    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeSIsImlhdCI6MTY4MDYyMjA4MCwiZXhwIjoxNjgwNjI1NjgwfQ.IqOY2yNyTtWRnYL0vZNHB9ARnCAVhOnSmtV-hLp-uAw'
                   }
        
        # res = requests.post(url, data=json_data, headers=headers)
        # res = requests.post(url, data=body_dict, headers=headers)
        res = requests.post(url, json=body_dict, headers=headers)
        print(res)





handleSubmit()
