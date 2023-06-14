// import { NextFunction, Request, Response } from 'express';

// class Validations {
//   static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
//     const book = req.body;
//     const requiredKeys = ['title', 'price', 'author', 'isbn'];
//     const notFoundKey = requiredKeys.find((key) => !(key in book));
//     if (notFoundKey) {
//       return res.status(400).json({ message: `${notFoundKey} is required` });
//     }

//     next();
//   }
// }

// export default Validations;