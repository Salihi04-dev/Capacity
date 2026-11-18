export interface PaymentPartnerPort {
  createEscrowPayment(input: { reference: string; amountMinor: bigint; currency: string; }): Promise<{ partnerReference: string; checkoutUrl: string }>;
  getTransactionStatus(partnerReference: string): Promise<'pending' | 'succeeded' | 'failed' | 'unknown'>;
  releaseEscrow(input: { partnerReference: string; idempotencyKey: string }): Promise<{ partnerReference: string; status: string }>;
  refund(input: { partnerReference: string; amountMinor: bigint; idempotencyKey: string }): Promise<{ partnerReference: string; status: string }>;
  verifyWebhook(input: { rawBody: Buffer; signature: string }): Promise<boolean>;
}
export interface SmsPort { send(to: string, message: string): Promise<void>; }
export interface EmailPort { send(to: string, subject: string, text: string): Promise<void>; }
export interface PushPort { send(userId: string, title: string, body: string, data?: Record<string, string>): Promise<void>; }
export interface MapsGeocodingPort { geocode(address: string): Promise<{ latitude: number; longitude: number } | null>; }
export interface PrivateFileStoragePort { put(input: { key: string; body: Buffer; contentType: string }): Promise<void>; createShortLivedReadUrl(key: string, expiresInSeconds: number): Promise<string>; delete(key: string): Promise<void>; }
