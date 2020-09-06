import requests
import re
import json
import time

with open('links.json') as f:
    itemsDict = json.load(f)



#tbodyPattern = re.compile(r'(?<=<tbody>).*(?=</tbody>)')
tbodyPattern = re.compile(r'<tbody>.*</tbody>', re.DOTALL)
trPattern = re.compile(r'(?<=>).*?(?=</tr>)', re.DOTALL)
thPattern = re.compile(r'(?<=>).*?(?=</th>)')
tdPattern = re.compile(r'(?<=>).*?(?=</td>)')
strongPattern = re.compile(r'(?<=>).*?(?=</strong>)')

def processTbody(tbody):
    result = {}
    trs = trPattern.findall(tbody)
    currentCategory = "all"
    conditions = []
    for tr in trs:
        print('-----tr-----')
        print(tr)
        if "</th>" in tr:
            print('-----th-----')
            print(tr)
            ths = thPattern.findall(tr)
            category = re.sub('\W+','',ths[0])
            if category != "":
                result[category] = {}
                currentCategory = category
            else:
                result['all'] = {}
                currentCategory = "all"
            conditions = ths[1:]

        elif "</td>" in tr:
            print('-----td-----')
            tds = tdPattern.findall(tr)
            if "strong" in tds[0]: #['<strong>Soy Milk</strong> lasts for ', '7-10 Days']
                itemName = strongPattern.search(tds[0]).group(0)
            else:
                itemName = tds[0]
            result[currentCategory][itemName]={}
            for i,date in enumerate(tds[1:]):
                result[currentCategory][itemName][conditions[i]] =  date
    
    print(result)
            
    return result


count = 0
for name,link in itemsDict.items():
    if count < 1:
        response = requests.get(link)
        if response.status_code == 200:
            tbody = tbodyPattern.search(response.text)
            if tbody:
                tbody = tbody.group(0)
                result = processTbody(tbody)
            else:
                print('cant find tbody for', name)
        else:
            print('bad response for', name)

    count += 1
