import pymysql,jieba,jieba.analyse,random

db = pymysql.connect(host='127.0.0.1', user='recruit',password='recruit', database='recruit', charset='utf8')

#
# db.ping(reconnect=True)
# cur = db.cursor()


