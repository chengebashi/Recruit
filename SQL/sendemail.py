import smtplib,random
from email.mime.text import MIMEText
from email.header import Header

def email_send(text, email):
    '''
    发邮件
    :return:
    '''
    # 第三方 SMTP 服务
    mail_host = "smtp.exmail.qq.com"  # 设置服务器
    mail_user = "chenge@chenge.online"  # 用户名
    mail_pass = "QrwdCHPzdZPga835"  # 口令

    sender = '【】'
    receivers = [email]  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

    message = MIMEText(text, 'plain', 'utf-8')
    message['From'] = Header("chenge", 'utf-8')
    message['To'] = Header("myself", 'utf-8')

    subject = '招聘信息网验证码'
    message['Subject'] = Header(subject, 'utf-8')

    try:
        smtpObj = smtplib.SMTP_SSL(host='smtp.exmail.qq.com')
        smtpObj.connect(mail_host, 465)  # 25 为 SMTP 端口号
        # smtplib.SMTP_SSL(host='smtp.gmail.com').connect(host='smtp.gmail.com', port=465)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receivers, message.as_string())
        return 0
    except smtplib.SMTPException:
        return 1


def randomnumber():
    number = random.randint(111111,999999)
    return number