//high order fucntion which will ake a function as a parameter and execute it 
//like i can use it for my login ,logut and also it can be asych function
//and we will be taking 3 parameters like req(req will take res form client),
//res(res will take req from client),next(next will take client to nxt function or controller )

// Utilty file which will run asych functions
// and return a promise
//and also we dont have to write everything controller in try catch block
const asyncHandler=(requestHandler)=>{
 return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch(err=>{
      next(err)
    });
    }
};

export {asyncHandler,};
