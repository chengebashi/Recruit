from flask import Blueprint,Flask,render_template,redirect,jsonify,session,request
from SQL.mysql import Data
from SQL import sendemail




__author__ = 'Chenge'

CITY = ['北京','上海','杭州','广州','深圳','成都','武汉','江苏','厦门','长沙','天津']

main_ui = Blueprint('Main_ui',__name__)

D = Data()

show_money = D.show_all_money()

showradius = D.showall()
showlabel = showradius[0]
showtfidf = showradius[-1]


job_list = D.show_jobname()
job_list.pop(-1)

xlradius = {}
timeradius = {}

for j in job_list:
    xlradius[j] = D.showALLXL(j)
    timeradius[j] = D.showALLTIME(j)





#让模块识别视图
from .views import *