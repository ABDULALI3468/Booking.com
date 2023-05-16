import express from "express";
import { countByCities, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/find/:id", verifyAdmin, updateHotel);

//GET

router.get("/find/:id", verifyUser, getHotel);

//GETALL

router.get("/", getHotels);

//DELETE

router.delete("/:id", deleteHotel);

// count by cities
router.get("/countByCities", countByCities);

export default router;
