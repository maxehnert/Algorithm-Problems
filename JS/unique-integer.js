function findUniqueID(deliveryIds) {
  var uniqueDeliveryId = 0;

  for (deliveryId in deliveryIds) {
    uniqueDeliveryId ^= deliveryId;
  }

  console.log(uniqueDeliveryId);

  return uniqueDeliveryId;
}
