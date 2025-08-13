import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker";
import { CatalogService } from "./catelog.service";

export class BrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: CatalogService;

  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }

  public async initializeProducer() {
    try {
      this.producer = await MessageBroker.connectProducer<Producer>();
      this.producer.on("producer.connect", async () => {
        console.log("Producer catalog service connected successfully");
      });

      // Add delay before connecting consumer
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.consumer = await MessageBroker.connectConsumer<Consumer>();
      this.consumer.on("consumer.connect", async () => {
        console.log("Consumer catalog service connected successfully");
      });

      // keep listening to consumers events
      // perform the action based on the event
      await MessageBroker.subscribe(
        (message) => this.catalogService.handleBrokerMessage(message),
        "CatalogEvents"
      );
    } catch (error) {
      console.error("Failed to initialize broker:", error);
      // Retry after 5 seconds
      setTimeout(() => this.initializeProducer(), 5000);
    }
  }
  public async sendDeleteProductMessage(data: any) {}
}
