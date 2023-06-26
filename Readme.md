### Priyanshu Vyas
### (vyas.priyanshu23@gmail.com)

## API Endpoints:

* POST ***/createContact*** -

   _Request Format:_
   
      {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "mobile_number": "1234567890",
        "data_store": "CRM"
      }

* GET ***/getContact*** -

   _Request Format:_
   
      {
        "contact_id": "12345",
        "data_store": "CRM"
      }

* POST ***/updateContact*** -

   _Request Format:_
   
      {
        "conatct_id": "12345",
        "new_email": "dale.doe@example.com",
        "new_mobile_number": "9234567890",
        "data_store": "CRM"
      }

* POST ***/deleteContact*** -

   _Request Format:_
   
      {
        "contact_id": "12345",
        "data_store": "CRM"
      }


### Follow the steps to use this on your machine:

## Cloning the Repo

To get started with this project, follow these steps:

Clone the repository to your local machine:
```
  git clone https://github.com/PriyanshuVyas/freshly-crm.git
 ```

## Install the dependencies:
```
npm install express axios dotenv mysql
```

## Start the server:

The default port is 3000.
The server will start running on http://localhost:3000.

## Configuration

The following environment variables can be used to configure the API:

    API_KEY: API Key.
