I'd like a nice auto-generated portfolio, using my work from Github.  It should
have sorting and filtering to make sense of all the data.  Also, importantly,
it should allow customization - I, as a user, should be able to add extra repos
not on my profile, or text explaining what I did on a project.

Ideally this will be easily embeddable, rather than requiring viewers to go to
an entirely separate website.

This would work well as a purely client-side application, but Github limits
anonymous requests to 60 per hour.  So, we need to be authorized, which means
we need to be at least partially server-side.

See also: xiongchiamiov/xiongchiamiov.github.com#5

