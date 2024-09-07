export class Post {
    constructor(id, text, file, firstName, lastName, photo) {

        this.id = id;
        this.text = text;
        this.fileType = file ? file.type : null;
        this.file = file;
        this.firstName = firstName;
        this.lastName = lastName;

        this.photo = photo || 'https://via.placeholder.com/100 ';
        // this.photo = photo;

    }
}
