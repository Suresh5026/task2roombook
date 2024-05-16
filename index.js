const express = require('express');
const HTTP_SERVER = express();
require("dotenv").config();
const fs = require('node:fs')
const parser = require('body-parser');
const PORT = process.env.PORT || 3000;
const HOSTNAME = 'localhost';

HTTP_SERVER.use(parser.json());

HTTP_SERVER.listen(PORT,HOSTNAME,()=>{
    console.log(`Server Started Successfully at ${PORT}`);
})

//Creating a Room (POST API)

let rooms = [];

HTTP_SERVER.post('/createRoom',(req,res)=>{
    const { No_of_Seats_Available,Amenities_in_Room,Price_for_1hour } = req.body;
    if(!No_of_Seats_Available || !Amenities_in_Room || !Price_for_1hour){
        return res.status(400).json({ message: 'Number of seats and price are required' })
    }
    const creRoom = {
        id : rooms.length+1,
        No_of_Seats_Available,
        Amenities_in_Room,
        Price_for_1hour
    };
    rooms.push(creRoom);
    res.status(201).json(creRoom);
    console.log(creRoom);
    console.log("Room Created Successfully")
})

//Booking a Room (POST API)

let availableRooms = []

HTTP_SERVER.post('/Room/Booking',(req,res,next)=>{
    const { customerName, Date, StartTime, endTime, RoomID } = req.body;
    
    if(!RoomID||!customerName||!Date){
        
        return res.status(400).json({ message: 'Customer Name, Date & Room ID required' })
        
    }

    const isAlreadyBooked = availableRooms.some(booking =>
        booking.RoomID === RoomID && booking.Date === Date
    );

    if (isAlreadyBooked) {
        return res.status(409).json({ message: 'Room is already booked on this date' });
    }
    const booking = {  
        customerName,
        Date,
        StartTime,
        endTime,
        RoomID,
    }
    availableRooms.push(booking);
    console.log(availableRooms)
    res.status(201).json(booking);
    
    console.log("Room Booked SuccessFully");
})

//List all Rooms with booked data API

HTTP_SERVER.get('/Bookeddata', (req, res) => {
    fs.readFile('BookingDetails.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const jsonData = JSON.parse(data);
        const bookedData = jsonData
        .filter(item => item["Booked Status"] === "Booked")
        .map(item => ({
            "Room Name": item["Room Name"],
            "Booked Status": item["Booked Status"],
            "Customer_Name" : item["Customer_Name"],
            "Date" : item["Date" ],
            "Start_Time" : item["Start_Time"],
            "End_Time": item["End_Time"]
        }));;
        res.json(bookedData)
    });
});

//List all customers booked date

HTTP_SERVER.get('/customers/Bookeddata', (req, res) => {
    fs.readFile('BookingDetails.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const jsonData = JSON.parse(data);
        const bookedData = jsonData
        .filter(item => item["Booked Status"] === "Booked")
        .map(item => ({
            "Room Name": item["Room Name"],
            "Customer_Name" : item["Customer_Name"],
            "Date" : item["Date" ],
            "Start_Time" : item["Start_Time"],
            "End_Time": item["End_Time"]
        }));;
        res.json(bookedData)
    });
});

//List how many times a customer has booked the room 

HTTP_SERVER.get('/customers/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    fs.readFile('BookingDetails.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const jsonData = JSON.parse(data);
        const bookedData = jsonData
        .filter(item => item["Booked Status"] === "Booked" && item["Customer_Name"]===customerName)
        .map(item => ({
            "Room Name": item["Room Name"],
            "Customer_Name" : item["Customer_Name"],
            "Date" : item["Date" ],
            "Start_Time" : item["Start_Time"],
            "End_Time": item["End_Time"],
            "Booking Id" : item["Booking Id"],
            "Booked Status": item["Booked Status"]
        }));;
        res.json(bookedData)
    });
});


