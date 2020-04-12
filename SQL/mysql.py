from . import *
import random

CITY = ['beijing','shanghai','hangzhou','guangzhou','shenzhen','chengdu','wuhan','jiangsu','shamen','changsha','tianjin']
CITY_CHN = ['北京','上海','杭州','广州','深圳','成都','武汉','江苏','厦门','长沙','天津']
class Data():

    # def updata(self):
    #     db.ping(reconnect=True)
    #     self.cur = db.cursor()
    #     for city in CITY:
    #         sql = "UPDATE {}_information Set work_money='10-20' WHERE work_money regexp 'K'".format(city)
    #         self.cur.execute(sql)
    #         db.commit()
    #     self.cur.close()


    def show_jobname(self):
        db.ping(reconnect=True)
        self.job_list = []
        self.cur = db.cursor()
        sql = "select job_name from beijing_information"
        self.cur.execute(sql)
        response_tuple = self.cur.fetchall()
        self.cur.close()
        for i in response_tuple:
            if i[0] not in self.job_list:
                self.job_list.append(i[0])
        self.job_list.append('不限')
        return self.job_list

    def show_jobjy(self):
        # db.ping(reconnect=True)
        self.job_list = [ '应届毕业生', '经验1年以下', '经验1-3年', '经验3-5年', '经验5-10年', '经验10年以上', '经验不限']
        # cur = db.cursor()
        # sql = "select work_time from beijing_information"
        # cur.execute(sql)
        # response_tuple = cur.fetchall()
        # cur.close()
        # for i in response_tuple:
        #     if i[0] not in job_list:
        #         job_list.append(i[0])
        return self.job_list

    def show_xl(self):
        # db.ping(reconnect=True)
        self.job_list = ['大专', '本科', '硕士', '博士', '不限']
        # self.cur = db.cursor()
        # sql = "select work_xl from beijing_information"
        # self.cur.execute(sql)
        # response_tuple = self.cur.fetchall()
        # self.cur.close()
        # for i in response_tuple:
        #     if i[0] not in self.job_list:
        #         self.job_list.append(i[0])
        return self.job_list

    def show_moeny(self,city):
        db.ping(reconnect=True)
        self.job_list = []
        self.job_money = []
        self.cur = db.cursor()
        sql = "select job_name from beijing_information"
        self.cur.execute(sql)
        response_tuple = self.cur.fetchall()
        for i in response_tuple:
            if i[0] not in self.job_list:
                self.job_list.append(i[0])
        # for city in CITY:
        for j in self.job_list:
            sql = "select work_money from {}_information where job_name = '{}'".format(city,j)
            self.cur.execute(sql)
            self.theOne = self.cur.fetchall()
            self.money_list = [i[0] for i in self.theOne if '-' in i[0]]
            random_mon = random.choice(self.money_list)
            mn = random_mon.split('-')
            avg = (int(mn[0]) + int(mn[-1])) / 2
            self.job_money.append(int(avg)*1000)

        self.cur.close()
        return self.job_money

    def show_all_money(self):
        self.show_moenys = []
        for i in CITY:
            self.show_moenys.append(self.show_moeny(i))
        return self.show_moenys

    def showmanage(self,job):
        '''查询单个岗位标签'''
        db.ping(reconnect=True)
        self.a = ''
        self.cur = db.cursor()
        for city in CITY:
            self.sql = "select work_manage from {}_information where job_name = '{}' and work_manage != ' '".format(city,job)
            self.cur.execute(self.sql)
            response = self.cur.fetchall()
            self.a = self.a + response[0][0]
        self.cur.close()
        return self.a

    def showall(self):
        '''查询所有的职位标签'''
        self.lable_list = []
        self.tf_list = []
        self.job = self.show_jobname()
        self.job.pop(-1)
        for i in self.job:
            tu = self.take_word_number(i)
            self.lable_list.append(tu[0])
            self.tf_list.append(tu[-1])
        return self.lable_list,self.tf_list

    def take_word_number(self,job):
        '''统计词频'''
        seg = self.showmanage(job)
        zidian = {}
        self.linshi = []
        self.tfidf_linshi = []
        fenci = jieba.cut_for_search(seg)
        for fc in fenci:
            if fc in zidian:
                zidian[fc] += 1
            else:
                # zidian.setdefault(fc,1)   #字典中如果不存在键，就加入键，键值设置为1
                zidian[fc] = 1
        for i in list(zidian.keys()):
            if len(i) <= 2:
                zidian.pop(i)
        word_dict = {}
        cont = 0
        for k in sorted(zidian, key=zidian.__getitem__, reverse=True):
            if cont >= 10:
                break
            word_dict[k] = zidian[k]
            cont += 1
        tfidf = jieba.analyse.extract_tags(seg, topK=30, withWeight=True)
        for pp in tfidf[0:12]:
            self.tfidf_linshi.append({'value':pp[-1],"name":pp[0]})
        for d_key,d_value in word_dict.items():
            self.linshi.append({"value":d_value,"name":d_key})
        return {job:self.linshi},{job:self.tfidf_linshi}

    def takewordnum(self,seg):
        '''计算词频'''
        self.fenci = jieba.cut_for_search(seg)
        self.zidian = {}
        for fc in self.fenci:
            if fc in self.zidian:
                self.zidian[fc] += 1
            else:
                # zidian.setdefault(fc,1)   #字典中如果不存在键，就加入键，键值设置为1
                self.zidian[fc] = 1
        for i in list(self.zidian.keys()):
            if len(i) <= 2:
                self.zidian.pop(i)

        return [i for i in self.zidian.keys()]


    def search1(self,city):
        db.ping(reconnect=True)
        self.list = []
        self.cur = db.cursor()
        self.dict = dict(zip(CITY_CHN,CITY))
        self.sql = "SELECT * from {}_information WHERE work_manage!= ''".format(self.dict[city])
        self.cur.execute(self.sql)
        self.temp_tuple = self.cur.fetchall()
        if not self.temp_tuple:
            return []
        for i in self.temp_tuple:
            self.temp_list = list(i)
            self.temp_list[5] = self.takewordnum(self.temp_list[5])[:20]
            self.list.append(self.temp_list)
        self.cur.close()
        return self.list

    def search2(self,city,time):
        db.ping(reconnect=True)
        self.list = []
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT job_name,id from {}_information WHERE work_time= '{}'".format(self.dict[city],time)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_job_list = []
        for i in self.res:
            if i[0] not in self.the_job_list:
                self.the_job_list.append(i[0])
        self.b = [[]] * 30
        self.label_dict = dict(zip(self.the_job_list, self.b))
        for ii in self.the_job_list:
            self.label_dict[ii] = []
            for jj in self.res:
                if ii in jj:
                    self.label_dict[ii].append(jj[-1])
        for dd_key,dd_value in self.label_dict.items():
            self.perlable_list = self.search2_useful(self.dict[city],dd_key)
            self.perlist = self.search2_list_useful(self.dict[city],random.choice(dd_value))
            self.perlist[5] = self.perlable_list[:20]
            # print(self.perlist)
            self.list.append(self.perlist)


        return self.list

    def search2_useful(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT work_manage from Job_information WHERE work_city='{}' and work_name='{}';".format(city,job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.str = ''
        for i in self.res:
            self.str = self.str + i[0]
        self.res_list = self.takewordnum(self.str)
        return self.res_list

    def search2_list_useful(self,city,uid):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT * FROM {}_information WHERE id = {}".format(city,uid)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return list(self.res[0])


    def search3(self,city,xl):
        db.ping(reconnect=True)
        self.list = []
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT job_name,id from {}_information WHERE work_xl= '{}'".format(self.dict[city],xl)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_job_list = []
        for i in self.res:
            if i[0] not in self.the_job_list:
                self.the_job_list.append(i[0])
        self.b = [[]] * 30
        self.label_dict = dict(zip(self.the_job_list, self.b))
        for ii in self.the_job_list:
            self.label_dict[ii] = []
            for jj in self.res:
                if ii in jj:
                    self.label_dict[ii].append(jj[-1])
        for dd_key,dd_value in self.label_dict.items():
            self.perlable_list = self.search3_useful(self.dict[city],dd_key)
            self.perlist = self.search3_list_useful(self.dict[city],random.choice(dd_value))
            self.perlist[5] = self.perlable_list[:20]
            # print(self.perlist)
            self.list.append(self.perlist)


        return self.list

    def search3_useful(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT work_manage from Job_information WHERE work_city='{}' and work_name='{}';".format(city,job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.str = ''
        for i in self.res:
            self.str = self.str + i[0]
        self.res_list = self.takewordnum(self.str)
        return self.res_list

    def search3_list_useful(self,city,uid):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT * FROM {}_information WHERE id = {}".format(city,uid)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return list(self.res[0])

    def search4(self,city,xl,time):
        db.ping(reconnect=True)
        self.list = []
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT job_name,id from {}_information WHERE work_xl= '{}' and work_time ='{}'".format(self.dict[city],xl,time)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_job_list = []
        for i in self.res:
            if i[0] not in self.the_job_list:
                self.the_job_list.append(i[0])
        self.b = [[]] * 30
        self.label_dict = dict(zip(self.the_job_list, self.b))
        for ii in self.the_job_list:
            self.label_dict[ii] = []
            for jj in self.res:
                if ii in jj:
                    self.label_dict[ii].append(jj[-1])
        for dd_key,dd_value in self.label_dict.items():
            self.perlable_list = self.search4_useful(self.dict[city],dd_key)
            self.perlist = self.search4_list_useful(self.dict[city],random.choice(dd_value))
            self.perlist[5] = self.perlable_list[:20]
            # print(self.perlist)
            self.list.append(self.perlist)


        return self.list

    def search4_useful(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT work_manage from Job_information WHERE work_city='{}' and work_name='{}';".format(city,job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.str = ''
        for i in self.res:
            self.str = self.str + i[0]
        self.res_list = self.takewordnum(self.str)
        return self.res_list

    def search4_list_useful(self,city,uid):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT * FROM {}_information WHERE id = {}".format(city,uid)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return list(self.res[0])

    def search5(self,city,job):
        db.ping(reconnect=True)
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT * from {}_information WHERE job_name = '{}'".format(self.dict[city],job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_info = list(random.choice(self.res))
        self.lable_list = self.search4_useful(self.dict[city],job)
        self.the_info[5] = self.lable_list[:20]
        return [self.the_info]

    def search6(self,city,job,time):
        db.ping(reconnect=True)
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT * from {}_information WHERE job_name = '{}' and work_time='{}'".format(self.dict[city], job,time)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_info = list(random.choice(self.res))
        self.lable_list = self.search4_useful(self.dict[city], job)
        self.the_info[5] = self.lable_list[:20]
        return [self.the_info]

    def search7(self,city,job,xl):
        db.ping(reconnect=True)
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT * from {}_information WHERE job_name = '{}' and work_xl='{}'".format(self.dict[city], job,xl)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_info = list(random.choice(self.res))
        self.lable_list = self.search4_useful(self.dict[city], job)
        self.the_info[5] = self.lable_list[:20]
        return [self.the_info]

    def search8(self,city,job,xl,time):
        db.ping(reconnect=True)
        self.dict = dict(zip(CITY_CHN, CITY))
        self.cur = db.cursor()
        self.sql = "SELECT * from {}_information WHERE job_name = '{}' and work_xl='{}' and work_time='{}'".format(self.dict[city], job,xl,time)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return []
        self.the_info = list(random.choice(self.res))
        self.lable_list = self.search4_useful(self.dict[city], job)
        self.the_info[5] = self.lable_list[:20]
        return [self.the_info]

    def allcityJOBshow(self,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.dict = dict(zip(CITY_CHN, CITY))
        self.List = []
        for i in CITY_CHN:
            self.sql = "select work_money from {}_information WHERE job_name = '{}' order by id desc LIMIT 1;".format(self.dict[i], job)
            self.cur.execute(self.sql)
            self.res = self.cur.fetchall()
            self.resList = self.res[0][0].split('-')
            self.AVG = (int(self.resList[0])+int(self.resList[-1])) / 2
            self.List.append(self.AVG)
        return self.List

    def allcompannyJOBshow(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.dict = dict(zip(CITY_CHN, CITY))
        self.sql = "select work_money,company_name from {}_information WHERE job_name = '{}'".format(self.dict[city],job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.money_list = []
        for i in self.res:
            j = i[0]
            if '-' not in j:
                j = '12-15'
            self.LS = j.split('-')
            self.AVG = (int(self.LS[0])+int(self.LS[-1])) / 2
            self.money_list.append(self.AVG)
        self.companny_list = [ii[-1] for ii in self.res]
        return self.money_list, self.companny_list


    def managepersonshow(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.dict = dict(zip(CITY_CHN, CITY))
        self.sql = "SELECT work_manage from {}_information WHERE job_name='{}' and work_manage!=''".format(self.dict[city],job)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()[0][0]
        self.ALL = self.takemanagepersonnal(self.res)
        self.NUMS = self.ALL[0]
        self.TFIDF = self.ALL[-1]
        self.NUMS_List = [{'value':value,'name':key} for key,value in self.NUMS.items()]
        self.TFIDF_list = [{'value':jj[-1],'name':jj[0]} for jj in self.TFIDF]
        return self.NUMS_List,self.TFIDF_list

    def takemanagepersonnal(self,seg):
        self.fenci = jieba.cut_for_search(seg)
        self.zidian = {}
        for fc in self.fenci:
            if fc in self.zidian:
                self.zidian[fc] += 1
            else:
                # zidian.setdefault(fc,1)   #字典中如果不存在键，就加入键，键值设置为1
                self.zidian[fc] = 1
        for i in list(self.zidian.keys()):
            if len(i) <= 2:
                self.zidian.pop(i)
        self.tfidf = jieba.analyse.extract_tags(seg, topK=30, withWeight=True)
        return self.zidian,self.tfidf


    def workneed(self,city,job):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.dict = dict(zip(CITY_CHN, CITY))
        self.sql = "SELECT work_manage from Job_information WHERE work_name='{}' and work_city='{}'".format(job,self.dict[city])
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.work_seg = ''
        for jj in self.res:
            self.work_seg += jj[0]
        self.fenci = jieba.cut_for_search(self.work_seg)
        self.zidian = {}
        for fc in self.fenci:
            if fc in self.zidian:
                self.zidian[fc] += 1
            else:
                # zidian.setdefault(fc,1)   #字典中如果不存在键，就加入键，键值设置为1
                self.zidian[fc] = 1
        for i in list(self.zidian.keys()):
            if len(i) <= 2:
                self.zidian.pop(i)
        self.WorkNeeds = [{'value':value*10,'name':key} for key,value in self.zidian.items()]
        return self.WorkNeeds

    def showemail(self,uname):
        '''查找邮箱'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT uemail from user WHERE uname='{}'".format(uname)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return self.res[0][0]

    def checkUname(self,uname):
        '''校验用户名是否存在,2代表存在，0代表不存在'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT * from user WHERE uname = '{}'".format(uname)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if self.res:
            return 2
        else:
            return 0

    def checkEmail(self,email):
        '''校验邮箱是否存在,0代表存在，1代表不存在'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "SELECT * from user WHERE uemail = '{}'".format(email)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if self.res:
            return 0
        else:
            return 1

    def updateUname(self,uname,email):
        '''修改用户名,0代表成功,3代表数据库错误'''
        db.ping(reconnect=True)
        try:
            self.cur = db.cursor()
            self.sql = "UPDATE user set uname = '{}' where uemail='{}'".format(uname,email)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 3


    def updatePssword(self,uname,password):
        '''修改密码0代表成功，2代表后台错误'''
        db.ping(reconnect=True)
        try:
            self.cur = db.cursor()
            self.sql = "update user set upasswd='{}' WHERE uname='{}'".format(password, uname)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 2

    def updateemail(self,uname,email):
        '''修改邮箱0代表成功2代表失败'''
        db.ping(reconnect=True)
        try:
            self.cur = db.cursor()
            self.sql = "update user set uemail='{}' WHERE uname='{}'".format(email, uname)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 2

    def loginUser(self,email,password):
        '''登陆,0表示登陆成功,1表示密码错误'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "select * from user where uemail='{}' and upasswd = '{}'".format(email, password)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if self.res:
            return 0
        else:
            return 1

    def register(self,uname,email,password):
        '注册用户，0代表成功，1代表失败'
        db.ping(reconnect=True)
        try:
            self.cur = db.cursor()
            self.sql = "INSERT into user VALUES(DEFAULT,DEFAULT,'{}','{}','{}')".format(uname,password,email)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 1


    def showpersoninformation(self,email):
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "select * from user WHERE uemail='{}'".format(email)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return self.res[0]

    def resetpasswd(self,uname):
        '重置密码,0代表成功,1失败'
        db.ping(reconnect=True)
        self.cur = db.cursor()
        try:
            self.sql = "update user set upasswd = '123456' where uname = '{}'".format(uname)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 1

    def showuid(self,uname):
        '''查询uid'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        self.sql = "select uid from user WHERE uname='{}'".format(uname)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        return self.res[0][0]


    def updateheadimg(self,uid,head):
        '''写入头像,0成功,1失败'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        try:
            self.sql = "update user set uhead = '{}' where uid= '{}'".format(head,uid)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 1

    def insertmessage(self,uname,uhead,utime,umain):
        '''写入留言，0成功，1失败'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        try:
            self.sql = "insert into message values(DEFAULT,'{}','{}','{}','{}')".format(uname, uhead,utime,umain)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except:
            return 1

    def showallmessage(self):
        '''查找所有留言'''
        db.ping(reconnect=True)
        self.list = []
        self.cur = db.cursor()
        self.sql = "select * from message"
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        for i in self.res:
            self.list.append(list(i))
        return self.list

    def showpersonalmessage(self,uname):
        '''查找某个用户留言'''

        db.ping(reconnect=True)
        self.list = []
        self.cur = db.cursor()
        self.sql = "select * from message where uname = '{}'".format(uname)
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        if not self.res:
            return self.list
        else:
            for i in self.res:
                self.list.append(list(i))
            return self.list

    def deletemessage(self,id):
        '''删除留言'''
        db.ping(reconnect=True)
        self.cur = db.cursor()
        try:
            self.sql = "delete from message where uid={}".format(id)
            self.cur.execute(self.sql)
            db.commit()
            return 0
        except Exception as f:
            print(f)
            return 1

    def mainfourmessage(self):
        '''显示4条'''
        db.ping(reconnect=True)
        self.list = []
        self.cur = db.cursor()
        self.sql = "select uname,utime,umain from message"
        self.cur.execute(self.sql)
        self.res = self.cur.fetchall()
        self.len = len(self.res)
        if self.len<4:
            for j in range(self.len):
                self.list.append(list(self.res[j]))
            return self.list
        else:
            for i in range(4):
                self.list.append(list(self.res[i]))
            return self.list

    def showALLXL(self,job):
        '''显示当前职位的所有职位'''
        db.ping(reconnect=True)
        self.list = []
        self.return_list = []
        self.data = {}
        self.cur = db.cursor()
        for i in CITY:
            self.sql = "select work_xl from {}_information where job_name = '{}'".format(i,job)
            self.cur.execute(self.sql)
            self.res = self.cur.fetchall()
            for j in self.res:
                self.list.append(j[0])
        # print(self.list)
        for ii in self.list:
            if ii in self.data:
                self.data[ii]+=1
            else:
                self.data[ii] = 1
        # print(self.data)
        for key,value in self.data.items():
            self.return_list.append({'value':value,'name':key})
        return self.return_list

    def showALLTIME(self,job):
        '''显示当前职位的所有职位'''
        db.ping(reconnect=True)
        self.list = []
        self.return_list = []
        self.data = {}
        self.cur = db.cursor()
        for i in CITY:
            self.sql = "select work_time from {}_information where job_name = '{}'".format(i,job)
            self.cur.execute(self.sql)
            self.res = self.cur.fetchall()
            for j in self.res:
                self.list.append(j[0])
        # print(self.list)
        for ii in self.list:
            if ii in self.data:
                self.data[ii]+=1
            else:
                self.data[ii] = 1
        # print(self.data)
        for key,value in self.data.items():
            self.return_list.append({'value':value,'name':key})
        return self.return_list
