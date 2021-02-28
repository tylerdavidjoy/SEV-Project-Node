import requests

dev = "development"
pro = "production"

mode = dev
if mode == dev:
    baseUrl = "http://localhost:3000/"

else:
    baseUrl = "http://team2.eaglesoftwareteam.com/"



#Valid Value Test
print("\nVALID_VALUE: ")
endpoint = "valid_value"

#Post
x = requests.post(baseUrl + endpoint, {
    "value_group":"test",
    "value":"hi"
})

if(x.text == '{"value_group":"test","value":"hi"}'):
    print("PASS")
else:
    print("FAIL")

#Get All
x = requests.get(baseUrl + endpoint)
if(x.text == '[{"ID":1,"value_group":"test","value":"hi"}]'):
    print("PASS")
else:
    print("FAIL")

#Find by ID
x = requests.post(baseUrl + endpoint, {"value_group":"test","value":"hi"}) #Post ID 2
x = requests.get(baseUrl + endpoint + "?id=1")
if(x.text == '{"ID":1,"value_group":"test","value":"hi"}'):
    print("PASS")
else:
    print("FAIL")

#Update
x = requests.put(baseUrl + endpoint + "?id=1", {"value_group": "test2","value": "hello"})
x = requests.get(baseUrl + endpoint + "?id=1")
if(x.text == '{"ID":1,"value_group":"test2","value":"hello"}'):
    print("PASS")
else:
    print("FAIL")

#Get By Value_Group
x = requests.get(baseUrl + endpoint + "?value_group=test2")
if(x.text == '[{"ID":1,"value_group":"test2","value":"hello"}]'):
    print("PASS")
else:
    print("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=1")
if(x.text == '{"message":"valid_value was deleted successfully!"}'):
    print("PASS")
else:
    print("FAIL")





#Congregations test
print("\nCONGREGATION: ")
endpoint = "congregation"

#Post
x = requests.post(baseUrl + endpoint, {"name" : "church name"})
if (x.text == '{"name":"church name"}'):
    print("PASS")
else:
    print("FAIL")

#GetAll
x = requests.get(baseUrl + endpoint)
if (x.text == '[{"ID":1,"name":"church name"}]'):
    print("PASS")
else:
    print("FAIL")

#Get by ID
x = requests.post(baseUrl + endpoint, {"name" : "church name"}) #post ID 2
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"ID":1,"name":"church name"}'):
    print("PASS")
else:
    print("FAIL")

#Edit
x = requests.put(baseUrl + endpoint + "?id=1", {"name": "new church name"})
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"ID":1,"name":"new church name"}'):
    print("PASS")
else:
    print("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=1")
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"message":"Internal server error - get congregation."}'):
    print("PASS")
else:
    print("FAIL")









#Address Test
print("\nADDRESS: ")
endpoint = "address"

#Post
x = requests.post(baseUrl + endpoint, {"address":"1234 Testing St","type":2})
if (x.text == '{"address":"1234 Testing St","type":"2"}'):
    print("PASS")
else:
    print("FAIL")

#Get All
x = requests.get(baseUrl + endpoint)
if (x.text == '[{"ID":1,"address":"1234 Testing St","type":2}]'):
    print("PASS")
else:
    print("FAIL")

#Get By ID
x = requests.post(baseUrl + "family", {"congregation_ID":2,"address_ID":1}) # id = 1
x = requests.post(baseUrl + "person", {"congregation_ID": 2,"f_name": "John","l_name": "Doe","occupation": "None","employer": "Unemployed","family_ID": 1,"email": "email@gmail.com"}) # id = 1
x = requests.post(baseUrl + endpoint + "?person_ID=1", {"address":"1234 Testing St","type":2})
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"ID":1,"address":"1234 Testing St","type":2}'):
    print("PASS")
else:
    print("FAIL")

#Get by person_id
x = requests.get(baseUrl + endpoint + "?person_ID=1")
if (x.text == '[{"ID":2,"address":"1234 Testing St","type":2}]'):
    print("PASS")
else:
    print("FAIL")

#Update
x = requests.put(baseUrl + endpoint + "?id=1", {"ID": 1,"address": "5678 Testing St","type": 2})
if (x.text == '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}'):
    print("PASS")
else:
    print("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=1")
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"message":"Internal server error - get address."}'):
    print("PASS")
else:
    print("FAIL")









#Family Test
print("\nFAMILY: ")
endpoint = "family"

#Post
x = requests.post(baseUrl + endpoint, {"congregation_ID":2,"address_ID":2})
if (x.text == '{"congregation_ID":"2","address_ID":"2"}'):
    print("PASS")
else:
    print("FAIL")

#Get All
x = requests.get(baseUrl + endpoint)
if (x.text == '[{"ID":2,"congregation_ID":2,"address_ID":2}]'):
    print("PASS")
else:
    print("FAIL")

#Get By ID
x = requests.post(baseUrl + endpoint, {"congregation_ID":2,"address_ID":2})
x = requests.get(baseUrl + endpoint + "?id=2&isGetPersons=0")
if (x.text == '{"ID":2,"congregation_ID":2,"address_ID":2}'):
    print("PASS")
