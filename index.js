function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = '<ul>' + repos.map(r => {
   return (`
          <li>
            <h2><a href="${r.html_url}">${r.name}</a></h2>
            <p>Watchers: ${r.watchers_count}</p>
            <p>Forks: ${r.forks_count}</p>
            <p>Issues: ${r.open_issues_count}</p>
          </li>`
          )
  }).join('') + "</ul>"
  /* console.log(this.responseText);
  let repoList = "<ul>";
  for(var i=0; i < this.responseText.length; i++) {
    repoList += '<li>' + this.responseText[i]['name'] + '</li>'
  }
   repoList += '</ul>'; */
  document.getElementById('repositories').innerHTML = repoList; // list of repos
}

var userName;


function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  userName = document.getElementById('userInput').value;
  req.open('GET', 'https://api.github.com/users/' + userName +'/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/' + userName +'/' + name + '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
