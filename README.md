# mern-auth-jwt
MERN authorization with jwt.
Http only cookie.

```
$ npm install
$ npm run dev
```

.env variables
```
MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES=3600000
VERSION=v1
```


### Login Page

![Login Page, no auth](./img/login.jpg "Login Page NoAuth")

### Invalid login (no user)

![Invalid Data, no auth](./img/invalidLogin.jpg "Login Page NoAuth")

### Register Page

![Register Page, no auth](./img/passDontMatch.jpg "Register Page NoAuth")

### Profile Page

![Profile Page](./img/profile.jpg "Profile Page Auth")

### Edit Profile Page

![Edit Profile Page](./img/editProfile.jpg "Edit Profile Page Auth")

### Delete Profile Page

![Delete Profile Page](./img/deleteProfile.jpg "Delete Profile Page Auth")
