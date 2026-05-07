import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiriesRouter from "./inquiries";
import newsletterRouter from "./newsletter";
import vendorsRouter from "./vendors";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(newsletterRouter);
router.use(vendorsRouter);

export default router;
