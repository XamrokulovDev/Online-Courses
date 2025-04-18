const errorHandler = (err, req, res, next) => {
    console.log("Xatolik", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: true, message });
};
  
module.exports = errorHandler;