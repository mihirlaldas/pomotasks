# Backend api JSON format

## signup - [post]

### request

url - /signup

```
params -
{
	"name" : "mihir kumar",
	"password":"mihirlaldas",
	"email":"mihir@gmail.com"

}
```

### response

`{"message": "Registration successful", "error": false}`

## login - [post]

### request

url - /login

```
params-
{
	"email":"mihir@gmail.com",
	"password":"mihirlaldas"
}
```

### response

`{"email": "mihir@gmail.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1paGlyQGdtYWlsLmNvbSJ9.yrwhval5XOteYWFZqK4V3gb63yD6khh1775oJxGKh-s", "user_id": 3, "name": "mihir kumar", "error": false}`
