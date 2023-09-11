export interface DataObject {
  object: {
    customer: string;
    // it is unix timestamp
    current_period_end: number;
    created: number;
    customer_email: string;
    metadata: {
      plan: string;
    };
    plan: {
      id: string;
    };
  };
}
