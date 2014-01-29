//A self-executing function is usually more performanat that document.ready
(function(window, $, undefined){



	var $tweets = $('.tweets');

	function loadTweets(){
		for(var i = $('.tweets .tweet').length; i < streams.home.length; i++){
			$tweets.prepend(tweetTemplate(streams.home[i]));
			
			

			//making sure the timeline doesn't keep scrolling by at the amzing intense speed.
			if($('.tweet').length > 5){
				if(window.getComputedStyle(document.body,':after').getPropertyValue('content') === "mobile"){
					$(window).scrollTop($(window).scrollTop() + $($('.tweet')[0]).outerHeight());	
				} else {
					$('.tweets').scrollTop($('.tweets').scrollTop() + $($('.tweet')[0]).outerHeight());	
				}
			}

			//converts timestamps into human-readable time-ago format, and autoupdates.
			$($('.tweet')[0]).find('.time').timeago();

		}
	}

	function loadUserTweets(){

		var username = window.location.hash.replace('#/', "").replace('#', "");

		if(!!streams.users[username]){
			for(var i = $('.tweets .tweet').length; i < streams.users[username].length; i++){
				$tweets.prepend(tweetTemplate(streams.users[username][i]));
				
				

				//making sure the timeline doesn't keep scrolling by at the amzing intense speed.
				if($('.tweet').length > 5){
					if(window.getComputedStyle(document.body,':after').getPropertyValue('content') === "mobile"){
						$(window).scrollTop($(window).scrollTop() + $($('.tweet')[0]).outerHeight());	
					} else {
						$('.tweets').scrollTop($('.tweets').scrollTop() + $($('.tweet')[0]).outerHeight());	
					}
				}

				//converts timestamps into human-readable time-ago format, and autoupdates.
				$($('.tweet')[0]).find('.time').timeago();

			}
		} else {
			alert("The user doesn't exist. 404!");
			window.location.hash = "";
		}

		
	}

	var autoloader;

	function router(){

		if(!!autoloader){
			clearInterval(autoloader);
		}
		$('.tweets').html("");

		if(window.location.hash === "" || window.location.hash === "#" || window.location.hash === "#/" ){
		
		autoloader = setInterval(loadTweets, 1000);
	
		} else if(!!window.location.hash.match(/#(\/)?[a-z0-9]+/i)) {

			autoloader = setInterval(loadUserTweets, 1000);

		} else {

			alert("Invalid Address, redirecting to home.");
			window.location.hash = "";

		}
	}

	router();

	window.addEventListener("hashchange", router, false);
	
	
	function tweetTemplate(tweet){
		if(!tweet.user || !tweet.message){
			return "";
		}

		var string = '<div class="tweet">';
		string += '<span class="time" title="' + (tweet.created_at ? (new Date(tweet.created_at)).toJSON() : (new Date()).toJSON() ) + '" ></span>';
		string += '<h3><a href="#/' + tweet.user + '" > @' + tweet.user + '</a></h3>';
		string += tweet.message.replace(/#[a-z0-9]{1,}/, "<strong class='hashtag'>" + tweet.message.match(/#[a-z0-9]{1,}/i) + "</strong>");
		string += '</div>';

		return string;
	}

})(this, $)