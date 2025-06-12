export interface DataObject {
  object: {
    payment_intent: string;
    billing_reason: 'subscription_cycle' | 'subscription_create';
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
    lines: {
      data: {
        plan: {
          id: string;
        };
        period: {
          start: number;
          end: number;
        };
      }[];
    };
  };
}
