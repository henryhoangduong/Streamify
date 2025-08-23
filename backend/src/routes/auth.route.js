import { Router } from "express";

const router = Router()

router.get("/signup", (req, res) => {
    res.send("Signup Route")
})

router.get("/login", (req, res) => {
    res.send("Login Route")
})