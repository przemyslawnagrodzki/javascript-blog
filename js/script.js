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

    const clickedElement = this;
    event.preventDefault();
    console.log('clickedElement (with plus):' + clickedElement);
    clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */


  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector)
  console.log(targetArticle)
  /* [IN PROGRESS] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(customSelector = '') {
  console.log()
/* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = '';
/* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector)
  console.log(articles);
  let html = '';
  for(let article of articles){
/* [DONE] get the article id */
  const articleId = article.getAttribute('id');
/* [DONE] find the title element */
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  console.log(article);

/* [DONE] create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  console.log(linkHTML)
/* [IN PROGRESS] insert link into titleList */
  html = html + linkHTML
  console.log(html)
  }
  titleList.innerHTML = html;
  }
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
console.log(links)
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector)
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles) {
    /* [DONE] find tags wrapper */
  const titleList = article.querySelector(optArticleTagsSelector)
  console.log(titleList)
    /* [DONE] make html variable with empty string */
    let html = ''
    /* [DONE] get tags from data-tags attribute */
    const articleTags = clickedArticle.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray)
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      console.log(tag)
      /* [DONE] generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag'- + articleTagsArray + '"><span>' + articleTagsArray + '</span></a></li>';
      console.log(linkHTML)
      /* [DONE] add generated code to html variable */
      html = html + tagLinkHTML
    /* [DONE] END LOOP: for each tag */
    }
    /* [IN PROGRESS] insert HTML of all the links into the tags wrapper */
    tagLinkHTML.innerHTML = html
  /* END LOOP: for every article: */
}
}
generateTags();

function tagClickHandler(event){
  /*  [DONE] prevent default action for this event */
  event.preventDefault();
  /*  [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this
  console.log(clickedElement)
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href)
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag)
  /* [DONE] find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.actve[href^="tag-"]')
  console.log(tagLinks)
  /* [DONE] START LOOP: for each active tag link */
  for(let tagLink of tagLinks) {
    console.log(tagLink)
  /* [DONE] remove class active */
  tagLink.classList.remove('active')
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const linkHREF = document.querySelectorAll('a[href="' + href + '"]')
  console.log(linkHREF)
  /* [DONE] START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    console.log(tagLink)
    /* [DONE] add class active */
    tagLink.classList.add('active')
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]')
  console.log(allTagsLinks)
  /* [DONE] START LOOP: for each link */
  for(let allTagsLink of allTagsLinks) {
    console.log(allTagsLink)
    /* [DONE] add tagClickHandler as event listener for that link */
  allTagsLink.addEventListener('click', tagClickHandler)
  /* [IN PROGRESS] END LOOP: for each link */
}
}
addClickListenersToTags();

function generateAuthors() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleAuthorSelector)
  console.log(articles)
  /* [DONE] Start loop for every article */
  for(let article of articles) {
    console.log(article)
  /* [DONE] find authors wrapper */
    const authorsWrapper = document.querySelector(optArticleAuthorSelector)
    console.log(authorsWrapper)
  /*  [DONE] make html variable with empty string */
    let html = ''
  /*  [DONE] get author from data-author attribute */
    const author = article.getAttribute('data-author')
    console.loh(author)
  /*  [IN PROGRESS] generate HTML of the link */
    const authorLinkHTML = '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>'
    console.log(authorLinkHTML)
  /* add generated code to html variable */

  /* insert html of all the links into post-author */

  /*  End loop for every article */
  }
}
