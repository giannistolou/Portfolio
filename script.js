var url = "https://dev.to/api/articles?username=giannistolou";
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
var res;
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4) {
		var ar = JSON.parse(xhr.responseText);
		const x = document.getElementById("articles");
		ar.reverse().map((article) => {
			x.innerHTML +=
				`	
		<div class="column is-full-mobile is-half-tablet is-one-third-desktop">
			<div class="card">
				<p class="card-header-title has-text-centered card-header-title__custom">
				` +
				article.title +
				`
				</p>
				<div class="card-content">
					<div class="content">
						` +
				article.description +
				`
					</div>` +
				topicFor(article.tag_list)+
				`<div class="date_article mt-1">`+article.readable_publish_date+`</div>
				</div>
				<footer class="card-footer">
					<a target="_blank" href="` +
				article.url +
				`" class="card-footer-item">Read more</a>
				</footer>
			</div>
		</div>`;
		});
	}
};
xhr.send();

const lanResFor = (ar) => {
	val = "";
	for (key in ar) {
		if (key != "Shell")
			val += `<span class="tag is-info mr-1 mb-1">` + key + `</span>`;
	}
	return val;
};
const topicFor = (ar) => {
	val = "";
	ar.map((el) => {
		if (el != "Shell")
			val +=
				`<span class="tag is-info is-light mr-1 mb-1">` +
				el +
				`</span>`;
	});
	return val;
};

const isForked = (value) => {
	if (value) {
		return `<span class="tag is-ligt mr-1 mb-1"> forked </span>`;
	}
	return "";
};

const projectWebsite = (value) => {
	if(value != "" && value != undefined){
		return `<a target="_blank" href="` +
		value +
		`" class="card-footer-item">Website</a>`
	}
	return ""
}
function githubRequest(url, name) {
	var xhrGithub = new XMLHttpRequest();
	xhrGithub.open("GET", url);
	xhrGithub.onreadystatechange = function () {
		if (xhrGithub.readyState === 4) {
			var ar = JSON.parse(xhrGithub.responseText);
			const x = document.getElementById("github");
			ar.map((project) => {
				var urlLanguages =
					"https://api.github.com/repos/" +
					name +
					"/" +
					project.name +
					"/languages";
				var languagesXhr = new XMLHttpRequest();
				languagesXhr.open("GET", urlLanguages);
				var lanRes = {};
				languagesXhr.onreadystatechange = function () {
					if (languagesXhr.readyState === 4) {
						lanRes = JSON.parse(languagesXhr.responseText);
						x.innerHTML +=
							`	
							<div class="column is-full-mobile is-half-tablet is-one-third-desktop">
								<div class="card">
									<p class="card-header-title has-text-centered card-header-title__custom">
									` +
							project.name +
							`
									</p>
									<div class="card-content">
										<div class="content">
										
											` +
							project.description +
							`
										</div>
										<span class="tag is-link mt-1 mr-1">` +
							project.owner.login +
							`</span>` +
							lanResFor(lanRes) +
							` ` +
							topicFor(project.topics) +
							` ` +
							isForked(project.fork) +
							`
									</div>
									<footer class="card-footer">
										<a target="_blank" href="` +
							project.svn_url +
							`" class="card-footer-item">GitHub Repository</a>
							` + projectWebsite(project.homepage) + `
									</footer>
								</div>
							</div>`;
					}
				};
				languagesXhr.send();
			});
		}
	};
	xhrGithub.send();
}
githubRequest(
	"https://api.github.com/orgs/quiz4math/repos",
	"quiz4math"
);
githubRequest(
	"https://api.github.com/users/giannistolou/repos",
	"giannistolou"
);
githubRequest(
	"https://api.github.com/orgs/book-community/repos",
	"Book-Community"
);
