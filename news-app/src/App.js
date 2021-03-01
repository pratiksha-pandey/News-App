import React, { useState, useEffect } from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '3e6065a7cd92dbb18a88b8516d64d2122e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
	const [activeArticle, setActiveArticle] = useState(-1);
	const [newsArticles, setNewsArticles] = useState([]);
	

	const classes = useStyles();

	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command , articles , number }) => {
				if(command === 'newHeadlines'){
					setNewsArticles(articles);
					setActiveArticle(-1);
				}
				else if (command === 'highlight') {
          			setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        		} 
        		else if (command === 'open') {
          			const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
         			const article = articles[parsedNumber - 1];
         			if (parsedNumber > 20) {
            			alanBtn().playText('Please try that again...');
          			} else if (article) {
            			window.open(article.url, '_blank');
            			alanBtn().playText('Opening...');
          			}

      			}
			}
		})
	},[])
	return (
		<div>
			<div className={classes.logoContainer}>
				<img src="https://thumbs.dreamstime.com/b/news-world-simple-icon-global-news-concept-icon-white-background-news-world-simple-icon-logo-global-news-concept-icon-143328057.jpg" className={classes.alanLogo} alt="logo" />
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle}/>
		</div>
	);
}

export default App;