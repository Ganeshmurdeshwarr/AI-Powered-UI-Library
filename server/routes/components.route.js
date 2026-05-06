
import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { generateComponent } from "../controllers/aiComponent.controller.js"
import { publishComponent, saveComponents } from "../controllers/component.controller.js"

const componentRouter = express.Router()

componentRouter.post("/generate", isAuth, generateComponent)

componentRouter.post("/save" , isAuth , saveComponents)

componentRouter.post("/publish", isAuth, publishComponent);

export default componentRouter;