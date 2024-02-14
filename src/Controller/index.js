const home = (req,res) =>{
    res.status(200).send(`
    <div>
    <h1>Hall Booking API</h1><hr>
    <ul>
    <li>Get All Rooms        : endpoint: /rooms</li></br>
    <li>Get All Customers Booked Rooms : endpoint: /rooms/customer</li></br>
    <li>Create a New Room    : endpoint: /rooms/</li></br>
    <li>New Hall Booking     : endpoint: /rooms/:id</li>

    </ul>

    </div>
    `)
}

export default {home}