import { findIndex } from "../Common/findIndex.js";

const Rooms = [
    {
        room_id: 1,
        room_name: "First_Class_with_AC_WiFi",
        booked_status: true,
        price_1hr: 5000,
      },
      {
        room_id: 2,
        room_name: "First_Class_With_Non_AC",
        booked_status: true,
        price_1hr: 3000,
      },
      {
        room_id: 3,
        room_name: "Second_Class_with_AC",
        booked_status: true,
        price_1hr: 2000,
      },
      {
        room_id: 4,
        room_name: "Second_Class_with_Non_AC",
        booked_status: true,
        price_1hr: 1000,
      },
     
]

const customer = [
    {
        room_id: 1,
        customer_id: 1,
        name: "Vasanth",
        date: "10/02/2024",
        start_time: "09:00:00 am",
        end_time: "12:00:00 pm",
      },
      {
        room_id: 2,
        customer_id: 2,
        name: "Sathya Pk",
        date: "10/02/2024",
        start_time: "10:10:00 am",
        end_time: "01:15:01 pm",
      },
      {
        room_id: 3,
        customer_id: 3,
        name: "Harry",
        date: "10/01/2024",
        start_time: "11:30:00 pm",
        end_time: "08:30:00 am",
      },
      {
        room_id: 4,
        customer_id: 4,
        name: "Prince",
        date: "10/01/2024",
        start_time: "12:00:00 pm",
        end_time: "07:15:00 am",
      }
]

const bookedRooms = (req,res)=>{
    try{
        let bookedRoom = []
        for(let i=0;i<Rooms.length;i++){
            for(let y=0;y<customer.length;y++){
                if(Rooms[i].room_id===customer[y].room_id){
                    bookedRoom.push({
                        Room_name: Rooms[i].room_name,
                        Booked_status: Rooms[i].booked_status,
                        Customer: customer[y]
                    })
                }
            }
            if(Rooms[i].booked_status===false){
                bookedRoom.push(Rooms[i])
            }
        }
        res.status(200).send(bookedRoom)
       
    }
    catch(error){
        res.status(500).send({
            message:"internal server error"
        })
    }
}

const allCustomer = (req,res)=>{
    try{
        let bookedRoom = []
        for(let i=0;i<Rooms.length;i++){
            for( let y=0;y<customer.length;y++){
                if(Rooms[i].room_id===customer[y].room_id){
                    bookedRoom.push({
                        Customer: customer[y].name,
                        Room_name:Rooms[i].room_name,
                        Date:customer[y].date,
                        Start_time:customer[y].start_time,
                        End_time:customer[y].end_time,
                        Booked_status:Rooms[i].booked_status,
                    })
                }
            }
        }
        res.status(200).send(bookedRoom)
    }
    catch(error){
        res.status(500).send({
            message:"internal server error"
        })
    }
}
const createRoom = (req,res)=>{
    try{
        const id = Rooms.length ? Rooms[Rooms.length-1].room_id+1 : 1
        req.body.room_id = id
        req.body.room_name = `room-${id}`
        req.body.booked_status = false

        Rooms.push(req.body)
        console.log(req.body);
        res.status(200).send({
            message:"Room added successfully"
        })
    }
    catch(error){
        res.status(500).send({
            message:"internal server error"
        })
    }
}
const deleteRoom = (req,res)=>{
    try{
        const {id} = req.params
        const index = findIndex(Rooms,id)
        if(index !== -1){
            Rooms.splice(index,1)
            res.status(200).send({
                message:"Room deleted successfully"
            })
        }
        else{
            res.status(400).send({
                message:"Invalid room id"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message:"internal server eroor"
        })
    }
}
const booking = (req,res)=>{
    try{
        const {id} = req.params
        const Room_id = +id
        const index = findIndex(Rooms,id)
        const temp = {...Rooms[index]}
        temp.booked_status=true

        if(index !== -1 && Rooms[index].booked_status==false){
            Rooms.splice(index,1,temp)
            const {name,date,start_time,end_time} = req.body
            const id = customer.length ? customer[customer.length -1].customer_id + 1 : 1
            const newCustomer = {
                room_id : Room_id,
                customer_id : id,
                name,
                date,
                start_time,
                end_time,
            }
            customer.push(newCustomer)
            res.status(200).send({
                message:"Room booking is success"
            })
        }
        else if(Rooms[index].booked_status==true){
            res.status(500).send({
                message:"This room is already booked"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message:"internal server error"
        })
    }
}

export default {
    bookedRooms,
    allCustomer,
    createRoom,
    deleteRoom,
    booking
}