function portfolinatorinize(username, extraRepos) {
    var columns = [
        {prop: 'name',                    header: 'Repo',
         content: columnName},
        {prop: 'numForks',                header: 'Forks'},
        {prop: 'numWatchers',             header: 'Watchers'},
        {prop: 'numContributors',         header: 'Contributors'},
        {prop: 'numStargazers',           header: 'Stars'},
        {prop: 'numContributedCommits',   header: 'My Contributions',
         content: columnContributions}
    ];
    var allRepos;

    var columnHeaders = bindColumnHeaders(columns);
    getRepoData(username, extraRepos, setupD3);

    function setupD3(repos) {
        var rows = bindRepoData(repos);

        columnHeaders.on('click', function(d) {
            rows.sort(comparator(d.prop, d.asc));
            d.asc = !d.asc;
            d3.event.preventDefault();
            columnHeaders.classed('selected', false);
            this.classList.add('selected');
        });
    }

    function bindColumnHeaders(columns) {
        var headers =
        d3.select("#headers")
        .selectAll('th')
        .data(columns);

        headers
        .enter()
        .append('th')
        .append('a');

        headers.selectAll('a')
        .text(getProp('header'))
        .attr('href', '#');

        headers
        .exit()
        .remove();

        return headers;
    }

    function columnName(td) {
        td.append('a')
        .text(getProp('name'))
        .attr('href', getProp('url'))
        .classed('name', true);

        td.append('div')
        .text(getProp('description'))
        .classed('description', true);
    }

    function columnContributions(td) {
        td.append('a')
        .filter(getProp('numContributedCommits'))
        .text(function(d) {
            return d.numContributedCommits + " commits";
        })
        .attr('href', function(d) {
            return d.url + '/commits?author=' + encodeURIComponent(username);
        });
    }

    function bindRepoData(data) {
        var repos = data.repos;
        username = data.username;

        var repoRows = d3.select("#repos")
        .selectAll("tr")
        .data(repos);

        var repoRow = repoRows
        .enter()
        .append('tr');

        repoRows.exit().remove();

        $.each(columns, function(i, column) {
            var td = repoRow.append('td');
            // Give each column a class named {column.prop}
            td.classed(column.prop, true);
            // If the column has a custom content function, use that
            if (column.content) {
                column.content(td);
            } else {
                td.text(getProp(column.prop))
            }
        });

        return repoRows;
    }

    function getProp(property) {
        return function (obj) {
            return obj[property];
        };
    }

    function comparator(prop, asc) {
        var less     = asc ? -1 : 1;
        var greater  = asc ? 1 : -1;
        asc = asc ? 1 : -1;
        return function(a, b) {
            if (a[prop] == b[prop]) return 0;
            return a[prop] < b[prop] ? less : greater;
        }
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
