import requests
import xmltodict

def reformat_arrival_data(item, bus_number_plates):
    bus_stop_data = item.get('bus_stop_data')
    # print(item)
    
    bus_stop_id = bus_stop_data.get('busId')
    service_key = 'C9z58j3DHtsZw5I9cnrhloQo11QBrDQ05LYrSPVUc12zxYjlWK6jr6ALUqoNbQwMEyb3CToq5tMgaaa4rqlFcg%3D%3D'
    url = f'http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByUid?serviceKey={service_key}&arsId={bus_stop_id}'
    
    # print(url)
    res = requests.get(url)
    # print(res)
    bus_stop_arr_info = xmltodict.parse(res.content).get('ServiceResult').get('msgBody').get('itemList')

    # 정류장 기본정보로 묶여야할 item
    dist = item.get('distance')
    stop_name = bus_stop_arr_info[0].get('STOP_NAME')

    res_dict = {'stop_name': stop_name, 'dist': dist, 'arr_infos':[]} # 최종구조.

    # 해당 정류장에 도착하는 버스별로 각각 가지는 정보들
    for arr_item in bus_stop_arr_info:
        bus_number_plate = arr_item.get('CAR_REG_NO')
        route_no = arr_item.get('ROUTE_NO') # 노선 번호
        expected_time_min = arr_item.get('EXTIME_MIN') # 몇분 뒤 도착
        bus_stop_position = arr_item.get('STATUS_POS') # 몇정류장 전
        destination = arr_item.get('DESTINATION') # 종점( ~~ 행)

        arr_info = {'route_no': route_no, 'expected_time_min':expected_time_min, 'bus_stop_position':bus_stop_position, 'destination':destination}

        if bus_number_plate in bus_number_plates:
            res_dict['arr_infos'].append(arr_info)
    
    return res_dict

# xml_example = '''<ServiceResult>
#     <comMsgHeader/>
#     <msgHeader>
#     <currentPage>1</currentPage>
#     <headerCd>0</headerCd>
#     <headerMsg>정상적으로 처리되었습니다.</headerMsg>
#     <itemCnt>8</itemCnt>
#     <itemPageCnt>1</itemPageCnt>
#     </msgHeader>
#     <msgBody>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자3309</CAR_REG_NO>
#     <DESTINATION>비래동</DESTINATION>
#     <EXTIME_MIN>3</EXTIME_MIN>
#     <EXTIME_SEC>165</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:03.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>32050</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300041</ROUTE_CD>
#     <ROUTE_NO>106</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>2</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자9214</CAR_REG_NO>
#     <DESTINATION>탄방역</DESTINATION>
#     <EXTIME_MIN>3</EXTIME_MIN>
#     <EXTIME_SEC>138</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:09.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>32050</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300039</ROUTE_CD>
#     <ROUTE_NO>104</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>2</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자3219</CAR_REG_NO>
#     <DESTINATION>대한통운</DESTINATION>
#     <EXTIME_MIN>11</EXTIME_MIN>
#     <EXTIME_SEC>636</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:42.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>31500</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300060</ROUTE_CD>
#     <ROUTE_NO>316</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>10</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자3607</CAR_REG_NO>
#     <DESTINATION>대전컨벤션센터</DESTINATION>
#     <EXTIME_MIN>7</EXTIME_MIN>
#     <EXTIME_SEC>387</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:39.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>32880</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300094</ROUTE_CD>
#     <ROUTE_NO>911</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>5</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자2020</CAR_REG_NO>
#     <DESTINATION>탑립동</DESTINATION>
#     <EXTIME_MIN>1</EXTIME_MIN>
#     <EXTIME_SEC>2132</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:05:01.0</INFO_OFFER_TM>
#     <LAST_CAT>0</LAST_CAT>
#     <LAST_STOP_ID>32360</LAST_STOP_ID>
#     <MSG_TP>07</MSG_TP>
#     <ROUTE_CD>30300096</ROUTE_CD>
#     <ROUTE_NO>918</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>2</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자9531</CAR_REG_NO>
#     <DESTINATION>동광장</DESTINATION>
#     <EXTIME_MIN>2</EXTIME_MIN>
#     <EXTIME_SEC>119</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:41.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>32230</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300089</ROUTE_CD>
#     <ROUTE_NO>705</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>2</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자2141</CAR_REG_NO>
#     <DESTINATION>신탄진</DESTINATION>
#     <EXTIME_MIN>12</EXTIME_MIN>
#     <EXTIME_SEC>702</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:45.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>30290</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300087</ROUTE_CD>
#     <ROUTE_NO>703</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>11</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     <itemList>
#     <BUS_NODE_ID>8001378</BUS_NODE_ID>
#     <BUS_STOP_ID>32350</BUS_STOP_ID>
#     <CAR_REG_NO>대전75자9508</CAR_REG_NO>
#     <DESTINATION>비래동</DESTINATION>
#     <EXTIME_MIN>17</EXTIME_MIN>
#     <EXTIME_SEC>963</EXTIME_SEC>
#     <INFO_OFFER_TM>2023-04-02 21:20:26.0</INFO_OFFER_TM>
#     <LAST_CAT>3</LAST_CAT>
#     <LAST_STOP_ID>31470</LAST_STOP_ID>
#     <MSG_TP>03</MSG_TP>
#     <ROUTE_CD>30300081</ROUTE_CD>
#     <ROUTE_NO>617</ROUTE_NO>
#     <ROUTE_TP>2 </ROUTE_TP>
#     <STATUS_POS>12</STATUS_POS>
#     <STOP_NAME>대전광역시청</STOP_NAME>
#     </itemList>
#     </msgBody>
#     </ServiceResult>'''

