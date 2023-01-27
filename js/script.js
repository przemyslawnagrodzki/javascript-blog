'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event)

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  
  function titleClickHandler(event){
    const clickedElement = this;
    event.preventDefault();
    console.log('clickedElement (with plus):' + clickedElement);
  }
}
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [IN PROGRESS] get 'href' attribute from the clicked link */
  function titleClickHandler(event){
  const clickedElement = this
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  }
  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}