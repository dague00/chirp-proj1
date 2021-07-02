# chirp-proj1

This branch introduces a shared folder (src/shared). The shared folder contains some code that we reused all over the place in one convenient location. It also contains a function (in shared/functions.ts) which will be described later. Go see tests/UsersDao.test.ts to see how this cleans up the code.

In shared/constants is a boolean variable "isTest", no longer requiring us to comment and uncomment code when testing. When running tests, set "isTest" to true so that the DAOs access the local database instead of the real database. Executing "npm run test" will return errors if this variable is not set to true. Executing "npm run start" with this constant set to true will return an error log to console reminding you to set the variable to false.

The other major change is the use of the function formatScanResponse to format how Amazon returns Scans. If you try to get all Users, we USED to get an array with entries like
```
{
  "username": {"S": "exampleUserName"},
  "password": {"S": "examplePassWord"},
  "bio": {"S": "exampleBio},
  "following": [
    {"S": "someUsername1"},
    {"S": "someUsername2"}
  ]
}
```
Now, we return
```
{
  "username": "exampleUserName",
  "password": "examplePassWord",
  "bio": "exampleBio,
  "following": [
    "someUsername1",
    "someUsername2"
  ]
}
```

The change was implemented in an extremely simple way In the UsersDao, the function getAllUsers() has a line
```
return users.Items.map(formatScanResponse);
```
where formatScanResponse is defined in src/shared/functions.ts. If you wanted to revert our code to the old output, simply replace this line with
```
return users.Items;
```
