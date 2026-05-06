
import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { generateComponent } from "../controllers/aiComponent.controller.js"
import { getAllComponents, publishComponent, saveComponents  } from "../controllers/component.controller.js"

const componentRouter = express.Router()


componentRouter.post("/generate", isAuth, generateComponent)

componentRouter.post("/save" , isAuth , saveComponents)


//  publish component (admin only )

componentRouter.post("/publish", isAuth, publishComponent);
componentRouter.get("/all-components", isAuth, getAllComponents);


export default componentRouter;