let express = require('express'); 
const cors = require('cors');

let app = express(); 

let router = express.Router(); 

let personRepo = require('./routes/person');

app.use(express.json()); 
app.use(cors());
app.use('/',router); 



router.get('/persons',function(req,res,next){ 
    personRepo.get(function(data){
        //Wrap data in JSON
         res.status(200).json({
            data
            

    })
    },function(err){
        next(err);
    });

    

    
})

//GET Method   Retrieve a specific person object by its ID.

router.get('/persons/:id',function(req,res,next){ 
    let id = req.params.id;    
    personRepo.getById(id,function(data){
        //Wrap data in JSON
         res.status(200).json({
        "status":200,
        "statusText":"Ok",
        "message":"User data feteched succesfully",
        "data":data

    })
    },function(err){
        next(err);
    });
      
})
//Get BY INDEX 


router.get('/persons/:index', function(req, res, next) {
   
    let index = parseInt(req.params.index);
  
    
    let person = Datalist[index];
  
    
    res.status(200).json({
      "success": true,
      "message": "Person retrieved successfully",
      "data": person
    });
  });



//POST Method - Create a new person object.

router.post('/persons',function(req,res,next){ 
    personRepo.insert(req.body,function(data){ 
        //Wrap data in JSON
         res.status(201).json({
        "status":201,
        "statusText":"Created!",
        "message":"User Created Succesfully!",
        "data":data

    })
    },function(err){
        next(err);
    });
      
})


//PUT Method - Update a specific person object by its ID.

router.put('/persons/:id',function(req,res,next){  
    personRepo.update(req.params.id,req.body,function(data){  
        //Wrap data in JSON
         res.status(200).json({
        "status":200,
        "statusText":"Update",
        "message":"User Updated Succesfully!",
        "data":data

    })
    },function(err){
        res.status(404).json({
            "status":404,
            "statusText":err.message,
            "error":err.message,
            "data":err
    
        })
    });
      
})
//update by index
router.put('/persons/:index', function(req, res, next) {
   
    let index = parseInt(req.params.index);
  
    
    let person = Datalist[index];
  
    person.name = req.body.name;
    person.gender = req.body.gender;
    person.age = req.body.age;
    person.email = req.body.email;
  
   
    res.status(200).json({
      "success": true,
      "message": "Person updated successfully",
      "data": person
    });
  });




//DELETE Method -Delete a specific person object by its ID.

router.delete('/persons/:id',function(req,res,next){  
    personRepo.delete(req.params.id,function(data){  
        //Wrap data in JSON
         res.status(200).json({
        "status":200,
        "statusText":"User deleted",
        "message":"User with id "+req.params.id+" Deleted Succesfuly"

    })
    },function(err){
        res.status(404).json({
            "status":404,
            "statusText":err.message,
            "error":err.message,
            "data":err
    
        })
    });
      
})



//----------------------------------------------------------------------------------------------------------------
app.listen(5000,function(){  //Port number            
console.log("App is running on http://localhost:5000");  //to coniform app is runnning
})