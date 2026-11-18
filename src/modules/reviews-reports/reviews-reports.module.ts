import { Module } from '@nestjs/common';
import { ReviewsModule } from '../reviews/reviews.module';
import { ReportsModule } from '../reports/reports.module';

@Module({ imports: [ReviewsModule, ReportsModule], exports: [ReviewsModule, ReportsModule] })
export class ReviewsReportsModule {}
