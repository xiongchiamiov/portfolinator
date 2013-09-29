#!/usr/bin/env python

# May you recognize your weaknesses and share your strengths.
# May you share freely, never taking more than you give.
# May you find love and love everyone you find.

from flask import Flask, request
from flask.ext.jsonpify import jsonify
from github3 import login
from github3.models import GitHubError

import settings

app = Flask(__name__)

# While none of the information we're grabbing is private, we need to be
# authorized to get any reasonable number of requests (5000 req/hr vs. 60
# req/hr).
gh = login(token=settings.token)

@app.route('/user/<username>')
def user(username):
    app.logger.debug('Processing request for user %s' % username)
    def extract_repo(repo):
        # We need to include both the researched user and the owner of the
        # repository because a user may have access to someone else's repo, and
        # some of the results here will be different depending on the user
        # we're analyzing.
        cacheKey = '%s::%s:%s' % (username, repo.owner, repo.name)
        app.logger.debug('Processing request for repo %s' % cacheKey)
        r = settings.cache.get(cacheKey)
        if r:
            app.logger.debug('Cache hit!')
            return r
        
        r = {}
        r['name'] = repo.full_name
        r['description'] = repo.description
        r['homepage'] = repo.homepage
        r['url'] = repo.html_url
        r['language'] = repo.language
        r['created'] = repo.created_at
        r['lastPushed'] = repo.pushed_at
        r['isFork'] = repo.fork
        r['numContributors'] = len(list(repo.iter_contributors()))
        r['numWatchers'] = repo.watchers
        r['numStargazers'] = len(list(repo.iter_stargazers()))
        r['numForks'] = repo.forks
        try:
            r['numTotalIssues'] = (len(list(repo.iter_issues(state='closed')))
                                   + repo.open_issues)
            r['numOpenIssues'] = repo.open_issues
        except GitHubError:
            # Issues are disabled, probably.
            r['numTotalIssues'] = 0
            r['numOpenIssues'] = 0
        r['numTags'] = len(list(repo.iter_tags()))
        for contribution in repo.iter_contributor_statistics():
            if username.lower() == contribution.author.login.lower():
                r['numContributedCommits'] = contribution.total
                break
        
        settings.cache.set(cacheKey, r)
        return r

    repos = []
    for repo in gh.iter_user_repos(username):
        repos.append(extract_repo(repo))
    for fullName in request.args.getlist('extraRepos[]'):
        # We pass in a single list of to-be-split names instead of a list of
        # tuples because that's *way* easier when it comes to URL parsing.  And
        # Github doesn't allow slashes in either usernames or reponames, so
        # we're pretty safe.
        username, repo = fullName.split('/')
        repos.append(extract_repo(gh.repository(username, repo)))
    return jsonify(username=username, repos=repos)

if __name__ == '__main__':
    app.run(debug=settings.debug)

