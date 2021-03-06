var Octokit = require("@octokit/rest");

var octokit = new Octokit();

var clientWithAuth = new Octokit({
  auth: "6a699e13458a32e804a01d8967493b541d849f4d"
});
var author = 'germauricio';

var repos = Promise.resolve(octokit.repos.listForUser({
  username: author
}));



repos.then(function(listOfRepos) {
	var names = listOfRepos.data;

	console.log("Lista de repos de "+ author +":\n")
	for(var i=0; i < names.length ; i++){
		
		console.log(names[i].name + "\n")

  	var pullRequests = Promise.resolve(octokit.pulls.list({
  			owner: author,
  			repo: names[i].name
	}));

  		pullRequests.then(function(listOfPulls){

				var pull = listOfPulls.data

			for(var k = 0; k < pull.length; k++){
				
				console.log("Pull Requests:\n " + pull[k].title)
			
				var reviews = Promise.resolve(octokit.pulls.listReviews({
  				    owner : author ,
				    repo : 'Alquimistas' ,
				    pull_number : pull[k].number
				}));

				reviews.then(function(listOfReviews){
					var review = listOfReviews.data;

					console.log("Review body: \n " + review[0].body)
				});	
			}

		});

  	}
});

//COMMITS

/*	var userCommits = Promise.resolve(octokit.repos.listCommits({
		owner: author,
		repo: names[i].name,

    }) 
})).then(function(listOfCommits){

	var commit = listOfCommits.data

		for(var j=0; j < commit.length; j++){
			console.log("Commit n°" + (commit.length - j) + " :")
			console.log(commit[j].commit.message)
		}
	  })*/