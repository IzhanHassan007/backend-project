// Ye higher order function hai jo kisi bhi request handler ko wrap karega
const asyncHandler = (requestHandler) => {
// Ye inner function actual Express middleware banata hai
    return (req, res, next) => {
    // ✅ Promise.resolve se async handler ko promise bana kar error catch karta hai
    // Agar koi error aaye to next(err) se Express ke error handler tak chala jaye
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export { asyncHandler };


















// // const asyncHandler = () => {}
// // const asyncHandler = (fn) => () => {}
// // const asyncHandler = (fn) => async () => {}
    
// // Ye higher order function hai jo har async controller ko try-catch mein wrap karta hai
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     // Controller wala function run karo
//     await fn(req, res, next);
//   } catch (error) {
//     // Agar error aaye to response bhejo
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // asyncHandler ko export karo taake dusri files mein use ho sake
// export { asyncHandler };
