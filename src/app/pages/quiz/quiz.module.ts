import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPageRoutingModule } from './quiz-routing.module';

import { QuizPage } from './quiz.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, QuizPageRoutingModule, ComponentsModule],
  declarations: [QuizPage],
})
export class QuizPageModule {}
