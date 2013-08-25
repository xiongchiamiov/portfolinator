#!/usr/bin/env python

# May you recognize your weaknesses and share your strengths.
# May you share freely, never taking more than you give.
# May you find love and love everyone you find.

from github3 import authorize
from getpass import getpass

user = password = ''
while not user:
   user = raw_input('Username: ')
while not password:
   password = getpass('Password: ')

auth = authorize(user, password,
                 scopes=[], # Read-only access to public repos.
                 note='portfolinator',
                 note_url='https://github.com/xiongchiamiov/portfolinator')
print auth.token

