# Back End - Kidsfly


    Table of Contents

    Note
    User Data Structure
    User Routes
    Worker Data Structure
    Worker Routes
    Airport Data Structure
    Airport Routes
    Admin Data Structure
    Admin Routes
    Trip Data structure
    Trip routes   


## Note

     All airport data taken directly from global airport database. Can be found at https://www.partow.net/miscellaneous/airportdatabase/index.html#Downloads
     


## User data structure

    {
        id: auto
        username:   required
        password:   required
        image:
        name:
        address:
        airport_id:
        phone:
    }

## User routes

-   POST /api/auth/register for signup
-   POST /api/auth/login for login
-   GET /api/users/:id to retrieve user data
-   PUT /api/users/:id to change user data
-   POST /api/:id/newtrip to create a new trip for the user
-   GET /api/:id/trips to get trips created by the user


## Worker data structure

    {
        id: auto
        username:   required
        password:   required
        name:
        description:
        image:
    }
## Worker routes

-   POST /api/workers/register for signup (will put them on an unapproved list which 
    admin will have to approve before they'll be available)
-   POST /api/workers/login for login
-   GET /api/workers/:id to retrieve worker data
-   PUT /api/workers/:id to change worker data
-   GET /api/workers/:id/trips to get trips assigned to the worker

## Airport data structure
    {
        id: auto
        icao_code:
        iata_code:
        name:
        city:
        country:
        lat_deg:
        lat_min:
        lat_sec:
        lat_dir:
        lon_deg:
        lon_min:
        lon_sec:
        altitude:
        lat_decimal:
        lon_decimal:
    }


## Airport routes

-   GET /api/airports/ for a full airport list
-   GET /api/airports/:id for a specific airport by its id

## Admin data structure
    {  
        id: auto
        username:   required
        password:   required
    }

## Admin routes

-   POST /api/admins/login for login
-   GET /api/admins/:id to retrieve admin data
-   GET /api/admins/badlist to retrieve workers that haven't been approved in order to  
        approve them
-   GET /api/admins/goodlist to get the opposite

## Trip data structure

    {
        id: auto
        user_id: required
        airport_id: required
        worker_id:
        airline:
        departure_time: required
        luggage:
        children:
        special_needs:
    }

## Trip routes

-   GET /api/trips/:id get trip by the tripid
-   PUT /api/trips/:id change trip data
-   DELETE /api/trips/:id delete the trip