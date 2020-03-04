
User routes
POST /api/auth/register for signup
POST /api/auth/login for login
GET /api/users/:id to retrieve user data
PUT /api/users/:id to change user data
POST /api/:id/newtrip to create a new trip for the user
GET /api/:id/trips to get trips created by the user

Worker routes
POST /api/workers/register for signup (will put them on an unapproved list which admin will have to approve before they'll be available)
POST /api/workers/login for login
GET /api/workers/:id to retrieve worker data
PUT /api/workers/:id to change worker data
GET /api/workers/:id/trips to get trips assigned to the worker

Airport routes
GET /api/airports/ for a full airport list
GET /api/airports/:id for a specific airport by its id

Admin routes
POST /api/admin/login for login
GET /api/admin/:id to retrieve admin data
GET /api/admin/badlist to retrieve workers that haven't been approved in order to approve them
GET /api/admin/goodlist to get the opposite

Trip routes
GET /api/trips/:id get trip by the tripid
PUT /api/trips/:id change trip data
DELETE /api/trips/:id delete the trip