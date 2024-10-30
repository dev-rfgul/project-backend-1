// in this file we have a higher order function which will take other function and execute it and we can do it by async await and promises as well.


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export  { asyncHandler }





/*this is how we can use it through async await
// const asyncHandler=()=>{}

// export default asyncHandler;

// const asyncHandler=()=>{}
// const asyncHandler=(func)=>()=>{}
// const asyncHandler=(func)=>async()=>{} 

// the above code is the representation of whats happening in the line below

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);

    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })

    }

}

*/