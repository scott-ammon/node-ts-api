export const asyncWrapper = (fn) =>
  (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next))
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("failed endpoint is: ", error.response.request.path);
          res.status(401).send({ error: "Unauthorized."});
        }
        next(error);
      });
};
