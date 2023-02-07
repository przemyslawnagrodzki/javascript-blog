
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

'use strict';

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post .post-author',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
};

function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event)

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */

  const clickedElement = this;
  event.preventDefault();
  console.log('clickedElement (with plus):' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
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




function generateTitleLinks(customSelector = '') {
  console.log()
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector)
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector)
  console.log(articles);
  let html = '';
  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    console.log(article);

    /* [DONE] create HTML of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
  /* Define const 'params */
  const params = { min: 999999, max: 0 }

  /* Start LOOP for itering object */
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    /* max value for params.max */
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * opts.cloudClassCount + 1);
  return opts.cloudClassPrefix + classNumber;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector)
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector)
    console.log(tagsWrapper)
    /* [DONE] make html variable with empty string */
    let html = ''
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray)
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag)
      /* [DONE] generate HTML of the link */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1
      } else {
        allTags[tag]++
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [IN PROGRESS] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add in allTagsHTML: */

    /* [NEW] create variable for all links HTML code */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /* [NEW] END LOOP for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData)
}
generateTags();

function tagClickHandler(event) {
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
  for (let tagLink of tagLinks) {
    console.log(tagLink)
    /* [DONE] remove class active */
    tagLink.classList.remove('active')
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const linkHREF = document.querySelectorAll('a[href="' + href + '"]')
  console.log(linkHREF)
  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    console.log(tagLink)
    /* [DONE] add class active */
    tagLink.classList.add('active')
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]')
  console.log(allTagsLinks)
  /* [DONE] START LOOP: for each link */
  for (let allTagsLink of allTagsLinks) {
    console.log(allTagsLink)
    /* [DONE] add tagClickHandler as event listener for that link */
    allTagsLink.addEventListener('click', tagClickHandler)
    /* [IN PROGRESS] END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  console.log("======== ARTICLE", articles)
  /* [DONE] Start loop for every article */
  for (let article of articles) {

    console.log(article)
    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector)
    console.log(authorWrapper)
    /*  [DONE] make html variable with empty string */
    let html = ''
    /*  [DONE] get author from data-author attribute */
    const author = article.getAttribute('data-author')
    console.dir(article);
    console.log(author)
    /*  [DONE] generate HTML of the link */
    const linkHTMLData = { author: author };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    console.log(html)
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(author)) {
      /* [NEW] add generated code to allAuthors object */
      allAuthors[author] = 1
    } else {
      allAuthors[author]++
    }
    /* [IN PROGRESS] insert html of all the links into post-author */
    authorWrapper.innerHTML = html

    /* [NEW] create variable for all links HTML code */

    /* [NEW] generate code of a link and add in allAuthorsHTML: */

    /* [NEW] add html from allAuthorsHTML to authorsList */
    /*  End loop for every article */
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(opts.authorsListSelector);
  const allAuthorsData = { authors: [] };
  console.log(authorsList)

  for (const author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }

  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors()

function authorClickHandler(event) {
  console.log("================== TSET")
  /*  [DONE] prevent default action for this event */
  event.preventDefault();
  /*  [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this
  console.log(clickedElement)
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href)
  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author)
  /* [DONE] find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="author-"]')
  console.log(authorLinks)
  /* [DONE] START LOOP: for each active author link */
  for (let authorLink of authorLinks) {
    console.log(authorLink)
    /* [DONE] remove class active */
    authorLink.classList.remove('active')
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const linkHREF = document.querySelectorAll('a[href="' + href + '"]')
  console.log(linkHREF)
  /* [DONE] START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    console.log(authorLink)
    /* [DONE] add class active */
    authorLink.classList.add('active')
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(allAuthorsLinks)
  /* [DONE]  START LOOP: for each link */
  for (let allAuthorsLink of allAuthorsLinks) {
    console.log(allAuthorsLink)
    /* [IN PROGRESS] add authorClickHandler as event listener for that link */
    allAuthorsLink.addEventListener('click', authorClickHandler)
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors()

