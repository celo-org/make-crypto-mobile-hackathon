import { Router } from "express"
import { creator } from "../controllers/creator.js"
import { request } from "../helpers/request.js"

const router = Router()

router.get("/creators", request.handle(creator.getMany))
router.get("/creator", request.handle(creator.getOne))
router.post("/creator", request.handle(creator.create))
router.put("/creator", request.handle(creator.update))

export { router }