else:
    print("FAIL")

#Persons in Family
x = requests.post(baseUrl + "person", {"congregation_ID": 2,"f_name": "John","l_name": "Doe","occupation": "None","employer": "Unemployed","family_ID": 2,"email": "testmail@gmail.com"})
x = requests.get(baseUrl + endpoint + "?id=2&isGetPersons=1")
if (x.text == '[{"ID":2,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"testmail@gmail.com"}]'):
    print("PASS")
else:
    print("FAIL")


#Find Family for Person
x = requests.get(baseUrl + endpoint + "?person_ID=2")
if (x.text == '[{"ID":2,"congregation_ID":2,"address_ID":2}]'):
    print ("PASS")
else:
    print ("FAIL")

#Update
x = requests.put(baseUrl + endpoint + "?id=2", {"congregation_ID":2,"address_ID":2})
if (x.text == '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 0  Warnings: 0","protocol41":true,"changedRows":0}'):
    print ("PASS")
else:
    print ("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=1")
x = requests.get(baseUrl + endpoint + "?id=1&isGetPersons=0")
if (x.text == '{"message":"Internal server error - get family."}'):
    print("PASS")
else:
    print("FAIL")




#Phone_Number Test
print("\nPHONE_NUMBER: ")
endpoint = "phone_number"

#Post
x = requests.post(baseUrl + endpoint + "?id=2", {"number" : "4051234567", "can_publish" : True, "type" : 2})
if (x.text == '{"person_ID":"2","number_ID":1}'):
    print("PASS")
else:
    print("FAIL")

#Get All
x = requests.get(baseUrl + endpoint)
if (x.text == '[{"ID":1,"number":"4051234567","can_publish":1,"type":2}]'):
    print("PASS")
else:
    print("FAIL")

#Get By ID
x = requests.post(baseUrl + endpoint + "?id=2", {"number" : "4051234567", "can_publish" : True, "type" : 2})
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"ID":1,"number":"4051234567","can_publish":1,"type":2}'):
    print("PASS")
else:
    print("FAIL")

#Get by person_id

x = requests.post(baseUrl + "person", {"congregation_ID": 2,"f_name": "John","l_name": "Doe","occupation": "None","employer": "Unemployed","family_ID": 2,"email": "testmail@gmail.com"}) #id = 3
x = requests.post(baseUrl + endpoint + "?id=3", {"number" : "4051234567", "can_publish" : True, "type" : 1})
x = requests.get(baseUrl + endpoint + "?person_ID=2")
if (x.text == '[{"ID":1,"number":"4051234567","can_publish":1,"type":2},{"ID":2,"number":"4051234567","can_publish":1,"type":2}]'):
    print("PASS")
else:
    print("FAIL")

#Update
x = requests.put(baseUrl + endpoint + "?id=1", {"number" : "4051234569", "can_publish" : False, "type" : 2})
if (x.text == '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}'):
    print("PASS")
else:
    print("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=1")
x = requests.get(baseUrl + endpoint + "?id=1")
if (x.text == '{"message":"Internal server error - get phone_number."}'):
    print("PASS")
else:
    print("FAIL")






#Person Test
print("\n\nPERSON: ")
endpoint = "person"

#Post
x = requests.post(baseUrl + endpoint, {"congregation_ID": 2,"f_name": "John","l_name": "Doe","occupation": "None","employer": "Unemployed","family_ID": 2,"email": "email@gmail.com"})
if (x.text == '{"congregation_ID":"2","f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":"2","email":"email@gmail.com"}'):
    print("PASS")
else:
    print("FAIL")


#Get All
x = requests.get(baseUrl + endpoint)
if (x.text == '[{"ID":2,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"testmail@gmail.com"},{"ID":3,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"testmail@gmail.com"},{"ID":4,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"email@gmail.com"}]'):
    print("PASS")
else:
    print("FAIL")


#Get by ID
x = requests.get(baseUrl + endpoint + "?id=2")
if (x.text == '[{"ID":2,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"testmail@gmail.com"}]'):
    print("PASS")
else:
    print("FAIL")

#Update
x = requests.put(baseUrl + endpoint + "?id=2", {"congregation_ID": 1,"f_name": "Jane","l_name": "Doe","occupation": "None","employer": "Unemployed","family_ID": 1,"email": "email@gmail.com"})
x = requests.get(baseUrl + endpoint + "?id=2")
if (x.text == '[{"ID":2,"congregation_ID":2,"f_name":"John","l_name":"Doe","occupation":"None","employer":"Unemployed","family_ID":2,"email":"testmail@gmail.com"}]'):
    print("PASS")
else:
    print("FAIL")

#Delete
x = requests.delete(baseUrl + endpoint + "?id=2")
x = requests.get(baseUrl + endpoint + "?id=2")
if (x.text == '{"message":"Internal server error - get person."}'):
    print("PASS")
else:
    print("FAIL")