from . import *
from SQL.mysql import Data
__author__ = 'Chenge'


@main_ui.route('/',methods=['GET','POST'])
def index():
    '''首页'''
    uname = session.get('username')
    if not uname:
        return redirect('admin/login')
    else:
        data = Data()
        money_list = []
        job_name = data.show_jobname()
        job_time = data.show_jobjy()
        job_xl = data.show_xl()
        work_name_list = job_name
        work_name_list.pop(-1)
        moneyed = show_money
        for j in range(30):
            list = []
            list.append(work_name_list[j])
            for i in moneyed:
                list.append(i[j])
            money_list.append(list)
        img = session['head']
        img = img + '?r=' + str(sendemail.randomnumber())
        return render_template('Main_ui/index.html',city=CITY, jobname=job_name, gj_time=job_time, gj_xl=job_xl, money_list=money_list,labels= showlabel,tfidf= showtfidf,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])

@main_ui.route('/search',methods=['POST'])
def search():
    hots_job = request.form.get('Framework').strip()
    hots_city = request.form.get('Framework_2').strip()
    hots_xl = request.form.get('Framework_3').strip()
    hots_time = request.form.get('Framework_4').strip()
    print(hots_job,hots_city,hots_xl,hots_time)
    img = session['head']
    img = img + '?r=' + str(sendemail.randomnumber())
    if not hots_job:
        if hots_xl == '不限':
            if hots_time == '经验不限':
                # 'job无,city有,xl无,time无'
                title_list = ['不限',hots_city,'不限','不限']
                TheInfoList = D.search1(hots_city)
                # print(TheInfoList,'the1')
                return render_template('Main_ui/job_search.html',infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
            else:
                # 'job无,city有,xl无,time有'
                title_list = ['不限', hots_city, '不限', hots_time]
                TheInfoList = D.search2(hots_city,hots_time)
                # print(TheInfoList, 'the2')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
        else:
            if hots_time == '经验不限':
                # 'job无,city有,xl有,time无'
                title_list = ['不限', hots_city, hots_xl, '不限']
                TheInfoList = D.search3(hots_city, hots_xl)
                # print(TheInfoList, 'the3')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
            else:
                # 'job无,city有,xl有,time有'
                title_list = ['不限', hots_city, hots_xl,hots_time ]
                TheInfoList = D.search4(hots_city, hots_xl,hots_time)
                # print(TheInfoList, 'the4')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
    else:
        if hots_xl == '不限':
            if hots_time == '经验不限':
                # 'job有,city有,xl无,time无'
                title_list = [hots_job, hots_city, '不限', '不限']
                TheInfoList = D.search5(hots_city, hots_job)
                # print(TheInfoList, 'the5')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
            else:
                # 'job有,city有,xl无,time有'
                title_list = [hots_job, hots_city, '不限',hots_time]
                TheInfoList = D.search6(hots_city, hots_job,hots_time)
                # print(TheInfoList, 'the6')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
        else:
            if hots_time == '经验不限':
                # 'job有,city有,xl有,time无'
                title_list = [hots_job, hots_city, hots_xl, '不限']
                TheInfoList = D.search7(hots_city, hots_job, hots_xl)
                # print(TheInfoList, 'the7')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])
            else:
                # 'job有,city有,xl有,time有'
                title_list = [hots_job, hots_city, hots_xl, hots_time]
                TheInfoList = D.search8(hots_city, hots_job, hots_xl, hots_time)
                # print(TheInfoList, 'the8')
                return render_template('Main_ui/job_search.html', infolist=TheInfoList,title_list=title_list,uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'])




@main_ui.route('/job_analy/<id>',methods=['POST'])
def analy(id):
    uid = id
    companyName = request.form.get('compannyName')
    city = request.form.get('city')
    jobName = request.form.get('jobName')
    # print(uid,companyName,city)
    allcity_money_list = D.allcityJOBshow(jobName)
    ALL_List_tuple = D.allcompannyJOBshow(city,jobName)
    RADIU_tuple = D.managepersonshow(city,jobName)
    WorkNeeds = D.workneed(city,jobName)
    img = session['head']
    img = img + '?r=' + str(sendemail.randomnumber())
    return render_template('Main_ui/job_analy.html',city=CITY,allcity_money_list= allcity_money_list,allcompanny_money_list= ALL_List_tuple[0],allcompannyname_list=ALL_List_tuple[-1],numbersAll=RADIU_tuple[0],tfidf=RADIU_tuple[-1],workneeds=WorkNeeds,titleList=[city,jobName],uname=session['username'],img=img,email=session['email'],nowtime=session['time'],message=session['message'],xlradius=xlradius[jobName],timeradius=timeradius[jobName])