# test = xmltodict.parse(xml_example)
# paresd_res = {'ServiceResult': 
#              {'comMsgHeader': None, 
#               'msgHeader': 
#                 {'currentPage': '1', 'headerCd': '0', 'headerMsg': '정상적으로 처리되었습니다.', 'itemCnt': '8', 'itemPageCnt': '1'}, 
#             'msgBody': {
#     'itemList': [
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자3309', 'DESTINATION': '비래동', 'EXTIME_MIN': '3', 'EXTIME_SEC': '165', 'INFO_OFFER_TM': '2023-04-02 21:20:03.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '32050', 'MSG_TP': '03', 'ROUTE_CD': '30300041', 'ROUTE_NO': '106', 'ROUTE_TP': '2', 'STATUS_POS': '2', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자9214', 'DESTINATION': '탄방역', 'EXTIME_MIN': '3', 'EXTIME_SEC': '138', 'INFO_OFFER_TM': '2023-04-02 21:20:09.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '32050', 'MSG_TP': '03', 'ROUTE_CD': '30300039', 'ROUTE_NO': '104', 'ROUTE_TP': '2', 'STATUS_POS': '2', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자3219', 'DESTINATION': '대한통운', 'EXTIME_MIN': '11', 'EXTIME_SEC': '636', 'INFO_OFFER_TM': '2023-04-02 21:20:42.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '31500', 'MSG_TP': '03', 'ROUTE_CD': '30300060', 'ROUTE_NO': '316', 'ROUTE_TP': '2', 'STATUS_POS': '10', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자3607', 'DESTINATION': '대전컨벤션센터', 'EXTIME_MIN': '7', 'EXTIME_SEC': '387', 'INFO_OFFER_TM': '2023-04-02 21:20:39.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '32880', 'MSG_TP': '03', 'ROUTE_CD': '30300094', 'ROUTE_NO': '911', 'ROUTE_TP': '2', 'STATUS_POS': '5', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자2020', 'DESTINATION': '탑립동', 'EXTIME_MIN': '1', 'EXTIME_SEC': '2132', 'INFO_OFFER_TM': '2023-04-02 21:05:01.0', 'LAST_CAT': '0', 'LAST_STOP_ID': '32360', 'MSG_TP': '07', 'ROUTE_CD': '30300096', 'ROUTE_NO': '918', 'ROUTE_TP': '2', 'STATUS_POS': '2', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자9531', 'DESTINATION': '동광장', 'EXTIME_MIN': '2', 'EXTIME_SEC': '119', 'INFO_OFFER_TM': '2023-04-02 21:20:41.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '32230', 'MSG_TP': '03', 'ROUTE_CD': '30300089', 'ROUTE_NO': '705', 'ROUTE_TP': '2', 'STATUS_POS': '2', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자2141', 'DESTINATION': '신탄진', 'EXTIME_MIN': '12', 'EXTIME_SEC': '702', 'INFO_OFFER_TM': '2023-04-02 21:20:45.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '30290', 'MSG_TP': '03', 'ROUTE_CD': '30300087', 'ROUTE_NO': '703', 'ROUTE_TP': '2', 'STATUS_POS': '11', 'STOP_NAME': '대전광역시청'}, 
#         {'BUS_NODE_ID': '8001378', 'BUS_STOP_ID': '32350', 'CAR_REG_NO': '대전75자9508', 'DESTINATION': '비래동', 'EXTIME_MIN': '17', 'EXTIME_SEC': '963', 'INFO_OFFER_TM': '2023-04-02 21:20:26.0', 'LAST_CAT': '3', 'LAST_STOP_ID': '31470', 'MSG_TP': '03', 'ROUTE_CD': '30300081', 'ROUTE_NO': '617', 'ROUTE_TP': '2', 'STATUS_POS': '12', 'STOP_NAME': '대전광역시청'}
#         ]
#         }}}
# # 정류장 기준으로 묶고(어떤 정류장/어디방면), 노선번호 - 몇분남았나? (현재지점에서 몇M? )

# print(test)

