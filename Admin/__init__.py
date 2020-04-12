from flask import Blueprint,session
from SQL.mysql import Data
from SQL import sendemail
import base64
import os
import datetime
__author__ = 'Chenge'

admin = Blueprint('Admin', __name__)

D = Data()

from .views import *