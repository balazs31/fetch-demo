## useAuthStrategyTokenFinster

## Requirements (Login api)

The users provides an e-mail adress and password and retrieves a token for other api requests.
For all api’s underneath, the token is required and used to test if the user is active, retrieve the amount of available credits and the customer package and rights (related to the package, the user is allowed to retrieve certain data or not).

Examples:
check if logged in: http://api.finsterdata.com/v1/login (returns status:ok if logged in or status:error if not)
login: http://api.finsterdata.com/v1/login?email=xxx&password=zzz
login (for 30 days): http://api.finsterdata.com/v1/login?email=xxx&password=zzz&keep=1
