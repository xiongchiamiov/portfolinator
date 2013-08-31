function portfolinatorinize(username, extraRepos) {
    var columns = [
        {prop: 'name', header: 'Name'},
        {prop: 'numForks', header: 'Forks'}
    ];

    bindColumnHeaders(columns);
    getRepoData(username, extraRepos, bindRepoData);

    function bindColumnHeaders(columns) {
        var columnHeaders =
        d3.select("#headers")
        .selectAll('th')
        .data(columns);

        columnHeaders
        .enter()
        .append('th');

        columnHeaders
        .text(getProp('header'));

        columnHeaders
        .exit()
        .remove();
    }

    function bindRepoData(data) {
        var repos = data.repos;

        var repoRow = d3.select("#repos")
        .selectAll("tr")
        .data(repos)
        .enter()
        .append('tr');

        $.each(columns, function(i, column) {
            repoRow.append('td').text(getProp(column.prop))
        });
    }

    function getProp(property) {
        return function (obj) {
            return obj[property];
        };
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
