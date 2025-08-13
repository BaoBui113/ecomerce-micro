import express from "express";
import catalogRouter from "./api/catalog.routes";
import { CatalogRepository } from "./repository/catalog.repository";
import { BrokerService } from "./services/broker.service";
import { CatalogService } from "./services/catelog.service";
import { HandleErrorWithLogger, httpLogger } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", catalogRouter);

app.use(HandleErrorWithLogger);

// Initialize broker service
const catalogService = new CatalogService(new CatalogRepository());
const brokerService = new BrokerService(catalogService);

// Start broker initialization (don't await to avoid blocking)
brokerService.initializeProducer().catch(console.error);

export default app;
