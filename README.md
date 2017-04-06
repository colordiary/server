# Server



### Models

1. User
2. Date
   * Specific period (time of day)
   * Color/Emotion
   * Comment, image
   * Possibly weather and location

```javascript
User {
    [{date}
        [{
            specificPeriod,
            color,
            comment,
            image
        }]
        {weather}
        {location}
    ]
}

Color {
    [{
        hexNumber,
        value
    }]
}
```

### Routes

- #### Authorization/Authentication (Signup/Signin)
  
  * Signin
  * Signup
  * Verify
  * Roles
    1. Admin
    2. User
  * Middleware
  * ensureAuth and ensureRole

- #### REST data endpoints / CRUD operations
  
    * GET
    * GET ALL
    * POST
    * DELETE
    * PUT
  
 1. Initial Home Page: `/` 
    * Signup: `/signup` 
    * Signin: `/signin` 
    * GET all users: `/allUsers` 

 2. User Home Page/Dashboard: `/user/:id`
    * User comments: `/user/:id/comments` 
    * User colors by week: `/user/:id/week` 
    * User colors by month: `/user/:id/month` 
    * Get all colors: `/user/:id/colors` 

  3. ##### Possibly filter by location or weather 

### Connection and Server

### Dependencies

- Express
- MongoDB/Mongoose
- HTTP
- Nodemon
- Morgan
- CORS
- Promise
- Body-parser
- Other Node packages I'm forgetting (eslint)
- Testing: Mocha, Chai, Superagent

### API Research

- Location
- Weather
- Calender

