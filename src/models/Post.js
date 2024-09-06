export class Post {
    constructor(text, file, creatorUserId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hasPhoto = hasPhoto;
        this.photo = photo;
    }

    // Example method to update user information
    updateProfile(newData) {
        Object.assign(this, newData);
    }

    getFullName() {
        return `${this.name}`;
    }
}
