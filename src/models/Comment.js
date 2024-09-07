export class Comment {
    constructor(id, text, postId, firstName, lastName, photo) {
        this.id = id;
        this.postId = postId;
        this.text = text;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo || 'https://via.placeholder.com/100 ';
    }
}
