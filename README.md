# MiniAbsensi
Sebuah API CRUD Sederhana & Auth MultiUser Admin & User. API ini digunakan untuk mendata murid-murid yang ada di sekolah

## Teknologi

- [Visual_Studio_Code](https://code.visualstudio.com/)
- [ExpressJs](https://www.npmjs.com/package/express)
- [MongoDB](https://www.mongodb.com/)
- [Monggoose](https://mongoosejs.com/)
- [JSONWebToken](https://jwt.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/id/)
- [Terraform](https://www.terraform.io/)

## Setup
```
~$ git clone https://github.com/alisaid-sm/miniabsensi.git
~$ cd miniabsensi
~$ npm install
~$ npm start
```
## Diagram Flow API

![DIagram Flow API Login and CRUD](https://user-images.githubusercontent.com/68319083/108501235-918cd280-72e3-11eb-876b-c717954128df.png)

## Docs Postman

[Link](https://www.getpostman.com/collections/3fe89402af5abd6d64c2)

## Credential

User yang tersedia :

| Username | Password | Role  |
|:--------:|:--------:|:-----:|
| alisaid  | 123      | admin |
| miftakh  | 123      | user  |

|  Fiture        |   admin   |    user   |
|:--------------:|:---------:|:---------:|
| login          |     *     |     *     |
| register       |     *     |     *     |
| refreshtoken   |     *     |     *     |
| getStudent     |     *     |     *     |
| getStudentById |     *     |     *     |
| postStudent    |     *     |           |
| updateStudent  |     *     |           |
| deleteStudent  |     *     |           |