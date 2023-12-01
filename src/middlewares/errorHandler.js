export const errorHandler = (error, req, res, next) => {
    console.log(`Error : ${error.message}`)
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
}