export interface SubscriberService {
  createSubscriber: (param: { name: string, email: string, tags: string[]}) => Record<string, any>;
}