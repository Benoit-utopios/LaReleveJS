// interface Comment { id: string; userId: string; text: string; createdAt: string; }
export class Comment {
    constructor(id, userId, text, createdAt) {
      this.id = id
      this.userId = userId
      this.text = text
      this.createdAt = createdAt
    }
  }
  