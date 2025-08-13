import { OrderLineItemType, OrderWithLineItems } from "../dto/orderRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { OrderRepositoryType } from "../repository/order.repository";
import { MessageType, OrderStatus } from "../types";
import { NotFoundError } from "../utils";
import { SendCreateOrderMessage } from "./broker.service";

export const CreateOrder = async (
  userId: number,
  repo: OrderRepositoryType,
  cartRepo: CartRepositoryType
) => {
  try {
    // find cart by customer id
    const cart = await cartRepo.findCart(userId);
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    // calculate total ordre amount
    let cartTotal = 0;
    let orderLineItems: OrderLineItemType[] = [];

    // create orderline items from cart items
    cart.lineItems.forEach((item) => {
      cartTotal += item.qty * Number(item.price);
      orderLineItems.push({
        productId: item.productId,
        itemName: item.itemName,
        qty: item.qty,
        price: item.price,
      } as OrderLineItemType);
    });

    const orderNumber = Math.floor(Math.random() * 1000000);

    // create order with line items
    const orderInput: OrderWithLineItems = {
      orderNumber: orderNumber,
      txnId: null,
      status: OrderStatus.PENDING,
      customerId: userId,
      amount: cartTotal.toString(),
      orderItems: orderLineItems,
    };

    //   const order = await repo.createOrder(orderInput);
    //   await cartRepo.clearCartData(userId);
    //   console.log("Order created", order);
    // fire a message to subscription service [catalog service] to update stock
    // await repo.publishOrderEvent(order, "ORDER_CREATED");
    await SendCreateOrderMessage({
      order: orderInput,
    });
    // return success message
    return { message: "Order created successfully", orderNumber: orderNumber };
  } catch (error) {
    console.error("Error creating order:", error);
    return { message: "Error creating order" };
  }
};

export const UpdateOrder = async (
  orderId: number,
  status: OrderStatus,
  repo: OrderRepositoryType
) => {
  await repo.updateOrder(orderId, status);

  // fire a message to subscription service [catalog service] to update stock
  // TODO: handle Kafka calls
  if (status === OrderStatus.CANCELLED) {
    // await repo.publishOrderEvent(order, "ORDER_CANCELLED");
  }
  return { message: "Order updated successfully" };
};

export const GetOrder = (orderId: number, repo: OrderRepositoryType) => {
  const order = repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

export const GetOrders = async (userId: number, repo: OrderRepositoryType) => {
  const orders = await repo.findOrdersByCustomerId(userId);
  if (!Array.isArray(orders)) {
    throw new Error("Orders not found");
  }
  return orders;
};

export const DeleteOrder = async (
  orderId: number,
  repo: OrderRepositoryType
) => {
  await repo.deleteOrder(orderId);
  return true;
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Message received by order Kafka consumer", message);

  // if (message.event === OrderEvent.ORDER_UPDATED) {
  // call create order
};
