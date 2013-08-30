function portfolinatorinize(username, extraRepos) {
   
    getRepoData(username, extraRepos, setupD3);

    function setupD3(data) {
        var repos = data.repos;
        // repos = crossfilter(repos);
        d3.select("#repos")
        .append("ul")
        .selectAll('li')
        .data(repos)
        .enter().append('li')
        .text(function(repo) {
            return repo.name;
        });
    }
}

function getRepoData(username, extraRepos, callback) {
   $.ajax({
        // url: 'http://ani.pe/portfolinator/user/'+username,
        // dataType: 'jsonp',
        // For testing the frontend, you can request the example static json
        // reponse.  This is how you'd do it if hosting locally on port 8000,
        // as with `python -m SimpleHTTPServer`.
        url: 'http://localhost:8000/example.json',
        dataType: 'json',
        
        type: 'GET',
        data: {'extraRepos': extraRepos},
        success: function(data) {
            console.log(data);
            callback(data);
            return;
            /*
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
            */
        },
    });
}
