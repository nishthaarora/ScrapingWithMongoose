#Hologram News Cube

### Overview

Created a web app that lets users leave comments on the latest news. By using Mongoose and Cheerio Scraped google news and display latest news on the website.


### NPM Packages Used
  * express
  * Client-side Handlebars
  * mongoose
  * body-parser
  * cheerio
  * request

## Summary of the Project

  1. Whenever a user visits the site, the app will scrape stories from a news outlet of Google. The data scraped includes link, story and title.

    * Used Cheerio to grab the site content and Mongoose to save it to MongoDB database.

  2. All users can leave comments on the stories which are collected in an array. They are also be allowed to delete whatever comments they want removed. All stored comments are visible to every user.
    * Used Mongoose's model system to associate comments with particular articles.

    * Whenever an article is scraped from google if checks if an article isn't already represented in MongoDB database before saving it; Since we don't want duplicates.

  3. working app is deployed to Heroku with the following link: https://guarded-refuge-17182.herokuapp.com/

