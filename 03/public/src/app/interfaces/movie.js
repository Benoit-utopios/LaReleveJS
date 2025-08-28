// interface Movie { id, title, year, imageUrl, description, tags, ratings[], comments[] }
export class Movie {
    constructor(id, title, year, imageUrl, description, tags = [], ratings = [], comments = []) {
      this.id = id
      this.title = title
      this.year = year
      this.imageUrl = imageUrl
      this.description = description
      this.tags = tags
      this.ratings = ratings
      this.comments = comments
    }
  }