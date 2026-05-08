import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiriesRouter from "./inquiries";
import newsletterRouter from "./newsletter";
import vendorsRouter from "./vendors";
import instagramRouter from "./instagram";
import atelierRouter from "./atelier";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(newsletterRouter);
router.use(vendorsRouter);
router.use(instagramRouter);
router.use(atelierRouter);

export default router;
