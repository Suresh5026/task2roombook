--- WEB DEVELOPER TASK ---

--- HALL BOOKING API ---

---Creating a Room API url is (http://localhost:8000/). Please refer the below JSON format for creating a Room using the url. I have tested in POSTMAN also. While send the request Room has been created.

JSon format : 
{
    "id": 1,
    "No_of_Seats_Available":200,
    "Amenities_in_Room":280,
    "Price_for_1hour":4000
}

---Booking a Room with API url is (POST -> http://localhost:8000/Room/Booking). Please refer the below JSON format for creating a Room using the url. I have tested in POSTMAN also. While send the request Room has been booked. If the same date any other user try to book room means you'll get an error message that is "Room is already booked on this date". ---

{
       "customerName":"Suresh",
        "Date":"21-Apr-2024",
        "StartTime":"09:00 AM",
        "endTime": "12:00PM",
        "RoomID":"01A"
}

---List all Rooms with booked data API (GET -> http://localhost:8000/Bookeddata) while send the get request using this URL you'll get the required booked data from an manually created json data file ie., BookingDetails.json file ---

---List all customers booked date API (GET -> http://localhost:8000/customers/Bookeddata) while send the get request using this URL you'll get the required booked data from an manually created json data file ie., BookingDetails.json file ---


---List how many times a customer has booked the room API 
(GET -> http://localhost:8000/customers/:customerName)  (Note :customerName enter any name from a json date eg., 'Suresh')
while send the get request using this URL you'll get the required booked data from an manually created json data file ie., BookingDetails.json file ---

I have tested all the POST & GET request on POSTMAN

Thanks for validating the task





