import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.use(verifyToken);

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("SALAM USER YOU ARE AUTHENTICATED");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.json({
    data: req.user,
    msg: "SALAM USER, YOU ARE LOGGED IN AND YOU CAN DELETE YOUR ACCOUNT",
  });
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.json({
    data: req.user,
    msg: "hello admin, you are logged in and you can delete all accounts",
  });
});

//UPDATE
router.put("/:id", verifyUser, updateUser);

//GET

router.get("/:id", verifyUser, getUser);

//GETALL

router.get("", verifyAdmin, getUsers);

//DELETE

router.delete("/:id", verifyAdmin, deleteUser);

export default router;
