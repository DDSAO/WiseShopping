import requests
import re
import json
import time

mainPattern = re.compile(r'class="fusion-footer"')
listItemPattern = re.compile(r'<li>.*?</li>')

linkPattern = re.compile(r'http://.*?(?=">)')
namePattern = re.compile(r'(?<=">).*?(?=<)')

itemsDict = {}

categories = ['dairy','drinks','fruits','vegetables','grains','proteins','others']

for c in categories:
    print('http://www.eatbydate.com/'+c+'/')
    
    r = requests.get('http://www.eatbydate.com/'+c+'/')
    content = mainPattern.split(r.text)[0]
    items = listItemPattern.findall(content)


    for item in items:
        link = linkPattern.search(item).group(0)
        name = namePattern.search(item).group(0).lower()
        itemsDict[name] = link
    
    time.sleep(1)


with open('data.json', 'w+') as file:
    json.dump(itemsDict, file)
