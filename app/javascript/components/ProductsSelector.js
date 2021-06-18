import { Page } from "@shopify/polaris";
import React from "react";

const ProductsSelector = () => (
  <Page
    title="Product selector"
    primaryAction={{
      content: "Select products",
      onAction: () => console.log("clicked"),
    }}
  />
);

export default ProductsSelector;
