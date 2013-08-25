#!/usr/bin/env python

# May you recognize your weaknesses and share your strengths.
# May you share freely, never taking more than you give.
# May you find love and love everyone you find.

from github3 import login

# While none of the information we're grabbing is private, we need to be
# authorized to get any reasonable number of requests (5000 req/hr vs. 60
# req/hr).
from secrets import token
gh = login(token=token)

username = 'mutantfreak'
for repo in gh.iter_user_repos(username):
    print repo.full_name
    print repo.description
    print repo.homepage
    print repo.html_url
    print '\tLanguage: %s' % repo.language
    print '\tCreated: %s' % repo.created_at
    print '\tLast pushed: %s' % repo.pushed_at
    print '\tFork?: %s' % repo.fork
    print '\tContributors: %s' % len(list(repo.iter_contributors()))
    print '\tWatchers: %s' % repo.watchers
    print '\tStargazers: %s' % len(list(repo.iter_stargazers()))
    print '\tForks: %s' % repo.forks
    print '\tTotal issues: %s' % (len(list(repo.iter_issues(state='closed')))
                                  + repo.open_issues)
    print '\tOpen issues: %s' % repo.open_issues
    print '\tTags: %s' % len(list(repo.iter_tags()))
    for contribution in repo.iter_contributor_statistics():
        if username.lower() == contribution.author.login.lower():
            print '\tCommits: %s' % contribution.total

