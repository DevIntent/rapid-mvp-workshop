import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FooterComponent } from './footer/footer.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AddChildComponent } from './add-child/add-child.component';
import { ChildrenService } from './children.service';
import { ChildrenComponent } from './children/children.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { WeightComponent } from './weight/weight.component';
import { HeightComponent } from './height/height.component';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopNavComponent,
    AddChildComponent,
    ChildrenComponent,
    AvatarComponent,
    ChildDetailsComponent,
    WeightComponent,
    HeightComponent,
    EmojiPickerComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,
    AppRoutingModule
  ],
  providers: [ChildrenService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
