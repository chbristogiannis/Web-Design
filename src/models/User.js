// src/models/User.js
export class User {
    constructor(firstName, lastName, hasPhoto, photo) {
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
