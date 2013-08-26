A nice, customizable, auto-generated portfolio using data from Github.

# Background

I'd like a nice auto-generated portfolio, using my work from Github.  It should
have sorting and filtering to make sense of all the data.  Also, importantly,
it should allow customization - I, as a user, should be able to add extra repos
not on my profile, or text explaining what I did on a project.

Ideally this will be easily embeddable, rather than requiring viewers to go to
an entirely separate website.

This would work well as a purely client-side application, but Github limits
anonymous requests to 60 per hour.  So, we need to be authorized, which means
we need to be at least partially server-side.

See also: [xiongchiamiov/xiongchiamiov.github.com#5][0]

[0]: https://github.com/xiongchiamiov/xiongchiamiov.github.com/issues/5

# Use

Just include jQuery, portfolinator.js, and a div with an id of 'portfolinator',
then call `portfolinatorinize()`.  See [report.html] for a skeleton example
page.

[report.html]: report.html

# Development

## Server

I highly recommend using virtualenv:

    [$]> virtualenv --no-site-packages --distribute env
    [$]> source env/bin/activate
    [$]> pip install -r requirements.txt

You'll need to copy `settings.py.example` to `settings.py` and modify the
values as you wish.  You can generate a token by running `generate_token.py`.

Then, run the server by simply executing it:

    [$]> ./portfolinator.py

## Client

While there are [many ways] to quickly serve up local static files, I prefer
Python, as I've already got it installed and the invocation is short:

    [$]> python -m SimpleHTTPServer

If you'd like to test against a static JSON response, rather than querying the
backend each time, please take a look at the comments in `portfolinator.js`.

[many ways]: https://gist.github.com/willurd/5720255

