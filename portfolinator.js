function portfolinatorinize(username) {
    $.ajax({
        url: 'http://ani.pe/portfolinator/user/'+username,
        type: 'GET',
        dataType: 'jsonp',
        success: function(json) {
            console.log(json);
            var repos = $('<div>').addClass('portfolinator-repos');
            $.each(json.repos, function(i, repo) {
                var div = $('<div>').addClass('portfolinator-repo');
                div.append(
                    $('<h2>').append(
                        $('<a>').attr('href', repo.url).text(repo.name)
                    ),
                    $('<h3>').text(repo.description),
                    $('<h3>').append(
                        $('<a>').attr('href', repo.homepage).text(repo.homepage)
                    ),
                    $('<ul>').append(
                        $('<li>').text('Language: '+repo.language),
                        $('<li>').text('Created: '+repo.created),
                        $('<li>').text('Last Pushed: '+repo.lastPushed),
                        $('<li>').text('Is a Fork?: '+repo.isFork),
                        $('<li>').text('Contributors: '+repo.numContributors),
                        $('<li>').text('Watchers: '+repo.numWatchers),
                        $('<li>').text('Stargazers: '+repo.numStargazers),
                        $('<li>').text('Forks: '+repo.numForks),
                        $('<li>').text('Total Issues: '+repo.numTotalIssues),
                        $('<li>').text('Open Issues: '+repo.numOpenIssues),
                        $('<li>').text('Tags: '+repo.numTags),
                        $('<li>').text('Contributed Commits: '+repo.numContributedCommits)
                    )
                );
                repos.append(div);
            });
            $('#portfolinator').empty().append(
                $('<h1>').text(json.username),
                repos
            );
        },
    });
}

