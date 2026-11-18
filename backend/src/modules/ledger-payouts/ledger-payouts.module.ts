import { Module } from '@nestjs/common';
import { LedgerModule } from '../ledger/ledger.module';
import { PayoutsModule } from '../payouts/payouts.module';

@Module({ imports: [LedgerModule, PayoutsModule], exports: [LedgerModule, PayoutsModule] })
export class LedgerPayoutsModule {}
