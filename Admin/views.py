from . import *
from flask import redirect,request,render_template,session,jsonify

__author__ = 'Chenge'


@admin.route('/login',methods=['GET','POST'])
def login():
    '''用户登陆'''
    if request.method == 'GET':
        username = session.get('username')
        if username:
            return redirect('/')
        else:
            return render_template('Admin/login.html')
    else:
        data = request.get_json()
        email = data['emailValue']
        password = data['passwordValue']
        #检验密码
        res = D.checkEmail(email)
        if res != 0:
            return jsonify({'err':'邮箱不存在！'})
        else:
            reg = D.loginUser(email,password)
            if reg == 1:
                return jsonify({'err':'密码错误!'})
            else:
                info = D.showpersoninformation(email)
                session['head'] = '../../'+info[1]
                session['username'] = info[2]
                session['password'] = info[3]
                session['email'] = info[4]
                session['message'] = D.mainfourmessage()[::-1]
                session['time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                return jsonify({'err':0})


@admin.route('/logout',methods=['GET'])
def logout():
    '''用户注销'''
    session.pop('username')
    session.pop('email')
    session.pop('password')
    session.pop('head')
    session.pop('message')
    return redirect('login')


@admin.route('/register',methods=['GET','POST'])
def register():
    '''用户注册'''
    if request.method == 'GET':
        username = session.get('username')
        if username:
            return redirect('/')
        else:
            return render_template('Admin/register.html')
    else:
        data = request.get_json()
        username = data['usernameValue']
        email = data['emailValue']
        password = data['passwordValue']
        res = D.checkEmail(email)
        if res == 1:
            ree = D.checkUname(username)
            if ree == 2:
                return jsonify({'err':'用户名已存在！'})
            else:
                reg = D.register(username,email,password)
                if reg == 0:
                    return jsonify({'err':0})
                else:
                    return jsonify({'err':'后台错误！'})
        else:
            return jsonify({'err':'邮箱名已存在！'})


@admin.route('/resetpassword',methods=['GET','POST'])
def resetpassword():
    '''找回密码'''
    if request.method == 'GET':
        username = session.get('username')
        if username:
            return redirect('/')
        else:
            return render_template('Admin/resetpassword.html')
    else:
        data = request.get_json()
        username = data['username_value']
        randomNumber = data['randomnumber']
        if randomNumber != session['randomNumber']:
            return jsonify({'err':'验证码错误!'})
        else:
            res = D.checkUname(username)
        if res == 0:
            return jsonify({'err':'用户名不存在'})
        else:
            reg = D.resetpasswd(username)
            if reg == 0:
                email = D.showemail(username)
                ree = sendemail.email_send('初始化密码:123456',email)
                return jsonify({'err':0})
            else:
                return jsonify({'err':'后台错误'})


@admin.route('/updateuname',methods=['GET','POST'])
def updateuname():
    '''更新用户名'''
    if request.method=='GET':
        uname = session.get('username')
        if not uname:
            return redirect('login')
        else:
            img = session['head']
            img = img + '?r=' + str(sendemail.randomnumber())
            email = session['email']
            return render_template('Admin/updateUname.html',uname=uname,img=img,email=email,nowtime=session['time'],message=session['message'])
    else:
        data = request.get_json()
        newname = data['newname']
        randomNumber = data['randomnumber']
        if randomNumber != session['randomNumber']:
            return jsonify({'err':'验证码错误!'})
        else:
            res = D.checkUname(newname)
            if res == 0:
                reg = D.updateUname(newname,session['email'])
                if reg == 0:
                    session['username'] = newname
                    session.pop('randomNumber')
                    return  jsonify({'err':0})
                else:
                    return jsonify({'err':'后台错误!'})
            else:
                return jsonify({'err':'用户名已存在!'})


@admin.route('/updatehead',methods=['GET','POST'])
def updatehead():
    '''更新头像'''
    if request.method=='GET':
        uname = session.get('username')
        email = session.get('email')
        imgpath = session.get('head')
        imgpath = imgpath + '?r=' + str(sendemail.randomnumber())  #防止浏览器缓存
        if not uname:
            return redirect('login')
        else:
            img = session['head']
            img = img + '?r=' + str(sendemail.randomnumber())
            return render_template('Admin/updatehead.html',uname=uname,email=email,imgpath=imgpath,nowtime=session['time'],img=img,message=session['message'])
    else:
        data = request.get_json()
        img = data['img']
        end = img.split(';')[0].split('/')[-1]
        # if 'jpeg' == end:
        #     end = 'jpg'
        uid = D.showuid(session['username'])
        session['path'] = 'static/assets/headimg'
        os_path = session['path']+'/'+str(uid)+'.'+end
        with open(os_path, 'wb') as f:
            data_img = base64.b64decode(img.split(',')[-1])
            f.write(data_img)
        res = D.updateheadimg(uid,os_path)
        if res==0:
            session['head'] = '../../'+os_path
            return jsonify({'err':0})
        else:
            return jsonify({'err':'后台错误!'})


@admin.route('/updatepassword',methods=['GET','POST'])
def updatepassword():
    '''更新密码'''
    if request.method=='GET':
        uname = session.get('username')
        if not uname:
            return redirect('login')
        else:
            img = session['head']
            img = img + '?r=' + str(sendemail.randomnumber())
            email = session['email']
            return render_template('Admin/updatePassword.html',uname=uname,nowtime=session['time'],img=img,email=email,message=session['message'])
    else:
        data = request.get_json()
        newpass = data['newpass']
        randomNumber = data['randomnumber']
        if randomNumber != session['randomNumber']:
            return jsonify({'err':'验证码错误'})
        else:
            res = D.updatePssword(session['username'],newpass)
            if res == 0:
                session['password'] = newpass
                session.pop('randomNumber')
                return jsonify({'err':0})
            else:
                return jsonify({'err':'后台错误!'})


@admin.route('/updateemail',methods=['GET','POST'])
def updateemail():
    '''更新邮箱'''
    if request.method=='GET':
        uname = session.get('username')
        if not uname:
            return redirect('login')
        else:
            img = session['head']
            img = img + '?r=' + str(sendemail.randomnumber())
            email = session['email']
            return render_template('Admin/updateemail.html',uname=uname,nowtime=session['time'],img=img,email=email,message=session['message'])
    else:
        data = request.get_json()
        newemail = data['newemail']
        randomNumber = data['randomnumber']
        if randomNumber != session['randomNumber']:
            return jsonify({'err':'验证码错误'})
        else:
            res = D.updateemail(session['username'],newemail)
            if res == 0:
                session['email'] = newemail
                session.pop('randomNumber')
                return jsonify({'err':0})
            else:
                return jsonify({'err':'后台错误！'})



@admin.route('/info',methods=['GET'])
def info():
    '''个人中心'''
    if request.method == 'GET':
        uname = session.get('username')
        email = session.get('email')
        imgpath = session.get('head')
        imgpath = imgpath + '?r=' + str(sendemail.randomnumber())
        if not uname:
            return redirect('login')
        else:
            messageList = D.showallmessage()[::-1]
            return render_template('Admin/info.html',uname=uname,email=email,imgpath=imgpath,nowtime=session['time'],img=imgpath,message1=messageList,message=session['message'])


@admin.route('/randomNumber',methods=['POST'])
def randomNumber():
    data = request.get_json()
    nowName = data['nowname']
    now_email = D.showemail(nowName)
    randomNumber = sendemail.randomnumber()
    session['randomNumber'] = str(randomNumber)
    err = sendemail.email_send('当前的验证码为'+str(randomNumber)+',请不要告诉别人哦！',now_email)
    return jsonify({'err':err})


@admin.route('/randomNumber2',methods=['POST'])
def randomNumber2():
    data = request.get_json()
    nowName = data['nowname']
    res = D.checkUname(nowName)
    if res == 0:
        return jsonify({'err':'用户名不存在！'})
    else:
        now_email = D.showemail(nowName)
        randomNumber = sendemail.randomnumber()
        session['randomNumber'] = str(randomNumber)
        err = sendemail.email_send('当前的验证码为'+str(randomNumber)+',请不要告诉别人哦！',now_email)
        return jsonify({'err':err})

@admin.route('/sendmessage',methods=['POST'])
def sendmessage():
    data = request.get_json()
    message = data['message']
    nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    res = D.insertmessage(session['username'],session['head'],nowtime, message)
    if res == 0:
        return jsonify({'err':0})
    else:
        return jsonify({'err':'留言写入失败!'})

@admin.route('/deletemessage',methods=['GET','POST'])
def deletemessage():
    if request.method == 'GET':
        uname = session.get('username')
        email = session.get('email')
        imgpath = session.get('head')
        if not uname:
            return redirect('login')
        else:
            messageList = D.showpersonalmessage(uname)[::-1]
            return render_template('Admin/deletemessage.html', uname=uname, email=email, imgpath=imgpath,nowtime=session['time'], img=imgpath, message2=messageList,message=session['message'])
    else:
        data = request.get_json()
        id = data['id']
        print(id)
        res = D.deletemessage(id)
        if res == 0:
            return jsonify({'err':0})
        else:
            return jsonify({'err':'数据库错误!'})


