# Create Cabin

## On success

1. ✅ Get a **POST** request on **/api/cabins**
2. ✅ Validate if the request was made by an **admin**
3. ✅ Returns **204**, no content

##Exceptions

1. ✅ Returns **404** error if the API does not exist
2. ✅ Returns **403** error if the user is not admin
3. ✅ Returns **400** error if the datas are not provided by the client
4. ✅ Returns **500** error if there is an error when trying to create a cabin
