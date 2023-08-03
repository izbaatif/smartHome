const { INT24 } = require("mysql/lib/protocol/constants/types");

module.exports = function (app) {

    /*------------------------------------ Home Page ---------------------------------------------*/
    //Gets the index.html page on path /
    app.get("/", function (req, res) {
        res.render("index.html")
    });


    /*------------------------------------ About Page ---------------------------------------------*/
    //Gets the about.html page on path /about
    app.get("/about", function (req, res) {
        res.render("about.html");
    });


    /*------------------------------------ Add Device Page ---------------------------------------------*/
    //Gets the addDevice.html page on path /addDevice
    app.get("/addDevice", function (req, res) {
        res.render("addDevice.html");
    });

    //post for the form submission
    app.post("/addingDevice", function (req,res){

        //Gets the device type selected by user
        const devicetype = req.body.selectDevice;
        
        //If conditions to check devices
        //Group together devices with similar values


        //Devices with on/off and temperature
        if(devicetype == 'Cooling' || devicetype == 'Heating' || devicetype == 'Fridge')
        {
            // Adding data to database
            let sqlquery = "INSERT INTO devices (device_type , name , on_off, open_close, temperature,volume) VALUES (?,?,?,?,?,?)";
            // execute sql query
            let newrecord = [req.body.selectDevice, req.body.device_name , req.body.onoffCheckbox , -1, req.body.temp, -1];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //Redirects to showDeviceStatus Page to show that action is successful
                res.redirect("/showDeviceStatus");
            })
        }

        //Devices with open/close
        else if(devicetype == 'Door' || devicetype == 'Curtains' || devicetype == 'Blinds')
        {
            //Adding data to database
            let sqlquery = "INSERT INTO devices (device_type , name , on_off, open_close, temperature,volume) VALUES (?,?,?,?,?,?)";
            // execute sql query
            let newrecord = [req.body.selectDevice, req.body.device_name , -1 , req.body.opencloseCheckbox, -1, -1];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //Redirects to showDeviceStatus Page to show that action is successful
                res.redirect("/showDeviceStatus");
            })
        }

        //Devices with on/off
        else if(devicetype == 'Lights' || devicetype == 'Cameras' || devicetype == 'Hob' || devicetype == 'Microwave' || devicetype == 'Blender')
        {
            //Adding data to database
            let sqlquery = "INSERT INTO devices (device_type , name , on_off, open_close, temperature,volume) VALUES (?,?,?,?,?,?)";
            // execute sql query
            let newrecord = [req.body.selectDevice, req.body.device_name , req.body.onoffCheckbox , -1, -1, -1];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //Redirects to showDeviceStatus Page to show that action is successful
                res.redirect("/showDeviceStatus");
            })
        }

        
        //Devices with on/off and volume
        else if(devicetype == 'TV' || devicetype == 'Radio' || devicetype == 'Speakers')
        {
            //Adding data to database
            let sqlquery = "INSERT INTO devices (device_type , name , on_off, open_close, temperature,volume) VALUES (?,?,?,?,?,?)";
            // execute sql query
            let newrecord = [req.body.selectDevice, req.body.device_name , req.body.onoffCheckbox , -1, -1, req.body.vol];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //Redirects to showDeviceStatus Page to show that action is successful
                res.redirect("/showDeviceStatus");
            })
        }
 
    });



    /*------------------------------------ Show Device Status Page ---------------------------------------------*/

    //On loading the show devices page gets all the devices and shows them in html select
    app.get("/showDeviceStatus", function (req, res) {
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect("/");
            }
            //showDevices is the ejs function for select
            res.render("showDeviceStatus.html", { showDevices: result })
        });
    });

    //After device is selected
    app.get("/seeStatus", function (req, res) {
        //Gets the id of the device that is selected
        const seeDevice = Number([req.query.see_device]);
        // query database to get all the devices with that id
        let sqlquery = "SELECT * FROM `devices` WHERE id like ?";
        // execute sql query
        db.query(sqlquery, seeDevice, (err, result) => {
        if (err) {
            res.redirect("/");
            }
        else{
            //Displays them in check.html page in seeDevices function
            res.render('check.html', { seeDevices : result });
        }

        });
    });


    /*------------------------------------ Update Device Status Page ---------------------------------------------*/

    //On loading the show devices page gets all the devices and shows them in html select
    app.get("/updateDeviceStatus", function (req, res) {
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect("/");
            }
            //showDevices is the ejs function for select
            res.render("updateDeviceStatus.html", { updateDevices: result })
        });
    });


    app.get("/updateStatus", function (req, res) {

        //Gets the id of the device that is selected
        const updateDev = Number([req.query.update_device]);

        // query database to get all the devices with that id
        let sqlquery = "SELECT * FROM `devices` WHERE id like ?";
        // execute sql query
        db.query(sqlquery, updateDev, (err, result) => {
        if (err) {
            res.redirect("/");
            }
        else{
            //Displays them in update.html page in changeDevices function
            res.render('update.html', { changeDevices : result });
        }

        });
    });
    
    //Post for form in update.html page
    app.post("/updatingDevice" , function (req, res) {

        //Gets the device type
        const devicetype = req.body.device_type;

        //Gets the device id
        const idNum = Number(req.body.device_id);
        
        //If conditions to check devices
        //Group together devices with similar values


        //Devices with on/off and temperature
        if(devicetype == 'Cooling' || devicetype == 'Heating' || devicetype == 'Fridge')
        {
            // update data in database
            let sqlquery = "UPDATE devices SET device_type = ? , name = ? , on_off = ?, open_close = ? , temperature = ? , volume = ? WHERE id like ?" ;
            // execute sql query
            let newrecord = [devicetype, req.body.device_name , req.body.onoffCheckbox , -1 , req.body.temp, -1 , idNum];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //redirects to updateDeviceStatus page to show action is successful
                res.redirect("/updateDeviceStatus");
            })
        }


        //Devices with open/close
        else if(devicetype == 'Door' || devicetype == 'Curtains' || devicetype == 'Blinds')
        {
            // update data in database
            let sqlquery = "UPDATE devices SET device_type = ? , name = ? , on_off = ?, open_close = ? , temperature = ? , volume = ? WHERE id like ?" ;
            // execute sql query
            let newrecord = [devicetype, req.body.device_name , -1,  req.body.opencloseCheckbox , -1, -1 , idNum];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //redirects to updateDeviceStatus page to show action is successful
                res.redirect("/updateDeviceStatus");
            })
        }

        //Devices with on/off
        else if(devicetype == 'Lights' || devicetype == 'Cameras' || devicetype == 'Hob' || devicetype == 'Microwave' || devicetype == 'Blender')
        {
            // update data in database
           let sqlquery = "UPDATE devices SET device_type = ? , name = ? , on_off = ?, open_close = ? , temperature = ? , volume = ? WHERE id like ?" ;
           // execute sql query
           let newrecord = [devicetype, req.body.device_name , req.body.onoffCheckbox , -1 , -1, -1 , idNum];
           db.query(sqlquery, newrecord, (err, result) => {
           if (err) {
                   return console.error(err.message);
               }
               
               //redirects to updateDeviceStatus page to show action is successful
               res.redirect("/updateDeviceStatus");
           })
        }

        //Devices with on/off and volume
        else if(devicetype == 'TV' || devicetype == 'Radio' || devicetype == 'Speakers')
        {
            // update data in database
            let sqlquery = "UPDATE devices SET device_type = ? , name = ? , on_off = ?, open_close = ? , temperature = ? , volume = ? WHERE id like ?" ;
            // execute sql query
            let newrecord = [devicetype, req.body.device_name , req.body.onoffCheckbox , -1 , -1, red.body.vol , idNum];
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                    return console.error(err.message);
                }
                
                //redirects to updateDeviceStatus page to show action is successful
                res.redirect("/updateDeviceStatus");
            })
        } 
        
    });



    /*------------------------------------ Delete Device Page ---------------------------------------------*/

    //On loading the show devices page gets all the devices and shows them in html select
    app.get("/deleteDevice", function (req, res) {
        let sqlquery = "SELECT * FROM devices";
        // execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect("/");
            }
            //showDevices is the ejs function for select
            res.render("deleteDevice.html", { deleteDevices: result })
        });
    });

    app.get("/deleteStatus", function (req, res) {

        //Gets the id of the device that is selected
        const deleteDevice = Number([req.query.delete_device]);

        // query database to get all the devices with that id
        let sqlquery = "SELECT * FROM `devices` WHERE id like ?";
        // execute sql query
        db.query(sqlquery, deleteDevice, (err, result) => {
        if (err) {
            res.redirect("/");
            }
        else{
            //Displays them in delete.html page in deleteDev function
            res.render('delete.html', { deleteDev : result });
        }

        });
    });

    app.post("/deletePermanently" , function (req, res) {

        //Gets the id of the device to be deleted
        const delId = Number(req.body.device_id);

        //Deleting row data in database
        let sqlquery = "DELETE FROM devices WHERE id = ?" ;
        // execute sql query
        db.query(sqlquery, delId, (err, result) => {
        if (err) {
                return console.error(err.message);
            }
            
            //redirects to delete device page to show action is successful
            res.redirect("/deleteDevice");
        })

    });
    
}